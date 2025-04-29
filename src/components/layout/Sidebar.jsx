import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Network,
  BarChart2,
  Users,
  Blocks,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import "../styles/Sidebar.css";


const Sidebar = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  // Simulate an API call or logic to get notification count
  useEffect(() => {
    // Simulate fetching notification count (you can replace this with real data from API)
    const fetchNotifications = () => {
      // For demo, let's assume we get 5 notifications
      setNotificationCount(5);
    };
    
    fetchNotifications();
  }, []);

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <img src="/web-logo.png" alt="StockChain AI" />
        </div>
        <h2>StockChain AI</h2>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/inventory" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Package size={20} />
          <span>Inventory Management</span>
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <ShoppingCart size={20} />
          <span>Order Management</span>
        </NavLink>

        <NavLink to="/supply-chain" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Network size={20} />
          <span>Supply Chain Overview</span>
        </NavLink>

        <NavLink to="/analytics" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <BarChart2 size={20} />
          <span>Analytics & Report</span>
        </NavLink>

        <NavLink to="/users" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Users size={20} />
          <span>User Management</span>
        </NavLink>

        <NavLink to="/blockchain" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Blocks size={20} />
          <span>Blockchain Transaction</span>
        </NavLink>

        <NavLink to="/notifications" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <div className="notification-icon">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </div>
          <span>Notification Page</span>
        </NavLink>

        <NavLink to="/help" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Settings size={20} />
          <span>Setting</span>
        </NavLink>

        <NavLink to="/logout" className="nav-link">
          <LogOut size={20} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
