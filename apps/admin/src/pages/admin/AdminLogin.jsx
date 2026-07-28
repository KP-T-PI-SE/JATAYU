import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';
import './Admin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid master password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: '#111',
        borderRadius: '16px',
        border: '1px solid #333',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: '#fff'}}>
              <path d="M4 14l-2 4 4-2 4 4 1-5" />
              <path d="M20 14l2 4-4-2-4 4-1-5" />
              <path d="M12 2L9 9h6z" />
            </svg>
          </div>
          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 8px', letterSpacing: '2px'}}>JATAYU ADMIN</h1>
          <p style={{color: '#888', margin: 0, fontSize: '0.875rem'}}>Enter your master password to access the dashboard.</p>
        </div>

        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', 
            color: '#ef4444', fontSize: '0.875rem', marginBottom: '24px'
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <div>
            <div style={{position: 'relative'}}>
              <Lock size={18} style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666'}} />
              <input 
                type="password" 
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Master Password" 
                autoFocus
                style={{
                  width: '100%', padding: '16px 16px 16px 48px', 
                  backgroundColor: '#000', border: '1px solid #333', 
                  borderRadius: '8px', color: 'white', fontSize: '1rem',
                  outline: 'none', transition: 'border-color 0.2s'
                }} 
              />
            </div>
          </div>
          
          <button type="submit" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '16px', backgroundColor: '#fff', color: '#000',
            border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600,
            cursor: 'pointer', transition: 'opacity 0.2s'
          }}>
            Access Dashboard <ArrowRight size={18} />
          </button>
        </form>

        <div style={{textAlign: 'center', marginTop: '32px'}}>
          <a href="/" style={{color: '#666', textDecoration: 'none', fontSize: '0.875rem', borderBottom: '1px solid transparent', transition: 'all 0.2s'}} 
             onMouseOver={e => e.target.style.color = '#fff'} 
             onMouseOut={e => e.target.style.color = '#666'}>
            ← Return to Storefront
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
