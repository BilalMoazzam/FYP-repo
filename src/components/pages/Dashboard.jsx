import Header from '../layout/Header';
import DashboardContent from '../DashboardContent';

import "../styles/Dashboard.css"

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Header
        title="Dashboard"
        breadcrumbs={[
          { text: "Home", active: false },
          { text: "Dashboard", active: true },
        ]}
      />
      <div className="dashboard-container">
        <DashboardContent />
      </div>
    </div>
  )
}

export default Dashboard

