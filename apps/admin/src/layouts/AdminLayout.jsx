import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Bell, User as UserIcon, Tag, X, Menu } from 'lucide-react';
import { AdminContext } from '../context/AdminContext';
import '../pages/admin/Admin.css';

const AdminLayout = () => {
  const { activities, isAuthenticated, logout } = useContext(AdminContext);
  const [isFeedOpen, setIsFeedOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Route Protection
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="eagle-icon">
              <path d="M4 14l-2 4 4-2 4 4 1-5" />
              <path d="M20 14l2 4-4-2-4 4-1-5" />
              <path d="M12 2L9 9h6z" />
            </svg>
            <span className="logo-text">JATAYU ADMIN</span>
          </div>
          <button className="mobile-only icon-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <Package size={18} />
            Products
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <ShoppingCart size={18} />
            Orders
          </NavLink>
          <NavLink to="/admin/customers" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <Users size={18} />
            Customers
          </NavLink>
          <NavLink to="/admin/promos" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <Tag size={18} />
            Promos
          </NavLink>
          <NavLink to="/admin/content" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <Settings size={18} />
            CMS Pages
          </NavLink>
        </nav>

        <div className="admin-sidebar-bottom">
          <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
            <Settings size={18} />
            Settings
          </NavLink>
          <button className="admin-nav-link text-red" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <button className="mobile-only icon-btn" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="admin-header-search">
              <input type="text" placeholder="Search anything..." />
            </div>
          </div>
          <div className="admin-header-actions">
            <div style={{position: 'relative'}}>
              <button className="icon-btn" onClick={() => setIsFeedOpen(!isFeedOpen)}>
                <Bell size={20} />
                {activities.length > 0 && <span className="notification-badge">{activities.length}</span>}
              </button>
              
              {isFeedOpen && (
                <div style={{position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '320px', backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', borderRadius: '8px', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.5)'}}>
                  <div style={{padding: '16px', borderBottom: '1px solid var(--color-border)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    Recent Activity
                    <button className="icon-btn" onClick={() => setIsFeedOpen(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {activities.length > 0 ? activities.map(act => (
                      <div key={act.id} style={{padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '4px'}}>
                        <span style={{fontSize: '0.875rem', color: act.type === 'alert' ? '#ef4444' : 'var(--color-text-primary)'}}>{act.text}</span>
                        <span style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>{act.time}</span>
                      </div>
                    )) : (
                      <div style={{padding: '32px', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.875rem'}}>No recent activity.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="admin-profile">
              <div className="avatar">
                <UserIcon size={20} />
              </div>
              <span>Admin User</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
