import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import AdminUser from "./components/AdminUser";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      {/* <Home /> */}
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminUser" element={<AdminUser />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer/>
      </Router>
      {/* <Register /> */}
    </>
  );
}

export default App;
