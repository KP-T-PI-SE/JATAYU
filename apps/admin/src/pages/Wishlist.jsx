import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist } = useContext(AppContext);

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="breadcrumbs">
          <span>HOME</span> &gt; <span>ACCOUNT</span> &gt; <span className="current">WISHLIST</span>
        </div>

        <div className="page-header wishlist-header">
          <div className="header-text">
            <h1 className="page-title">YOUR WISHLIST <span className="item-count">({wishlist.length} ITEMS)</span></h1>
            <p className="page-subtitle">Pieces you're keeping an eye on.</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline">ADD ALL TO BAG</button>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-state">
            <p>Your wishlist is currently empty.</p>
            <Link to="/search" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem', padding: '1rem 2rem'}}>CONTINUE SHOPPING</Link>
          </div>
        ) : (
          <div className="product-grid wishlist-grid">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
