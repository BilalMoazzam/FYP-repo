import React from "react";
import { useNavigate } from "react-router-dom";

const footerLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Inventory", path: "/inventory" },
  { name: "Orders", path: "/orders" },
  { name: "Analytics", path: "/analytics" },
];

const legalLinks = [
  { name: "Terms", path: "/terms" },
  { name: "Privacy", path: "/privacy" },
  { name: "Security", path: "/security" },
];

const SupportFooter = () => {
  const navigate = useNavigate();

  const handleDemoClick = (path) => {
    window.open(path, "_blank");
  };

  return (
    <footer className="intro-footer">
      <div className="footer-content">
        <div className="footer-links">
          {footerLinks.map((link, index) => (
            <button
              key={index}
              className="footer-link"
              onClick={() =>
                link.demo ? handleDemoClick(link.path) : navigate(link.path)
              }
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="legal-links">
          {legalLinks.map((link, index) => (
            <React.Fragment key={index}>
              <a href={link.path} className="legal-link">
                {link.name}
              </a>
              {index < legalLinks.length - 1 && (
                <span className="legal-separator">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="copyright">
          <p>© 2025 StockChain AI. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SupportFooter;
