import React, { useState } from "react";
// import NavBar from "./NavBar";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [type, setType] = useState("customer");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const containsSpecialCharacter = (password) => {
    const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*"];
    return specialChars.some((char) => password.includes(char));
  };
  const postLogin = async (url) => {
    try{
    const response = await axios.post(
      url,
      formData
    );
    if ((response.status = 200)) {
      console.log(response)
      localStorage.setItem("name", response.data.result.name);
      localStorage.setItem("token", response.data.tokens.access.token);
      localStorage.setItem("userId", response.data.result._id);
      localStorage.setItem("type", type);
      setErrorMessage("")
      history("/");
    } else {
      alert("Invalid credentials");
    }
  }catch(error){
    setErrorMessage("Invalid credentials/Errror logging in" + error);
  }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setErrorMessage(
        "Password must be at least 6 characters long. Please try again."
      );
      return;
    }
    if (!containsSpecialCharacter(formData.password)) {
      setErrorMessage("Password must contain at least one special character.");
      return;
    }
    console.log("Form Data Submitted:", formData);
    try {
      if(type === "admin"){
        await postLogin("http://localhost:8082/api/admin/login");
      }
      if(type === "customer"){
        await postLogin("http://localhost:8082/api/auth/login");
      }
      
      // localStorage.setItem("username", response.data.result.name);
      // console.log(response);
    } catch (error) {
      setErrorMessage("Invalid credentials/Errror logging in" + error);
    }
  };

  return (
    <div className="home">
      <div className="container pt-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 text-center d-flex align-items-center pb-5">
            <div className="">
              <div className="">
                <h3 className="">
                  This Is New Era Money Always In Your Mobile
                </h3>
                <p className="card-text">
                  A platform for banks and financial services providers to
                  connect with their customers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-light shadow">
              <div className="card-body">
                <div className="toggleButton flex">
                  <button className={`btn ${isAdmin ? "active btn-primary" : ""}`} onClick={() => {setType("admin"); setIsAdmin(true)}}>Admin</button>
                  <button className={`btn  ${isAdmin ? "" : "active btn-primary"}`}onClick={() => {setType("customer"); setIsAdmin(false)}} >Customer</button>
                </div>
                <h3 className="card-title text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <p>
                    Haven't registered yet <a href="/register">Register</a>
                  </p>
                  <p className="text-danger">{errorMessage}</p>
                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;