import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      {localStorage.getItem("type") === "customer" && (
        <CustomerDashboard />
      )}
      {localStorage.getItem("type") === "admin" && (
        <AdminDashboard />
      )}
    </div>
  );
};

export default Home;
