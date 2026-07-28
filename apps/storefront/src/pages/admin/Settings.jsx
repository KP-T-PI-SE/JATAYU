import React, { useState, useContext } from 'react';
import { Save, User, Bell, Shield, Mail, Store } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const Settings = () => {
  const { notificationSettings, setNotificationSettings, storeSettings, setStoreSettings } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@jatayu.com',
    role: 'Super Admin'
  });
  
  // Local state for the toggles before saving
  const [localNotifications, setLocalNotifications] = useState(notificationSettings);
  const [localStoreSettings, setLocalStoreSettings] = useState(storeSettings || { name: '', email: '' });

  const handleSave = (e) => {
    e.preventDefault();
    if (activeTab === 'notifications') {
      setNotificationSettings(localNotifications);
    } else if (activeTab === 'store') {
      setStoreSettings(localStoreSettings);
    }
    // Simulate save
    alert('Settings saved successfully!');
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Settings</h1>
        <div className="admin-page-actions">
          <button className="btn-primary" onClick={handleSave} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="settings-layout" style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
        {/* Settings Sidebar */}
        <div className="settings-sidebar" style={{width: '250px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px'}}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
              backgroundColor: activeTab === 'profile' ? 'rgba(255,255,255,0.05)' : 'transparent',
              color: activeTab === 'profile' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              border: 'none', borderLeft: activeTab === 'profile' ? '2px solid var(--color-text-primary)' : '2px solid transparent',
              textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', borderRadius: '0 8px 8px 0', fontWeight: activeTab === 'profile' ? 600 : 400
            }}
          >
            <User size={18} /> My Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('store')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
              backgroundColor: activeTab === 'store' ? 'rgba(255,255,255,0.05)' : 'transparent',
              color: activeTab === 'store' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              border: 'none', borderLeft: activeTab === 'store' ? '2px solid var(--color-text-primary)' : '2px solid transparent',
              textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', borderRadius: '0 8px 8px 0', fontWeight: activeTab === 'store' ? 600 : 400
            }}
          >
            <Store size={18} /> Store Details
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
              backgroundColor: activeTab === 'notifications' ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: 'none', borderLeft: activeTab === 'notifications' ? '2px solid var(--color-text-primary)' : '2px solid transparent',
              color: activeTab === 'notifications' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderRadius: '0 8px 8px 0', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'notifications' ? 600 : 400, transition: 'all 0.2s'
            }}
          >
            <Bell size={18} /> Notifications
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
              backgroundColor: activeTab === 'security' ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: 'none', color: activeTab === 'security' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'security' ? 600 : 400
            }}
          >
            <Shield size={18} /> Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="admin-card" style={{ flexBasis: '400px', flexGrow: 999, margin: 0 }}>
          {activeTab === 'profile' && (
            <div style={{padding: '24px'}}>
              <h2 style={{fontSize: '1.25rem', marginBottom: '24px'}}>Admin Profile Details</h2>
              <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px'}}>
                  <div style={{width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)'}}>
                    <User size={32} color="var(--color-text-secondary)" />
                  </div>
                  <button type="button" className="btn-outline">Change Avatar</button>
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Full Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} style={{width: '100%', maxWidth: '400px', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Email Address</label>
                  <div style={{position: 'relative', width: '100%', maxWidth: '400px'}}>
                    <Mail size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)'}} />
                    <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} style={{width: '100%', padding: '12px 12px 12px 40px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                  </div>
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Role</label>
                  <input type="text" value={profile.role} disabled style={{width: '100%', maxWidth: '400px', padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', cursor: 'not-allowed'}} />
                  <p style={{margin: '8px 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>Roles can only be changed by the store owner.</p>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'store' && (
            <div style={{padding: '24px'}}>
              <h2 style={{fontSize: '1.25rem', marginBottom: '24px'}}>Store Details</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Store Name</label>
                  <input 
                    type="text" 
                    value={localStoreSettings.storeName || 'Jatayu Studios'} 
                    onChange={e => setLocalStoreSettings({...localStoreSettings, storeName: e.target.value})}
                    style={{width: '100%', padding: '10px 14px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '6px', color: 'var(--color-text-primary)'}}
                  />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>GST Number (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Enter GSTIN e.g. 27AAAAA0000A1Z5"
                    value={localStoreSettings.gstNumber || ''} 
                    onChange={e => setLocalStoreSettings({...localStoreSettings, gstNumber: e.target.value})}
                    style={{width: '100%', padding: '10px 14px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '6px', color: 'var(--color-text-primary)'}}
                  />
                  <p style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '6px'}}>If provided, this GST number will appear on all customer invoices.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div style={{padding: '24px'}}>
              <h2 style={{fontSize: '1.25rem', marginBottom: '8px'}}>Notification Preferences</h2>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '0.875rem'}}>Choose what alerts you want to receive on your dashboard and email.</p>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <div>
                    <h3 style={{fontSize: '1rem', margin: '0 0 4px'}}>New Orders</h3>
                    <p style={{margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Get notified when a customer places a new order.</p>
                  </div>
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <input type="checkbox" checked={localNotifications.newOrders} onChange={e => setLocalNotifications({...localNotifications, newOrders: e.target.checked})} style={{width: '20px', height: '20px', accentColor: 'var(--color-text-primary)'}} />
                  </label>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <div>
                    <h3 style={{fontSize: '1rem', margin: '0 0 4px'}}>Low Stock Alerts</h3>
                    <p style={{margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Alert me when a product falls below 5 units.</p>
                  </div>
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <input type="checkbox" checked={localNotifications.lowStock} onChange={e => setLocalNotifications({...localNotifications, lowStock: e.target.checked})} style={{width: '20px', height: '20px', accentColor: 'var(--color-text-primary)'}} />
                  </label>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                  <div>
                    <h3 style={{fontSize: '1rem', margin: '0 0 4px'}}>Returns & Cancellations</h3>
                    <p style={{margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Get notified when an order status changes to Returned.</p>
                  </div>
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <input type="checkbox" checked={localNotifications.returns} onChange={e => setLocalNotifications({...localNotifications, returns: e.target.checked})} style={{width: '20px', height: '20px', accentColor: 'var(--color-text-primary)'}} />
                  </label>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h3 style={{fontSize: '1rem', margin: '0 0 4px'}}>Daily Performance Summary</h3>
                    <p style={{margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Receive an email every morning with yesterday's revenue.</p>
                  </div>
                  <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <input type="checkbox" checked={localNotifications.dailySummary} onChange={e => setLocalNotifications({...localNotifications, dailySummary: e.target.checked})} style={{width: '20px', height: '20px', accentColor: 'var(--color-text-primary)'}} />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={{padding: '24px'}}>
              <h2 style={{fontSize: '1.25rem', marginBottom: '24px'}}>Security Settings</h2>
              <form style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>New Password</label>
                  <input type="password" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                </div>
                <div>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Confirm New Password</label>
                  <input type="password" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                </div>
                <button type="button" className="btn-outline" style={{marginTop: '8px'}}>Update Password</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
