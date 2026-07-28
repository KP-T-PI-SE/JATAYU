import React, { useContext } from 'react';
import { Mail, MoreVertical } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const Customers = () => {
  const { customers } = useContext(AdminContext);

  const getTier = (spend) => {
    if (spend >= 20000) return { label: 'VIP', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' };
    if (spend >= 10000) return { label: 'Gold', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
    return { label: 'Standard', color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.1)' };
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Customers</h1>
        <div className="admin-page-actions">
          <button className="btn-outline">Export List</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-header-search" style={{width: '250px'}}>
            <input type="text" placeholder="Search customers..." />
          </div>
          <div className="filter-actions">
            <select style={{background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '8px 12px', borderRadius: '4px'}}>
              <option>Sort by: Newest</option>
              <option>Sort by: Spend (High-Low)</option>
              <option>Sort by: Orders (High-Low)</option>
            </select>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Tier</th>
                <th>Contact</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => {
                const tier = getTier(customer.totalSpent);
                return (
                <tr key={customer.id}>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontWeight: 600}}>
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{fontWeight: 500}}>{customer.name}</div>
                        <div style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      backgroundColor: tier.bg,
                      color: tier.color,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: `1px solid ${tier.color}30`
                    }}>
                      {tier.label}
                    </span>
                  </td>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)'}}>
                      <Mail size={14} /> {customer.email}
                    </div>
                  </td>
                  <td>{customer.orders} orders</td>
                  <td style={{fontWeight: 500}}>₹{customer.totalSpent.toLocaleString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Customers;
