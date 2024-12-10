import CustomerDashboard from "./CustomerDashboard";

const Home = () => {
  
  return (
    <div>
      <h1>Home</h1>
      {
        localStorage.getItem("name") && (
          <CustomerDashboard/>  
        )
      }
    </div>
  );
};

export default Home;
