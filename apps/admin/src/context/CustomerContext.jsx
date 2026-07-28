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

  const login = (email, password) => {
    // For demo purposes, we are just checking email. Real app needs password hash check.
    const customer = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (customer) {
      setCurrentCustomer(customer);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const register = (name, email, password) => {
    const existing = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'Email already exists' };
    }

    const newCustomer = addCustomer({
      name,
      email,
      phone: '',
      status: 'Active'
    });

    setCurrentCustomer(newCustomer);
    return { success: true };
  };

  const logout = () => {
    setCurrentCustomer(null);
  };

  return (
    <CustomerContext.Provider value={{
      currentCustomer,
      login,
      register,
      logout
    }}>
      {children}
    </CustomerContext.Provider>
  );
};
