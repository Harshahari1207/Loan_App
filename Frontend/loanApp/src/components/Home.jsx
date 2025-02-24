import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import LandingPage from "./LandingPage";

const Home = () => {
  return (
    <div className="mt-5 height-full">
      {/* <h1>Home</h1> */}
      {/* Dashboard for type customer */}
      {localStorage.getItem("type") === "customer" && <CustomerDashboard />}
      {/* Dashboard for type admin */}
      {localStorage.getItem("type") === "admin" && <AdminDashboard />}
      {/* Normal Dashboard */}
      {!localStorage.getItem("type") && <LandingPage />}
    </div>
  );
};

export default Home;
