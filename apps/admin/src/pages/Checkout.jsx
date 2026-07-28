import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';
import './Checkout.css';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, showToast } = useContext(AppContext);
  const { promos, addOrder } = useContext(AdminContext);

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  const cartTotal = getCartTotal();

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
  ];

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode) return;
    
    const validPromo = promos.find(p => p.code.toLowerCase() === promoCode.toLowerCase() && p.status === 'Active');
    
    if (validPromo) {
      setAppliedPromo(validPromo);
      showToast(`Promo ${validPromo.code} applied!`);
    } else {
      showToast(`Invalid or expired promo code`, 'error');
    }
  };

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percent') {
      return (cartTotal * appliedPromo.discount) / 100;
    } else {
      return appliedPromo.discount;
    }
  };

  const finalTotal = cartTotal - getDiscountAmount() + shippingCost;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      showToast('Razorpay SDK failed to load. Are you online?', 'error');
      return;
    }

    // Razorpay Options
    const options = {
      key: 'rzp_test_dummykeyforui', // Dummy Test Key
      amount: finalTotal * 100, // Amount is in currency subunits (paise)
      currency: 'INR',
      name: 'JATAYU STUDIOS',
      description: 'Test Transaction for Storefront',
      image: '/favicon.ico',
      handler: function (response) {
        // Successful Payment Callback
        const newOrder = {
          customer: customerInfo.name,
          total: finalTotal,
          paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
          items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        };

        // Add to AdminContext
        addOrder(newOrder);
        
        showToast('Payment successful! Order placed.', 'success');
        clearCart();
        
        setTimeout(() => {
          navigate('/account');
        }, 1000);
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.name.toLowerCase().replace(' ', '.') + '@example.com',
        contact: customerInfo.phone
      },
      theme: {
        color: '#121212' // JATAYU Brand Color
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="checkout-page">
      <div className="container">
        
        <div className="checkout-stepper">
          <div className="step completed">
            <div className="step-circle">✓</div>
            <span className="step-label">CONTACT</span>
          </div>
          <div className="step-line active"></div>
          <div className="step active">
            <div className="step-circle">2</div>
            <span className="step-label">DELIVERY</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-circle">3</div>
            <span className="step-label">PAYMENT</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-circle">4</div>
            <span className="step-label">REVIEW</span>
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            <div className="section-header">
              <h2>DELIVERY ADDRESS</h2>
              <span className="login-prompt">Have an account? <Link to="/account">Login</Link></span>
            </div>
            <p className="form-desc">Enter where you want your order delivered</p>
            
            <form id="checkout-form" className="address-form" onSubmit={handlePlaceOrder}>
              <div className="form-row">
                <input type="text" placeholder="Full Name*" required value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} />
                <input type="tel" placeholder="Phone Number*" required value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Address Line 1*" required value={customerInfo.address1} onChange={e => setCustomerInfo({...customerInfo, address1: e.target.value})} />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Address Line 2 (Optional)" value={customerInfo.address2} onChange={e => setCustomerInfo({...customerInfo, address2: e.target.value})} />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Pincode*" required value={customerInfo.pincode} onChange={e => setCustomerInfo({...customerInfo, pincode: e.target.value})} />
                <input type="text" placeholder="City / Town*" required value={customerInfo.city} onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})} />
              </div>
              <div className="form-row">
                <select required value={customerInfo.state} onChange={e => setCustomerInfo({...customerInfo, state: e.target.value})}>
                  <option value="" disabled>State*</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </form>

            <div className="shipping-method-section">
              <h2>SHIPPING METHOD</h2>
              <p className="form-desc">Choose your preferred shipping option</p>
              
              <div className="shipping-options">
                <label className={`shipping-option ${shippingCost === 0 ? 'active' : ''}`}>
                  <div className="option-info">
                    <input type="radio" name="shipping" checked={shippingCost === 0} onChange={() => setShippingCost(0)} />
                    <div>
                      <strong>Standard Shipping</strong>
                      <p>3-5 business days</p>
                    </div>
                  </div>
                  <div className="option-price">
                    <span className="text-green">FREE</span>
                    <p>Free on orders above ₹1999</p>
                  </div>
                </label>
                
                <label className={`shipping-option ${shippingCost === 149 ? 'active' : ''}`}>
                  <div className="option-info">
                    <input type="radio" name="shipping" checked={shippingCost === 149} onChange={() => setShippingCost(149)} />
                    <div>
                      <strong>Express Shipping</strong>
                      <p>1-2 business days</p>
                    </div>
                  </div>
                  <div className="option-price">
                    <span>₹149</span>
                    <p>Get your order faster</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="coupon-section">
              <h2>COUPON / GIFT CARD</h2>
              <div className="coupon-input">
                <input type="text" placeholder="Enter coupon code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <button className="btn-primary" onClick={handleApplyPromo}>APPLY</button>
              </div>
              {appliedPromo && (
                <div className="applied-coupon" style={{justifyContent: 'space-between', display: 'flex', marginTop: '1rem'}}>
                  <span className="coupon-tag">🏷️ {appliedPromo.code} <button onClick={() => setAppliedPromo(null)} style={{background:'none',border:'none',marginLeft:'8px',cursor:'pointer'}}>✕</button></span>
                  <span className="text-green">You saved ₹{getDiscountAmount().toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="checkout-actions">
              <button form="checkout-form" type="submit" className="btn-primary btn-continue">PLACE ORDER (MOCK PAYMENT)</button>
              <Link to="/bag" className="btn-text">&larr; BACK TO CART</Link>
            </div>
          </div>

          <div className="checkout-summary-section">
            <div className="summary-box">
              <div className="summary-header">
                <h3>ORDER SUMMARY <span className="item-count">({cart.reduce((a,b)=>a+b.quantity,0)} ITEMS)</span></h3>
                <Link to="/bag" className="btn-text">✎ Edit Cart</Link>
              </div>
              
              <div className="mini-cart-items">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="mini-cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="mini-item-details">
                      <h4>{item.name}</h4>
                      <p>Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                    <span className="mini-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                {appliedPromo && (
                  <div className="summary-row discount-row">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>- ₹{getDiscountAmount().toLocaleString()}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  {shippingCost === 0 ? <span className="text-green">FREE</span> : <span>₹{shippingCost}</span>}
                </div>
              </div>

              <div className="summary-total">
                <div>
                  <h4>Total</h4>
                  <p>Inclusive of all taxes</p>
                </div>
                <span className="total-price">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="trust-badges">
              <div className="trust-badge">
                <span className="badge-icon">🛡️</span>
                <div>
                  <h4>100% SECURE PAYMENT</h4>
                  <p>Your payments are safe with us.</p>
                </div>
              </div>
              <div className="payment-icons-list">
                <span className="payment-icon">VISA</span>
                <span className="payment-icon">MC</span>
                <span className="payment-icon">RUPAY</span>
                <span className="payment-icon">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
