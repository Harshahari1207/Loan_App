import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      {/* <h1>Loan App</h1> */}
      <div className="row mt-5 height-full">
        <div className="col-md-6">
          <img
            src="https://www.konnectplugins.com/loanica/images/banner.svg"
            alt="Banner"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 p-5 text-center text-md-start">
          <h1 className="text-black fs-1 fw-bold ">
            A Personal Loan for <br /> Multiple Purpose!
          </h1>
          <p className="fw-lighter">
            Get access to quick and easy personal loans tallored to your needs.
            Whether you're planning a vacation, consolidating debt, or making a
            big purchase, we've got you covered. Apply online and get approved
            in minutes.
          </p>
          <Link to="/register" className="btn btn-primary" >Apply Now</Link>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
