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
import logoImage from "../../assets/logo-Image.png";

const Sidebar = ({ onShowLogoutModal }) => {
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
          <img src={logoImage} alt="StockChain AI" />
        </div>
        <h2>StockChain AI</h2>
      </div>

      <nav className="nav-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Package size={20} />
          <span>Inventory Management</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <ShoppingCart size={20} />
          <span>Order Management</span>
        </NavLink>

        <NavLink
          to="/supply-chain"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Network size={20} />
          <span>Supply Chain Overview</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <BarChart2 size={20} />
          <span>Analytics & Report</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Users size={20} />
          <span>User Management</span>
        </NavLink>

        <NavLink
          to="/blockchain-transaction"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Blocks size={20} />
          <span>Blockchain Transaction</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <div className="notification-icon">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </div>
          <span>Notification Page</span>
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <Settings size={20} />
          <span>Setting</span>
        </NavLink>

        <button
          className="nav-link"
          onClick={onShowLogoutModal}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 20px",
            color: "#b3b3b3",
            backgroundColor: "transparent",
            border: "none",
            width: "100%",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.target.style.color = "#b3b3b3")}
        >
          <LogOut size={20} style={{ marginRight: "10px" }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
