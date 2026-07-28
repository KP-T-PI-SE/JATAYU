import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Toast from './components/Toast';
import AdminLayout from './layouts/AdminLayout';
import { AdminProvider } from './context/AdminContext';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import PromoCodes from './pages/admin/PromoCodes';
import ContentManager from './pages/admin/ContentManager';
import Settings from './pages/admin/Settings';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* Admin Login */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="promos" element={<PromoCodes />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="settings" element={<Settings />} />
            {/* Fallback for settings or missing pages */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          
          {/* Redirect root to admin login */}
          <Route path="/" element={<Navigate to="/admin-login" replace />} />
        </Routes>
        <Toast />
      </Router>
    </AdminProvider>
  );
}

export default App;
