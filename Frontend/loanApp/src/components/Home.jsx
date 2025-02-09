import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <div className="mt-5 height-full">
      {/* <h1>Home</h1> */}
      {localStorage.getItem("type") === "customer" && <CustomerDashboard />}
      {localStorage.getItem("type") === "admin" && <AdminDashboard />}
      {!localStorage.getItem("type") && <LandingPage />}
    </div>
  );
};

export default Home;
