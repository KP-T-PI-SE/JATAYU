import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('jatayu_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('jatayu_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('jatayu_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jatayu_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (product, size = 'M', color = null, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => 
        (item.id === product.id || item.id === product._id) && 
        item.size === size && 
        item.color === color
      );
      
      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { ...product, id: product._id || product.id, size, color, quantity }];
      }
    });
    showToast(`Added ${product.name} to bag`);
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.size === size && item.color === color)));
    showToast('Removed item from bag', 'info');
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    
    setCart(prevCart => prevCart.map(item => 
      (item.id === productId && item.size === size && item.color === color) ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        showToast(`Added ${product.name} to wishlist`);
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <AppContext.Provider value={{
      cart,
      wishlist,
      toast,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isInWishlist,
      getCartTotal,
      showToast,
      hideToast
    }}>
      {children}
    </AppContext.Provider>
  );
};
