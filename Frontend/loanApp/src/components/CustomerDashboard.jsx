import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerDashboard = () => {
  const [loanForm, setLoanForm] = useState({
    loanDescription: "",
    loanAmount: "",
    loanDate: "",
  });
  const [loans, setLoans] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const BEARER_TOKEN = localStorage.getItem("token");
  const handleLoanFormChange = (e) => {
    setLoanForm({
      ...loanForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleApplyLoan = async (e) => {
    e.preventDefault();
    console.log(loanForm);
    const data = {
      ...loanForm,
      customerId: localStorage.getItem("customerId"),
    };
    try {
      const res = await axios.post("http://localhost:8082/api/loans", data, {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });
      if (res.status === 201) {
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
      };
      const res = await axios.post(
        "http://localhost:8082/api/kyc/" + loanId,
        data,
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );
    } catch (error) {
        console.log(error);
    }
  };
  const getLoans = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8082/api/loans/customer/" +
          localStorage.getItem("customerId"),
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );
      console.log(res);
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLoans();
  }, []);
  return (
    <div>
      <h1 className="text-center">Customer Dashboard</h1>
      <div className="container mt-4 col-md-4 ">
        <form onSubmit={handleApplyLoan} className="mb-4">
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

          <p className="text-danger">{errorMessage}</p>
          <button type="submit" className="btn btn-primary">
            Apply Loan
          </button>
        </form>
      </div>
      <div className="container row m-4 items-center">
        {loans.length > 0 &&
          loans.map((loan) => (
            <div className="col-sm-5 card m-3">
              <div className="card-body">
                <h5 className="card-title">{loan.loanDescription}</h5>
                <p className="card-text">Loan Amount: {loan.loanAmount}</p>
                <p className="card-text">Loan Date: {loan.loanDate}</p>
                <p className="card-text">Loan Status: {loan.loanStatus}</p>
                {loan.kyc === "Pending" && (
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
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
