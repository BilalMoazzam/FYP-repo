import { Linkedin, Facebook, Twitter, Youtube } from "lucide-react"

const SupportFooter = () => {
  return (
    <div className="support-footer">
      <div className="footer-links">
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li>
              <a href="#company">Company</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#dashboard">Dashboard</a>
            </li>
            <li>
              <a href="#inventory">Inventory</a>
            </li>
            <li>
              <a href="#orders">Orders</a>
            </li>
            <li>
              <a href="#analytics">Analytics</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="#documentation">Documentation</a>
            </li>
            <li>
              <a href="#tutorials">Tutorials</a>
            </li>
            <li>
              <a href="#webinars">Webinars</a>
            </li>
            <li>
              <a href="#api">API</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Terms & Conditions</h3>
          <ul>
            <li>
              <a href="#terms">Terms of Use</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#security">Security</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Cancellation</h3>
          <ul>
            <li>
              <a href="#refund">Refund Policy</a>
            </li>
            <li>
              <a href="#cancel">Cancel Subscription</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Cookie policy</h3>
          <ul>
            <li>
              <a href="#cookies">Cookie Settings</a>
            </li>
            <li>
              <a href="#preferences">Preferences</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Data Privacy Notification</h3>
          <ul>
            <li>
              <a href="#gdpr">GDPR Compliance</a>
            </li>
            <li>
              <a href="#data-rights">Your Data Rights</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Live Support</h3>
          <ul>
            <li>
              <a href="#chat">Chat Support</a>
            </li>
            <li>
              <a href="#ticket">Submit Ticket</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-links">
          <a href="#linkedin" className="social-link">
            <Linkedin size={20} />
          </a>
          <a href="#facebook" className="social-link">
            <Facebook size={20} />
          </a>
          <a href="#twitter" className="social-link">
            <Twitter size={20} />
          </a>
          <a href="#youtube" className="social-link">
            <Youtube size={20} />
          </a>
        </div>

        <div className="company-logo">
          <span className="logo-text">STOCK CHAIN AI</span>
        </div>

        <div className="copyright">© 2025 StockChain AI. All Rights Reserved.</div>
      </div>
    </div>
  )
}

export default SupportFooter
