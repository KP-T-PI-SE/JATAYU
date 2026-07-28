import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [promos, setPromos] = useState([]);
  
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('jatayu_activities_v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('jatayu_auth_v1') === 'true';
  });
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('jatayu_notifications_v1');
    return saved ? JSON.parse(saved) : { newOrders: true, lowStock: true, returns: false, dailySummary: true };
  });
  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem('jatayu_store_settings_v1');
    return saved ? JSON.parse(saved) : { gstNumber: '' };
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch(`${API_URL}/products`);
        if (prodRes.ok) setProducts(await prodRes.json());

        const ordRes = await fetch(`${API_URL}/orders`);
        if (ordRes.ok) setOrders(await ordRes.json());

        const userRes = await fetch(`${API_URL}/users`);
        if (userRes.ok) {
          const allUsers = await userRes.json();
          setCustomers(allUsers.filter(u => u.role === 'customer'));
        }

        const promoRes = await fetch(`${API_URL}/promos`);
        if (promoRes.ok) setPromos(await promoRes.json());
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('jatayu_activities_v2', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('jatayu_auth_v1', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('jatayu_notifications_v1', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  useEffect(() => {
    localStorage.setItem('jatayu_store_settings_v1', JSON.stringify(storeSettings));
  }, [storeSettings]);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const addActivity = (action, target) => {
    const newActivity = {
      id: Date.now(),
      action,
      target,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };
    setActivities([newActivity, ...activities].slice(0, 50));
  };

  const addPromo = async (promoData) => {
    try {
      const res = await fetch(`${API_URL}/promos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promoData)
      });
      if (res.ok) {
        const newPromo = await res.json();
        setPromos([...promos, newPromo]);
        addActivity('Created promo code', newPromo.code);
        return { success: true };
      }
    } catch (e) { console.error(e); }
    return { success: false };
  };

  const deletePromo = async (code) => {
    const promo = promos.find(p => p.code === code);
    if (promo) {
      try {
        await fetch(`${API_URL}/promos/${promo._id}`, { method: 'DELETE' });
        setPromos(promos.filter(p => p.code !== code));
        addActivity('Deleted promo code', code);
      } catch (e) { console.error(e); }
    }
  };

  const addProduct = async (productData) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        const newProduct = await res.json();
        setProducts([newProduct, ...products]);
        addActivity('Added new product', newProduct.name);
      }
    } catch (e) { console.error(e); }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const updatedProduct = await res.json();
        setProducts(products.map(p => p._id === id ? updatedProduct : p));
        addActivity('Updated product', updatedProduct.name);
      }
    } catch (e) { console.error(e); }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
      addActivity('Deleted product', `ID: ${id}`);
    } catch (e) { console.error(e); }
  };

  const addCustomer = async (customerData) => {
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });
      if (res.ok) {
        const newUser = await res.json();
        setCustomers([newUser, ...customers]);
        return newUser;
      }
    } catch (e) { console.error(e); }
  };

  const addOrder = async (orderData) => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const newOrder = await res.json();
        setOrders([newOrder, ...orders]);
        addActivity('Received new order', newOrder._id);
        return newOrder;
      }
    } catch (e) { console.error(e); }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(orders.map(o => o._id === id ? updatedOrder : o));
        addActivity('Updated order status', `Order ${id} -> ${newStatus}`);
      }
    } catch (e) { console.error(e); }
  };

  const updateNotificationSettings = (settings) => setNotificationSettings(settings);
  const updateStoreSettings = (settings) => setStoreSettings(settings);

  return (
    <AdminContext.Provider value={{
      products, setProducts,
      orders, setOrders,
      customers, setCustomers,
      promos, setPromos,
      activities, setActivities,
      isAuthenticated,
      notificationSettings,
      storeSettings,
      login, logout,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus,
      addPromo, deletePromo,
      addCustomer,
      updateNotificationSettings, updateStoreSettings
    }}>
      {children}
    </AdminContext.Provider>
  );
};
