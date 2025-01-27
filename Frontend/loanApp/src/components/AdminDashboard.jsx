import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const BEARER_TOKEN = localStorage.getItem("token");

  const getLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/admin/allLoans/", {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      });
      console.log(res);
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLoans();
  }, []);

  const updateLoan = async(loanId, data) => {
    try {
      console.log(data);
      const res = await axios.put(
        "https://loan-app-i6lc.onrender.com/api/admin/updateLoan/" + loanId,
        data,
        {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }
      );
      console.log(res);
      getLoans();
    } catch (error) {
      console.log(error);
    }
  }
  const approveLoan = async (loanId) => {
    try {
      const loan = loans.find((loan) => loan._id === loanId);
      const data = {
        ...loan,
        loanStatus: "Approved",
      };
      updateLoan(loanId, data);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectLoan = async (loanId) => {
    try {
      const loan = loans.find((loan) => loan._id === loanId);
      console.log(loan);
      const data = {
        ...loan,
        loanStatus: "Cancelled",
      };
      updateLoan(loanId, data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="row m-4 items-center">
        {loans.length > 0 &&
          loans.map((loan) => (
            <div className="col-sm-3 mb-3">
              <div className="card p-3">
                <div className="card-body">
                  <h5 className="card-title">{loan.loanDescription}</h5>
                  <p className="card-text">Loan Amount: {loan.loanAmount}</p>
                  <p className="card-text">Loan Date: {loan.loanDate}</p>
                  <p className="card-text">Loan Status: {loan.loanStatus}</p>
                  <p className="card-text">Kyc: {loan.kyc}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-primary p-2 " onClick={()=>rejectLoan(loan._id)}>Cancel</button>
                  <button className="btn btn-primary p-2 " onClick={()=>approveLoan(loan._id)}>Approve</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
