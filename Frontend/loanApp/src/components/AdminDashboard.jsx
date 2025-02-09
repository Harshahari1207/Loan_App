import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const BEARER_TOKEN = localStorage.getItem("token");
  const history = useNavigate();

  const getUsers = async () => {
    try {
      const res = await axios.get(
        "https://loan-app-i6lc.onrender.com/api/admin/users",
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );
      console.log(res);
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  
  const updateUserIdInloacalStorage = (userId) => {
    localStorage.setItem("userId", userId);
    history("/adminUser");
  }
  
  return (
    <div>
      <h1 className="text-center text-secondary-emphasis text-shadow text-uppercase">ALL USERS</h1>
      <div className="m-4 items-center d-flex justify-content-center car">
        <table className="table table-bordered table-hover table-striped">
          <thead className="rounded-pill">
            <tr className="text-center text-white bg-secondary shadow mb-2 rounded">
              <th className="rounded">Name</th>
              <th>Email</th>
              <th>View more <details></details></th>
            </tr>
          </thead>
          <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr className="text-center bg-light rounded-pill shadow"> 
                <td className="">{user.name}</td>
                <td>{user.email}</td>
                <td><button className="btn btn-primary" onClick={()=>updateUserIdInloacalStorage(user._id)}>visit</button></td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
