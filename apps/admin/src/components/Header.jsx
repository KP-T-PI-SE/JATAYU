import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useContext(AppContext);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
        
        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/new" onClick={() => setIsMobileMenuOpen(false)}>NEW</Link>
          <Link to="/men" onClick={() => setIsMobileMenuOpen(false)}>MEN</Link>
          <Link to="/women" onClick={() => setIsMobileMenuOpen(false)}>WOMEN</Link>
          <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)}>COLLECTIONS</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
        </nav>

        <div className="header-actions">
          <Link to="/search" className="action-btn" aria-label="Search">
            <Search size={20} />
            <span className="sr-only">SEARCH</span>
          </Link>
          <Link to="/account" className="action-btn" aria-label="Account">
            <User size={20} />
            <span className="sr-only">ACCOUNT</span>
          </Link>
          <Link to="/wishlist" className="action-btn" aria-label="Wishlist">
            <Heart size={20} />
            <span className="sr-only">WISHLIST</span>
          </Link>
          <Link to="/bag" className="action-btn cart-btn" aria-label="Bag">
            <ShoppingBag size={20} />
            <span className="sr-only">BAG</span>
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
