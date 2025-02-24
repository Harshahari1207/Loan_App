import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerDashboard = () => {
  const [loanForm, setLoanForm] = useState({
    loanDescription: "",
    loanAmount: "",
    loanDate: "",
  });
  const [loans, setLoans] = useState([]);
  const [kyc, setKyc] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const BEARER_TOKEN = localStorage.getItem("token");
  const customerId = localStorage.getItem("customerId");
  const handleLoanFormChange = (e) => {
    setLoanForm({
      ...loanForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleApplyLoan = async (e) => {
    e.preventDefault();
    console.log(kyc);
    const data = {
      ...loanForm,
      customerId: customerId,
    };
    try {
      const res = await axios.post("https://loan-app-i6lc.onrender.com/api/loans", data, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });
      if (res.status === 201) {
        getLoans();
        setLoanForm({
          loanDescription: "",
          loanAmount: "",
          loanDate: "",
        })
        setErrorMessage("");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleKyc = async (e, loanId) => {
    e.preventDefault();
    try {
      const data = {
        loanId: loanId,
        panNumber: e.target.panNumber.value,
        aadharNumber: e.target.aadharNumber.value,
        customerId: customerId,
      };
      const res = await axios.post(
        "https://loan-app-i6lc.onrender.com/api/customers/kyc/",
        data,
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );
      getKyc(customerId);
    } catch (error) {
      console.log(error);
    }
  };
  const getLoans = async () => {
    try {
      const res = await axios.get(
        "https://loan-app-i6lc.onrender.com/api/loans/customer/" + customerId,
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );
      console.log(res);
      setLoans(res.data);
      if(loans.forEach((loan)=>{if(loan.kyc==="completed"){setKyc(true)}}));
    } catch (error) {
      console.log(error);
    }
  };
  const updateKycInCustomer = async (data, loanId) => {
    try {
      const updatedData = {
        ...data,
        kyc: "completed",
      };
      const result = await axios.put(
        "https://loan-app-i6lc.onrender.com/api/loans/" + loanId,
        updatedData,
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );
      if (result.status === 200) {
        setKyc(true);
      }
      console.log("updatedKyc of Loan", result);
    } catch (error) {
      console.log(error);
    }
  };
  const getKyc = async (customerId) => {
    try {
      const result = await axios.get(
        "https://loan-app-i6lc.onrender.com/api/customers/kyc/customer/" + customerId,
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );
      console.log(result);
      if (result.status === 200) {
        loans.forEach(async (loan) => {
          console.log(loan);
          if (loan.kyc === "Pending") {
            await updateKycInCustomer(loan, loan._id);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLoans();
    getKyc(customerId);
  }, [kyc]);
  return (
    <div>
      <h1 className="text-center">Customer Dashboard</h1>
      <div className="container mt-4 col-md-4 ">
        <form onSubmit={handleApplyLoan} className="card mb-4">
          <div className="form-group mb-3">
            <label>Loan Description</label>
            <input
              type="text"
              name="loanDescription"
              className="form-control"
              placeholder="Enter the Description"
              value={loanForm.loanDescription}
              onChange={handleLoanFormChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              className="form-control"
              placeholder="Enter loan amount"
              max={999999999}
              value={loanForm.loanAmount}
              onChange={handleLoanFormChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Loan Date</label>
            <input
              type="date"
              name="loanDate"
              className="form-control"
              placeholder="Enter Date"
              value={loanForm.loanDate}
              onChange={handleLoanFormChange}
              required
            />
          </div>
          {/* Error message */}
          <p className="text-danger">{errorMessage}</p>
          {/* Apply loan submit button */}
          <button type="submit" className="btn btn-primary">
            Apply Loan
          </button>
        </form>
      </div>
      <div className="row m-4 items-center">
        {loans.length > 0 &&
          loans.map((loan) => (
            <div className="col-md-4 col-sm-6">
              <div className="card m-3">
                <div className="card-body">
                  <h5 className="card-title">{loan.loanDescription}</h5>
                  <p className="card-text">Loan Amount: {loan.loanAmount}</p>
                  <p className="card-text">Loan Date: {loan.loanDate}</p>
                  <p className="card-text">Loan Status: {loan.loanStatus}</p>
                  {/* Kyc display according to kyc completion or not */}
                  {loan.kyc !== "completed" ? (
                    <>
                      <h5>Kyc Pending-Complete your verification</h5>
                      <form onSubmit={(e) => handleKyc(e, loan._id)}>
                        <div className="form-group mb-3">
                          <label>PAN Card Number:</label>
                          <input
                            type="text"
                            name="panNumber"
                            className="form-control"
                            placeholder="Enter the PAN card number"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Aadhaar Card Number:</label>
                          <input
                            type="number"
                            name="aadharNumber"
                            className="form-control"
                            placeholder="Enter the Aadhaar card number"
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit KYC
                        </button>
                      </form>
                    </>
                  ) : (
                    <p className="card-text">Kyc: {loan.kyc}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
