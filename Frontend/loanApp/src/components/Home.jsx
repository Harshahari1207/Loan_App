import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      {localStorage.getItem("type") === "customer" ? (
        <CustomerDashboard />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default Home;
