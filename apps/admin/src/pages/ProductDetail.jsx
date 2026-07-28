import { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Maximize2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useContext(AppContext);
  const { products } = useContext(AdminContext);
  
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#1a1a1a');

  // Find product by id
  const currentProduct = products.find(p => p.id.toString() === id);

  // Get related products (same category, exclude current)
  const relatedProducts = currentProduct 
    ? products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!currentProduct) {
    return (
      <div className="pdp-page" style={{padding: '100px 20px', textAlign: 'center'}}>
        <h2>Product not found</h2>
        <Link to="/search" className="btn-primary" style={{marginTop: '20px', display: 'inline-block'}}>BACK TO SHOP</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(currentProduct.id);

  const handleAddToCart = () => {
    addToCart(currentProduct, selectedSize, 1);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(currentProduct);
  };

  return (
    <div className="pdp-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <Link to="/search">SHOP</Link> &gt; <Link to={`/${currentProduct.category.toLowerCase()}`}>{currentProduct.category.toUpperCase()}</Link> &gt; <span className="current">{currentProduct.name}</span>
        </div>

        <div className="pdp-main">
          <div className="pdp-gallery">
            <div className="thumbnail-list">
              <button className="nav-btn">^</button>
              <img src={currentProduct.image} alt="Thumb 1" className="thumb active" />
              <img src={currentProduct.image} alt="Thumb 2" className="thumb" />
              <img src={currentProduct.image} alt="Thumb 3" className="thumb" />
              <img src={currentProduct.image} alt="Thumb 4" className="thumb" />
              <button className="nav-btn">v</button>
            </div>
            <div className="main-image-container">
              <img src={currentProduct.image} alt={currentProduct.name} className="main-image" />
              <button className="expand-btn"><Maximize2 size={20} /></button>
            </div>
          </div>

          <div className="pdp-info">
            <h1 className="pdp-title">{currentProduct.name}</h1>
            <div className="pdp-price-wrap">
              <span className="pdp-price">₹{currentProduct.price.toLocaleString()}</span>
              {currentProduct.discount > 0 && (
                <span className="original-price" style={{textDecoration: 'line-through', color: '#888', marginLeft: '12px'}}>
                  ₹{Math.floor(currentProduct.price / (1 - currentProduct.discount / 100)).toLocaleString()}
                </span>
              )}
              <span className="pdp-tax-info" style={{marginLeft: '12px'}}>Inclusive of all taxes</span>
            </div>
            
            <div className="pdp-reviews">
              <span className="stars">★★★★★</span>
              <span className="review-text">4.8 (128 reviews)</span>
            </div>

            <p className="pdp-description">
              Crafted for comfort. Designed to stand out.
              Heavyweight fabric with a relaxed oversized fit
              and our signature Raven artwork.
            </p>

            <div className="pdp-options">
              <div className="option-group">
                <span className="option-label">COLOR: <span>BLACK</span></span>
                <div className="color-grid">
                  <button className={`color-btn ${selectedColor === '#1a1a1a' ? 'active' : ''}`} style={{backgroundColor: '#1a1a1a'}} onClick={() => setSelectedColor('#1a1a1a')}></button>
                  <button className={`color-btn ${selectedColor === '#4a3b32' ? 'active' : ''}`} style={{backgroundColor: '#4a3b32'}} onClick={() => setSelectedColor('#4a3b32')}></button>
                  <button className={`color-btn ${selectedColor === '#5c5c5c' ? 'active' : ''}`} style={{backgroundColor: '#5c5c5c'}} onClick={() => setSelectedColor('#5c5c5c')}></button>
                  <button className={`color-btn ${selectedColor === '#e8e5dc' ? 'active' : ''}`} style={{backgroundColor: '#e8e5dc'}} onClick={() => setSelectedColor('#e8e5dc')}></button>
                </div>
              </div>

              <div className="option-group">
                <div className="size-header">
                  <span className="option-label">SIZE: <span>SELECT SIZE</span></span>
                  <button className="size-guide-btn">📏 Size Guide</button>
                </div>
                <div className="size-grid pdp-size-grid">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button 
                      key={size} 
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pdp-badges">
              <span className="pdp-badge">👕 Oversized Fit</span>
              <span className="pdp-badge">🧵 430 GSM Fabric</span>
              <span className="pdp-badge">⭐ Premium Quality</span>
            </div>

            <div className="pdp-actions">
              <button className="btn-primary btn-add-bag" onClick={handleAddToCart}>
                🛍️ ADD TO BAG | ₹2,899
              </button>
              <button className="btn-outline btn-buy-now">BUY NOW</button>
              <button 
                className="btn-text btn-wishlist" 
                onClick={handleToggleWishlist}
                style={{ color: inWishlist ? '#d32f2f' : 'inherit' }}
              >
                <Heart size={16} fill={inWishlist ? '#d32f2f' : 'none'} /> 
                {inWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="features-banner pdp-features">
        <div className="container features-container">
          <div className="feature">
            <span className="feature-icon">🚚</span>
            <div>
              <h4>FREE SHIPPING</h4>
              <p>On all orders above ₹1999</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <div>
              <h4>EASY RETURNS</h4>
              <p>14 days return & exchange</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🛡️</span>
            <div>
              <h4>SECURE PAYMENT</h4>
              <p>100% secure checkout</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🌱</span>
            <div>
              <h4>CO2 NEUTRAL SHIPPING</h4>
              <p>We ship sustainably</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pdp-details-section">
        <div className="container pdp-details-grid">
          <div className="details-content">
            <div className="tabs">
              <button className={`tab-btn ${activeTab === 'DETAILS' ? 'active' : ''}`} onClick={() => setActiveTab('DETAILS')}>DETAILS</button>
              <button className={`tab-btn ${activeTab === 'MATERIAL & CARE' ? 'active' : ''}`} onClick={() => setActiveTab('MATERIAL & CARE')}>MATERIAL & CARE</button>
              <button className={`tab-btn ${activeTab === 'SHIPPING & RETURNS' ? 'active' : ''}`} onClick={() => setActiveTab('SHIPPING & RETURNS')}>SHIPPING & RETURNS</button>
            </div>
            
            <div className="tab-pane">
              <p className="tab-desc">
                The Raven Oversized Hoodie is built for those who move different. Heavyweight, ultra-soft and designed with our signature artwork that represents freedom, strength and resilience.
              </p>
              <ul className="tab-list">
                <li>100% Premium Cotton</li>
                <li>430 GSM Heavyweight Fleece</li>
                <li>Oversized Fit</li>
                <li>Drop Shoulder</li>
                <li>Kangaroo Pocket</li>
                <li>Signature JATAYU Artwork Embroidery</li>
                <li>Made in India</li>
              </ul>
            </div>
          </div>
          <div className="details-image">
            <img src="/raven_hoodie_back_1785054706044.png" alt="Embroidery detail" />
          </div>
        </div>
      </div>

      <div className="related-section">
        <div className="container">
          <div className="related-header">
            <h2 className="section-title" style={{textAlign: 'left', marginBottom: 0}}>YOU MIGHT ALSO LIKE</h2>
            <button className="btn-text">VIEW ALL &rarr;</button>
          </div>
          <div className="product-grid search-grid">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
