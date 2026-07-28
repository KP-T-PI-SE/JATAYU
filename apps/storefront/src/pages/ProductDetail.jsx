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
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('#1a1a1a');

  // Find product by id
  const currentProduct = products.find(p => (p.id || p._id).toString() === id);

  // Get related products (same category, exclude current)
  const relatedProducts = currentProduct 
    ? products.filter(p => p.category === currentProduct.category && (p.id || p._id) !== (currentProduct.id || currentProduct._id)).slice(0, 4)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (currentProduct) {
      if (currentProduct.colors && currentProduct.colors.length > 0) {
        setSelectedColor(currentProduct.colors[0]);
      }
      if (currentProduct.sizes && currentProduct.sizes.length > 0) {
        setSelectedSize(currentProduct.sizes[0]);
      }
    }
  }, [currentProduct]);

  if (!currentProduct) {
    return (
      <div className="pdp-page" style={{padding: '100px 20px', textAlign: 'center'}}>
        <h2>Product not found</h2>
        <Link to="/search" className="btn-primary" style={{marginTop: '20px', display: 'inline-block'}}>BACK TO SHOP</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(currentProduct.id || currentProduct._id);

  const handleAddToCart = () => {
    if (currentProduct.colors && currentProduct.colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }
    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(currentProduct, selectedSize, selectedColor, 1);
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
              <img src={currentProduct.images?.[0]?.url || currentProduct.image} alt="Thumbnail 1" className="thumb active" />
              <button className="nav-btn">v</button>
            </div>
            <div className="main-image-container">
              <img src={currentProduct.images?.[0]?.url || currentProduct.image} alt={currentProduct.name} className="main-image" />
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
              {currentProduct.rating ? (
                <>
                  <span className="stars">{'★'.repeat(Math.round(currentProduct.rating))}{'☆'.repeat(5 - Math.round(currentProduct.rating))}</span>
                  <span className="review-text">{currentProduct.rating} ({currentProduct.reviews || 0} reviews)</span>
                </>
              ) : (
                <span className="review-text" style={{color: '#888'}}>No reviews yet</span>
              )}
              <span style={{marginLeft: 'auto', fontWeight: 600, color: currentProduct.stock > 0 ? '#10b981' : '#ef4444'}}>
                {currentProduct.stock > 0 ? `🟢 ${currentProduct.stock} In Stock` : '🔴 Out of Stock'}
              </span>
            </div>

            <p className="pdp-description" style={{ whiteSpace: 'pre-line' }}>
              {currentProduct.description || "Crafted for comfort. Designed to stand out. Heavyweight fabric with a relaxed oversized fit and our signature artwork."}
            </p>

            <div className="pdp-options">
              {currentProduct.colors && currentProduct.colors.length > 0 && (
                <div className="option-group">
                  <span className="option-label">COLOR: <span>{selectedColor || 'SELECT COLOR'}</span></span>
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px'}}>
                    {currentProduct.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: selectedColor === color ? '#fff' : '#111',
                          color: selectedColor === color ? '#000' : '#fff',
                          border: `1px solid ${selectedColor === color ? '#fff' : '#333'}`,
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 500,
                          transition: 'all 0.2s'
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentProduct.sizes && currentProduct.sizes.length > 0 && (
                <div className="option-group">
                  <div className="size-header">
                    <span className="option-label">SIZE: <span>{selectedSize || 'SELECT SIZE'}</span></span>
                    <button className="size-guide-btn">📏 Size Guide</button>
                  </div>
                  <div className="size-grid pdp-size-grid">
                    {currentProduct.sizes.map(size => (
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
              )}
            </div>

            {currentProduct.badges && currentProduct.badges.length > 0 && (
              <div className="pdp-badges">
                {currentProduct.badges.map((badge, index) => (
                  <span key={index} className="pdp-badge">{badge}</span>
                ))}
              </div>
            )}

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
              {activeTab === 'DETAILS' && (
                <>
                  <p className="tab-desc" style={{ whiteSpace: 'pre-line' }}>
                    {currentProduct.description}
                  </p>
                  <ul className="tab-list">
                    {currentProduct.materials && currentProduct.materials.length > 0 ? (
                      currentProduct.materials.map((mat, index) => (
                        <li key={index}>{mat}</li>
                      ))
                    ) : (
                      <li>No material details available.</li>
                    )}
                  </ul>
                </>
              )}
              {activeTab === 'MATERIAL & CARE' && (
                <div className="tab-desc">
                  <p><strong>Care Instructions:</strong></p>
                  <ul>
                    <li>Machine wash cold inside out</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low or hang dry</li>
                    <li>Do not iron directly on print</li>
                  </ul>
                </div>
              )}
              {activeTab === 'SHIPPING & RETURNS' && (
                <div className="tab-desc">
                  <p><strong>Shipping:</strong> Free shipping on all orders above ₹1999. Standard delivery takes 3-5 business days.</p>
                  <p style={{marginTop: '12px'}}><strong>Returns:</strong> We offer a 14-day return and exchange policy for all unworn items with tags attached.</p>
                </div>
              )}
            </div>
          </div>
          <div className="details-image">
            <img src={currentProduct.images?.[0]?.url || currentProduct.image} alt="Product detail" />
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
