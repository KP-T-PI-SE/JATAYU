import React, { useState, useContext } from 'react';
import { CustomerContext } from '../context/CustomerContext';
import { AdminContext } from '../context/AdminContext';
import './Account.css';

const Account = () => {
  const { currentCustomer, login, register, logout } = useContext(CustomerContext);
  const { orders } = useContext(AdminContext);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthError('');
    if (authMode === 'login') {
      const res = login(email, password);
      if (!res.success) setAuthError(res.error);
    } else {
      const res = register(name, email, password);
      if (!res.success) setAuthError(res.error);
    }
  };

  const handleDownloadInvoice = (order) => {
    let storeName = 'JATAYU STUDIOS';
    let gstNumber = '';
    
    try {
      const savedStoreSettings = localStorage.getItem('jatayu_store_settings_v1');
      if (savedStoreSettings) {
        const parsed = JSON.parse(savedStoreSettings);
        if (parsed.storeName) storeName = parsed.storeName;
        if (parsed.gstNumber) gstNumber = parsed.gstNumber;
      }
    } catch (e) {
      console.error(e);
    }

    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice ${order.id}</title>
          <style>
            body { font-family: 'Inter', sans-serif; color: #121212; padding: 40px; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #121212; padding-bottom: 20px; margin-bottom: 40px; }
            .brand { font-size: 24px; font-weight: bold; font-family: 'Playfair Display', serif; letter-spacing: 2px; text-transform: uppercase; }
            .invoice-details { text-align: right; }
            table { width: 100%; border-collapse: collapse; margin-top: 40px; }
            th { text-align: left; padding: 12px 0; border-bottom: 1px solid #ccc; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
            td { padding: 16px 0; border-bottom: 1px solid #eee; }
            .total-row td { font-weight: bold; font-size: 18px; border-top: 2px solid #121212; border-bottom: none; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">${storeName}</div>
              <p>123 Streetwear Ave<br/>Mumbai, MH 400001</p>
              ${gstNumber ? `<p style="font-weight: bold; margin-top: 8px;">GSTIN: ${gstNumber}</p>` : ''}
            </div>
            <div class="invoice-details">
              <h2>INVOICE</h2>
              <p>Order: <strong>${order.id}</strong><br/>Date: ${order.date}</p>
            </div>
          </div>
          <div class="bill-to">
            <h3>BILL TO:</h3>
            <p>${order.customer}<br/>${order.customer.toLowerCase().replace(' ', '.')}@example.com</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name} (x${item.quantity})</td>
                  <td style="text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td style="text-align: right;">Total Amount:</td>
                <td style="text-align: right;">₹${order.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  if (!currentCustomer) {
    return (
      <div className="account-page auth-page">
        <div className="container" style={{maxWidth: '500px', margin: '100px auto'}}>
          <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>{authMode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}</h2>
          
          {authError && <div style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{authError}</div>}
          
          <form onSubmit={handleAuth} className="settings-form">
            {authMode === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            
            <button type="submit" className="btn-primary" style={{width: '100%', marginBottom: '1rem'}}>
              {authMode === 'login' ? 'SIGN IN' : 'REGISTER'}
            </button>
            
            <p style={{textAlign: 'center'}}>
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                style={{background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit'}}
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              >
                {authMode === 'login' ? 'Create one' : 'Log in'}
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  // Filter orders for the current customer (case-insensitive name match for demo purposes)
  const myOrders = orders.filter(o => o.customer.toLowerCase() === currentCustomer.name.toLowerCase());

  return (
    <div className="account-page">
      <div className="account-hero dark-section">
        <div className="container">
          <div className="account-hero-content">
            <h1 className="page-title">MY ACCOUNT</h1>
            <p className="page-subtitle">Welcome back, {currentCustomer.name}. Manage your orders and preferences here.</p>
          </div>
        </div>
      </div>

      <div className="container account-main">
        <div className="account-layout">
          <aside className="account-sidebar">
            <nav className="account-nav">
              <button 
                className={`account-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile Details
              </button>
              <button 
                className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Order History ({myOrders.length})
              </button>
              <button 
                className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                Saved Addresses
              </button>
              <button 
                className={`account-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Account Settings
              </button>
              <button className="account-nav-btn logout-btn" onClick={logout}>
                Log Out
              </button>
            </nav>
          </aside>

          <main className="account-content">
            {activeTab === 'profile' && (
              <div className="account-section">
                <h2>Profile Details</h2>
                <form className="profile-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={currentCustomer.name} />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={currentCustomer.email} disabled />
                  </div>
                  <button type="button" className="btn-primary">SAVE CHANGES</button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="account-section">
                <h2>Order History</h2>
                <div className="order-list">
                  {myOrders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                  ) : (
                    myOrders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div>
                            <span className="order-number">Order #{order.id}</span>
                            <span className="order-date">{order.date}</span>
                          </div>
                          <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                        </div>
                        <div className="order-items">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="order-item-summary">
                              <span>{item.quantity}x {item.name}</span>
                              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-actions">
                          <button className="btn-text">TRACK ORDER</button>
                          <button className="btn-text" onClick={() => handleDownloadInvoice(order)}>DOWNLOAD INVOICE</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="account-section">
                <h2>Saved Addresses</h2>
                <div className="address-grid">
                  <div className="address-card add-new">
                    <button className="add-address-btn">
                      <span className="plus-icon">+</span>
                      <span>ADD NEW ADDRESS</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="account-section">
                <h2>Account Settings</h2>
                <form className="settings-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" />
                  </div>
                  <button type="button" className="btn-primary" style={{marginBottom: '2rem'}}>UPDATE PASSWORD</button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
