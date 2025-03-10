import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
const NavBar = () => {
  const history = useNavigate();

  const handleLogout = (e) => {
    // e.preventDefault(); 
    localStorage.clear();
    history("/"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-full d-flex justify-content-between align-items-center p-3">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        <img className="logo rounded-circle" src={logo} alt="" width="50px" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {localStorage.getItem("name") ? (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* Welcome Message */}
              <Link className="nav-link mouse-cursor" to="/">
                {/* <FontAwesomeIcon icon={faUser} />{"  "} */}
                 Welcome {localStorage.getItem("name")}
              </Link>
            </li>
            {/* Logout nav link */}
            <li className="nav-item">
              <a className="nav-link mouse-cursor"  href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
            {/* Dashboard nav link */}
            <li className="nav-item">
              <Link className="nav-link mouse-cursor" to="/">
                Dashboard
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto">
            {/* Login nav link */}
            <li className="nav-item">
              <Link className="nav-link mouse-cursor" to="/login">
                Login
              </Link>
            </li>
            {/* Register nav link */}
            <li className="nav-item">
              <Link className="nav-link mouse-cursor" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;