import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    if (
      formData.password !== formData.confirmPassword ||
      formData.password.length < 6
    ) {
      setErrorMessage(
        "Password must be at least 6 characters long/Passwords do not match. Please try again."
      );
      return;
    }
    if (!containsSpecialCharacter(formData.password)) {
      setErrorMessage("Password must contain at least one special character.");
      return;
    }

    setErrorMessage("");
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post(
        "https://loan-app-i6lc.onrender.com/api/auth/register",
        data
      );
      console.log(response, "Inside the register function");
      if (response.status === 201) {
        console.log(response);
        history("/login");
      }
    } catch (error) {
      setErrorMessage("Error accurred during registration", error);
    }
  };

  return (
    <div className="home">
      <div className="container pt-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 text-center d-flex align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h1 className="text-black fs-1 fw-bold ">
                A Personal Loan for Multiple Purpose!
              </h1>
              <p className="fw-lighter">
                Get access to quick and easy personal loans tallored to your
                needs. Whether you're planning a vacation, consolidating debt,
                or making a big purchase, we've got you covered. Apply online
                and get approved in minutes.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div id="box" className="card shadow">
              <div className="card-body ">
                <h3 className="card-title text-center mb-4">Register</h3>
                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* email */}
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

                  {/* Password*/}
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

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <p>
                    Have registered <a href="/login">Login</a>
                  </p>
                  {/* Error Message */}
                  <p className="text-danger">{errorMessage}</p>
                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Register
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

export default Register;
