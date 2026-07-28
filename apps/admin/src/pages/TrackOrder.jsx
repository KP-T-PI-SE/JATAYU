import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './HelpPages.css';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const { showToast } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderNumber && email) {
      showToast('Tracking information sent to your email', 'success');
      setOrderNumber('');
      setEmail('');
    } else {
      showToast('Please enter both order number and email', 'error');
    }
  };

  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">TRACK ORDER</span>
        </div>
        
        <div className="help-header">
          <h1>TRACK YOUR ORDER</h1>
          <p>Enter your order details below to see the current status of your shipment.</p>
        </div>

        <div className="track-form">
          <form onSubmit={handleSubmit}>
            <div className="track-input-group">
              <label htmlFor="orderNumber">ORDER NUMBER</label>
              <input 
                type="text" 
                id="orderNumber" 
                placeholder="e.g. #JAT-12345" 
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            
            <div className="track-input-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Email used for the order" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn-primary track-btn">
              TRACK ORDER
            </button>
          </form>
          
          <div style={{marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>
            <p>Can't find your order number? Check your order confirmation email or log into your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
