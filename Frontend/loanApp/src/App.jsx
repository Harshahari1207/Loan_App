import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      {/* <Home /> */}
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      {/* <Register /> */}
    </>
  );
}

export default App;
