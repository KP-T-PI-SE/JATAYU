import React, { useContext, useState } from 'react';
import { Eye, X, Printer } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const Orders = () => {
  const { orders, updateOrderStatus, storeSettings } = useContext(AdminContext);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus(id, newStatus);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Orders Management</h1>
        <div className="admin-page-actions">
          <button className="btn-outline">Export CSV</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-header-search" style={{width: '250px'}}>
            <input type="text" placeholder="Search orders..." />
          </div>
          <div className="filter-actions">
            <select style={{background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '8px 12px', borderRadius: '4px'}}>
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Returned</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td style={{fontWeight: 500}}>{order.id}</td>
                  <td style={{color: 'var(--color-text-secondary)'}}>{order.date}</td>
                  <td>
                    <div>{order.customer}</div>
                  </td>
                  <td>₹{order.total}</td>
                  <td>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`status-badge status-${order.status.toLowerCase()}`}
                      style={{ border: 'none', appearance: 'none', cursor: 'pointer', paddingRight: '24px' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Returned">Returned</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="View Details" onClick={() => setSelectedOrder(order)}><Eye size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="invoice-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="invoice-modal" style={{backgroundColor: 'var(--color-bg-primary)', padding: '32px', borderRadius: '8px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--color-border)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}} className="no-print">
              <h2 style={{margin: 0, fontSize: '1.25rem'}}>Order {selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} style={{background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer'}}><X size={24} /></button>
            </div>
            
            <div className="invoice-content" style={{marginBottom: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px'}}>
                <div>
                  <h3 style={{margin: '0 0 8px 0', fontSize: '1.1rem'}}>{storeSettings?.storeName || 'JATAYU STUDIOS'}</h3>
                  <p style={{margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>123 Streetwear Ave<br/>Mumbai, MH 400001</p>
                  {storeSettings?.gstNumber && (
                    <p style={{margin: '4px 0 0 0', fontSize: '0.875rem', fontWeight: 600}}>GSTIN: {storeSettings.gstNumber}</p>
                  )}
                </div>
                <div style={{textAlign: 'right'}}>
                  <h3 style={{margin: '0 0 8px 0', fontSize: '1.1rem'}}>INVOICE</h3>
                  <p style={{margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Date: {selectedOrder.date}</p>
                  <p style={{margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Status: {selectedOrder.status}</p>
                </div>
              </div>

              <div style={{marginBottom: '24px'}}>
                <h4 style={{margin: '0 0 8px 0', fontSize: '0.9rem'}}>BILL TO:</h4>
                <p style={{margin: 0, fontSize: '0.875rem'}}>{selectedOrder.customer}</p>
                <p style={{margin: '4px 0 0 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>customer@example.com<br/>+91 98765 43210</p>
              </div>

              <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '24px'}}>
                <thead>
                  <tr style={{borderBottom: '1px solid var(--color-border)'}}>
                    <th style={{textAlign: 'left', padding: '8px 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Item</th>
                    <th style={{textAlign: 'right', padding: '8px 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Qty</th>
                    <th style={{textAlign: 'right', padding: '8px 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items ? (
                    selectedOrder.items.map((item, idx) => (
                      <tr key={idx} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                        <td style={{padding: '12px 0', fontSize: '0.875rem'}}>Product ID: {item.productId}</td>
                        <td style={{textAlign: 'right', padding: '12px 0', fontSize: '0.875rem'}}>{item.quantity}</td>
                        <td style={{textAlign: 'right', padding: '12px 0', fontSize: '0.875rem'}}>-</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                      <td style={{padding: '12px 0', fontSize: '0.875rem'}}>Miscellaneous Items</td>
                      <td style={{textAlign: 'right', padding: '12px 0', fontSize: '0.875rem'}}>{selectedOrder.items || 1}</td>
                      <td style={{textAlign: 'right', padding: '12px 0', fontSize: '0.875rem'}}>₹{selectedOrder.total.toLocaleString()}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" style={{textAlign: 'right', padding: '16px 0 8px', fontWeight: 600}}>Total:</td>
                    <td style={{textAlign: 'right', padding: '16px 0 8px', fontWeight: 600, fontSize: '1.1rem'}}>₹{selectedOrder.total.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="no-print" style={{display: 'flex', justifyContent: 'flex-end'}}>
              <button className="btn-primary" onClick={handlePrint} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Printer size={16} /> Download / Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
