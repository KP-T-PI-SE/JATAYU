import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';
import './Bag.css';

const Bag = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(AppContext);


  const { products } = useContext(AdminContext);
  const suggestedItems = products ? products.slice(0, 4) : [];

  return (
    <div className="bag-page">
      <div className="container">
        <div className="breadcrumbs">
          <span>HOME</span> &gt; <span className="current">SHOPPING BAG</span>
        </div>

        <div className="page-header bag-header">
          <div className="header-text">
            <h1 className="page-title">YOUR BAG <span className="item-count">({cart.reduce((a,b)=>a+b.quantity,0)} ITEMS)</span></h1>
            <p className="page-subtitle">Almost there. Review your items and proceed to checkout.</p>
          </div>
          <div className="secure-badge">
            <span>🔒</span>
            <div>
              <strong>SECURE CHECKOUT</strong>
              <p>100% secure payments</p>
            </div>
          </div>
        </div>

        <div className="bag-layout">
          <div className="bag-items-section">
            <div className="bag-table-header">
              <span className="col-product">PRODUCT</span>
              <span className="col-size">SIZE</span>
              <span className="col-qty">QTY</span>
              <span className="col-price">PRICE</span>
              <span className="col-total">TOTAL</span>
            </div>

            <div className="bag-items">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="bag-item">
                  <div className="col-product item-info">
                    <img src={item.images?.[0]?.url || item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-color">
                        {item.color && (
                          <span>Color: {item.color}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-size item-size">
                    <div className="size-box">{item.size}</div>
                  </div>
                  
                  <div className="col-qty item-qty-wrap">
                    <div className="qty-selector">
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                    </div>
                    <p className="stock-status">In Stock</p>
                  </div>
                  
                  <div className="col-price item-price">₹{item.price.toLocaleString()}</div>
                  
                  <div className="col-total item-total">
                    ₹{(item.price * item.quantity).toLocaleString()}
                    <div className="item-actions">
                      <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size, item.color)}>🗑️ Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length === 0 && <div className="bag-empty"><p>Your bag is empty.</p></div>}
            </div>

            <div className="bag-actions-bottom">
              <button className="btn-text">♡ SAVE ALL TO WISHLIST</button>
              <button className="btn-text">🗑️ CLEAR BAG</button>
            </div>

            <div className="bag-suggested">
              <div className="related-header">
                <h3 className="section-title" style={{textAlign: 'left', marginBottom: 0}}>YOU MAY ALSO LIKE</h3>
                <button className="btn-text">VIEW ALL &rarr;</button>
              </div>
              <div className="product-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
                {suggestedItems.map(item => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="bag-summary-section">
            <div className="summary-box">
              <h3>ORDER SUMMARY</h3>
              <div className="summary-row">
                <span>Subtotal ({cart.reduce((a,b)=>a+b.quantity,0)} Items)</span>
                <span>₹{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="summary-row discount-row">
                <span>Discount</span>
                <span>- ₹0</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="text-green">FREE</span>
              </div>
              <p className="shipping-note text-green">You've unlocked free shipping!</p>

              <div className="summary-total">
                <div>
                  <h4>Total</h4>
                  <p>Inclusive of all taxes</p>
                </div>
                <span className="total-price">₹{getCartTotal().toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-primary btn-checkout">PROCEED TO CHECKOUT</Link>
              <button className="btn-outline btn-buy-now">BUY IT NOW</button>
              
              <div className="shipping-progress">
                <p>You are ₹735 away from<br/><strong>Free Express Shipping</strong></p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '70%'}}></div>
                </div>
              </div>
            </div>

            <div className="coupon-box">
              <h3>APPLY COUPON</h3>
              <div className="coupon-input">
                <input type="text" placeholder="Enter coupon code" />
                <button className="btn-primary">APPLY</button>
              </div>
              <div className="applied-coupon">
                <span className="coupon-tag">🏷️ WELCOME10 ✕</span>
                <span className="coupon-msg">10% off applied</span>
              </div>
            </div>

            <div className="payment-methods">
              <h3>WE ACCEPT</h3>
              <div className="payment-icons">
                <span className="payment-icon">VISA</span>
                <span className="payment-icon">MC</span>
                <span className="payment-icon">RUPAY</span>
                <span className="payment-icon">UPI</span>
                <span className="payment-icon">PAYTM</span>
                <span className="payment-icon">GPAY</span>
                <span className="payment-icon">APAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
