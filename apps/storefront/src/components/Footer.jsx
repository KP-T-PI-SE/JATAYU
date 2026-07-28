import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter-section">
        <div className="container newsletter-container">
          <div className="newsletter-text">
            <h3>BE THE FIRST TO KNOW</h3>
            <p>Early access to new drops, exclusive offers and more.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn-primary">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      <div className="main-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo-link">
              <div className="logo">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="eagle-icon">
                  <path d="M4 14l-2 4 4-2 4 4 1-5" />
                  <path d="M20 14l2 4-4-2-4 4-1-5" />
                  <path d="M12 2L9 9h6z" />
                </svg>
                <span className="logo-text">JATAYU</span>
              </div>
            </Link>
            <p className="brand-tagline">
              Clothing for the few who dare.<br />
              Designed to rise. Built to last.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Youtube">YT</a>
              <a href="#" aria-label="Pinterest">PIN</a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-column">
              <h4>SHOP</h4>
              <Link to="/shop">All Products</Link>
              <Link to="/men">Men</Link>
              <Link to="/women">Women</Link>
              <Link to="/new">New Arrivals</Link>
              <Link to="/collections">Collections</Link>
            </div>
            
            <div className="link-column">
              <h4>HELP</h4>
              <Link to="/shipping">Shipping & Delivery</Link>
              <Link to="/returns">Returns & Exchanges</Link>
              <Link to="/size-guide">Size Guide</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/track">Track Order</Link>
            </div>

            <div className="link-column">
              <h4>COMPANY</h4>
              <Link to="/about">About Us</Link>
              <Link to="/story">Our Story</Link>
              <Link to="/sustainability">Sustainability</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/press">Press</Link>
            </div>

            <div className="link-column">
              <h4>CONNECT</h4>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">YouTube</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>© 2025 JATAYU. All rights reserved.</p>
          <div className="bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <button className="region-btn">India (INR) v</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
