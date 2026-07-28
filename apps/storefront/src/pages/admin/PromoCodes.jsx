import React, { useContext, useState } from 'react';
import { Tag, Plus, Trash2, X } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const PromoCodes = () => {
  const { promos, addPromo, deletePromo } = useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ code: '', discount: '', type: 'percent', status: 'Active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPromo({
      code: formData.code.toUpperCase(),
      discount: Number(formData.discount),
      type: formData.type,
      status: formData.status
    });
    setIsModalOpen(false);
    setFormData({ code: '', discount: '', type: 'percent', status: 'Active' });
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Promo Codes & Marketing</h1>
        <div className="admin-page-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Plus size={16} /> Create Promo Code
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Total Uses</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map(promo => (
                <tr key={promo.id}>
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, letterSpacing: '1px'}}>
                      <Tag size={16} color="var(--color-text-secondary)" />
                      {promo.code}
                    </div>
                  </td>
                  <td style={{fontWeight: 500}}>
                    {promo.type === 'percent' ? `${promo.discount}% OFF` : `₹${promo.discount} OFF`}
                  </td>
                  <td>{promo.uses} times</td>
                  <td>
                    <span className={`status-badge ${promo.status === 'Active' ? 'status-delivered' : 'status-cancelled'}`}>
                      {promo.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn text-red" onClick={() => deletePromo(promo.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {promos.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '32px', color: 'var(--color-text-secondary)'}}>
                    No promo codes active. Create one to start a marketing campaign!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div style={{backgroundColor: 'var(--color-bg-primary)', padding: '32px', borderRadius: '8px', width: '400px', border: '1px solid var(--color-border)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2 style={{margin: 0, fontSize: '1.25rem'}}>Create Promo Code</h2>
              <button onClick={() => setIsModalOpen(false)} style={{background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer'}}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Code Name</label>
                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})} placeholder="e.g. JATAYU20" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white', textTransform: 'uppercase'}} />
              </div>
              
              <div style={{display: 'flex', gap: '16px'}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Discount Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}}>
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Amount</label>
                  <input required type="number" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} placeholder="e.g. 20" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{marginTop: '16px', padding: '12px'}}>Create Promo</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoCodes;
