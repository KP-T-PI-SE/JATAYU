import React, { createContext, useState, useEffect, useContext } from 'react';
import { AdminContext } from './AdminContext';

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const { customers, addCustomer } = useContext(AdminContext);
  
  const [currentCustomer, setCurrentCustomer] = useState(() => {
    const saved = localStorage.getItem('jatayu_customer_session_v1');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentCustomer) {
      localStorage.setItem('jatayu_customer_session_v1', JSON.stringify(currentCustomer));
    } else {
      localStorage.removeItem('jatayu_customer_session_v1');
    }
  }, [currentCustomer]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.requiresOtp) {
          return { success: true, requiresOtp: true, email };
        }
        setCurrentCustomer(data);
        return { success: true };
      } else {
        if (data.requiresOtp) {
           return { success: false, requiresOtp: true, email, error: data.message };
        }
        return { success: false, error: data.message };
      }
    } catch (e) {
      return { success: false, error: 'Server error' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        if (data.requiresOtp) {
          return { success: true, requiresOtp: true, email };
        }
        setCurrentCustomer(data);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (e) {
      return { success: false, error: 'Server error' };
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const res = await fetch(`${API_URL}/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentCustomer(data);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (e) {
      return { success: false, error: 'Server error' };
    }
  };

  const logout = () => {
    setCurrentCustomer(null);
  };

  return (
    <CustomerContext.Provider value={{
      currentCustomer,
      login,
      register,
      verifyOtp,
      logout
    }}>
      {children}
    </CustomerContext.Provider>
  );
};
