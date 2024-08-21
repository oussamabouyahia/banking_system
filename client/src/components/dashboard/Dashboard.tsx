import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">My Dashboard</h1>
      <div className="dashboard-buttons">
        <Link to="/" className="dashboard-button">
          My Balance
        </Link>

        <Link to="/list" className="dashboard-button">
          List of Beneficiaries
        </Link>
        <Link to="/update-account" className="dashboard-button">
          Update My account
        </Link>
        <Link to="/update-account" className="dashboard-button">
          Delete My account
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
