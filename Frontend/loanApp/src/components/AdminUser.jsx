import { useEffect, useState } from "react";
import axios from "axios";

const AdminUser = () => {
  const userId = localStorage.getItem("userId");
  const [loans, setLoans] = useState([]);
  const BEARER_TOKEN = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const getLoans = async () => {
    try {
      const res = await axios.get(
        "https://loan-app-i6lc.onrender.com/api/admin/loans/" + userId,
        {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }
      );
      console.log(res);
      setLoans(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://loan-app-i6lc.onrender.com/api/admin/user/" + userId,
        {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }
      );
      console.log(res);
      setUser(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
    getLoans();
  }, []);
  const updateLoan = async (loanId, data) => {
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
  };
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
      const data = {
        ...loan,
        loanStatus: "Cancelled",
      };
      updateLoan(loanId, data);
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  return (
    <div className="row m-4 items-center height-full">
      <div className="card d-flex justify-content-center align-items-center box-shadow my-4">
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          <p className="card-text">Name: {user.name}</p>
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">No. of Loans: {loans.length}</p>
        </div>
      </div>
      {loans.length > 0 ? (
        loans.map((loan) => (
          <div className="col-sm-3 mb-3">
            <div className="card p-3">
              <div className="card-body">
                <h5 className="card-title">{loan.loanDescription}</h5>
                <p className="card-text">Loan Amount: {loan.loanAmount}</p>
                <p className="card-text">
                  Loan Date: {loan.loanDate ? formatDate(loan.loanDate) : "N/A"}
                </p>
                <p className="card-text">Loan Status: {loan.loanStatus}</p>
                <p className="card-text">Kyc: {loan.kyc}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-primary p-2 "
                  onClick={() => rejectLoan(loan._id)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary p-2 "
                  onClick={() => approveLoan(loan._id)}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center">No Loans Found</h1>
      )}
    </div>
  );
};

export default AdminUser;
