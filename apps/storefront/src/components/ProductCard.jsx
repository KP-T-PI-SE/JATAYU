import { useContext } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useContext(AppContext);
  const inWishlist = isInWishlist(product._id || product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.badges && product.badges.map((badge, index) => (
          <span key={index} className={`badge badge-${badge.toLowerCase().replace(' ', '-')}`}>
            {badge}
          </span>
        ))}
        <button 
          className="wishlist-btn" 
          aria-label="Add to wishlist"
          onClick={handleToggleWishlist}
          style={{ color: inWishlist ? '#d32f2f' : 'inherit' }}
        >
          <Heart size={20} fill={inWishlist ? '#d32f2f' : 'none'} />
        </button>
        <Link to={`/product/${product._id || product.id}`}>
          <img src={product.images?.[0]?.url || product.image} alt={product.name} className="product-image hover-scale" />
        </Link>
      </div>
      <div className="product-details">
        <Link to={`/product/${product._id || product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-price">
          <span className="price-current">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="product-colors">
          {product.colors && product.colors.map((color, index) => (
            <span 
              key={index} 
              className="color-swatch" 
              style={{ backgroundColor: color }}
              aria-label={`Color ${index}`}
            ></span>
          ))}
          {product.additionalColors > 0 && (
            <span className="additional-colors">+{product.additionalColors}</span>
          )}
        </div>
        <button className="btn-primary add-to-bag-btn" onClick={handleAddToCart}>ADD TO BAG</button>
      </div>
    </div>
  );
};

export default ProductCard;
