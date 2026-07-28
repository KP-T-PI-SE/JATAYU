import React, { useContext, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { User, Activity, AlertCircle, ShoppingBag, ArrowLeftRight } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const Dashboard = () => {
  const { orders, customers, products, activities } = useContext(AdminContext);

  // KPIs
  const totalRevenue = orders.filter(o => o.status !== 'Cancelled' && o.status !== 'Returned').reduce((sum, o) => sum + o.total, 0);
  const totalRefunded = orders.filter(o => o.status === 'Cancelled' || o.status === 'Returned').reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const totalCustomersCount = customers.length;
  
  // Recent Orders (limit 5)
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  // Revenue Data (Actual aggregation from orders)
  const revenueData = useMemo(() => {
    // Group orders by date
    const dailyTotals = {};
    orders.forEach(o => {
      if (o.status !== 'Cancelled' && o.status !== 'Returned') {
        // Format to simple mm/dd or just use the date string
        const dateStr = new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dailyTotals[dateStr] = (dailyTotals[dateStr] || 0) + o.total;
      }
    });
    
    // Sort by date (assuming keys can be parsed back, or just rely on order dates)
    const sortedDates = Object.keys(dailyTotals).sort((a, b) => new Date(a) - new Date(b));
    
    // Take the last 7 days
    const last7Days = sortedDates.slice(-7);
    
    return last7Days.map(date => ({
      name: date,
      revenue: dailyTotals[date]
    }));
  }, [orders]);

  // Category Data
  const categoryData = useMemo(() => {
    const cats = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(cats).map(key => ({ name: key, value: cats[key] }));
  }, [products]);

  const COLORS = ['#ffffff', '#a1a1aa', '#52525b', '#27272a'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '12px',
          border: '1px solid var(--color-border)',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{label}</p>
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
            ₹{Math.round(payload[0].value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleDownloadReport = () => {
    // Generate simple CSV of all orders
    let csvContent = "Order ID,Customer,Date,Total,Status,Items\n";
    
    orders.forEach(order => {
      const row = [
        order.id,
        `"${order.customer}"`, // Wrap in quotes to handle commas in names
        order.date,
        order.total,
        order.status,
        order.items || 1
      ].join(",");
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `jatayu_orders_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Dashboard Overview</h1>
        <div className="admin-page-actions">
          <button className="btn-outline" onClick={handleDownloadReport}>Download Report</button>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <h3 className="stat-title">Total Revenue</h3>
          <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
          <div className="stat-change positive">Live data</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Active Orders</h3>
          <div className="stat-value">{activeOrders}</div>
          <div className="stat-change positive">Live data</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Refunded / Deducted</h3>
          <div className="stat-value" style={{color: '#ef4444'}}>₹{totalRefunded.toLocaleString()}</div>
          <div className="stat-change negative">Returned/Cancelled</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Customers</h3>
          <div className="stat-value">{totalCustomersCount}</div>
          <div className="stat-change positive">Live data</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Products</h3>
          <div className="stat-value">{products.length}</div>
          <div className="stat-change positive">Live data</div>
        </div>
      </div>

      <div className="admin-page-header" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Inventory Valuation</h2>
      </div>
      
      <div className="admin-stats-grid">
        <div className="stat-card">
          <h3 className="stat-title">Total Inventory Value</h3>
          <div className="stat-value">
            ₹{products.reduce((sum, p) => sum + ((p.price - (p.price * (p.discount || 0) / 100)) * p.stock), 0).toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Avg. Selling Price</h3>
          <div className="stat-value">
            ₹{products.length > 0 ? Math.round(products.reduce((sum, p) => sum + (p.price - (p.price * (p.discount || 0) / 100)), 0) / products.length).toLocaleString() : 0}
          </div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Units in Stock</h3>
          <div className="stat-value">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
        </div>
      </div>

      <div className="admin-page-header" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Inventory Breakdown (Items)</h2>
      </div>

      {/* Product Inventory Breakdown */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <h3 className="stat-title">Men's Products</h3>
          <div className="stat-value">{products.filter(p => p.category === 'Men').length}</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Women's Products</h3>
          <div className="stat-value">{products.filter(p => p.category === 'Women').length}</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Collection Products</h3>
          <div className="stat-value">{products.filter(p => p.category === 'Collection').length}</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">New Arrivals</h3>
          <div className="stat-value">{products.filter(p => p.badges && p.badges.includes('NEW')).length}</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="admin-charts-grid">
        {/* Revenue Area Chart */}
        <div className="admin-card chart-card revenue-chart">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Revenue (Last 7 Days)</h2>
          </div>
          <div className="chart-container" style={{ height: '300px', padding: '24px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} dx={-10} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Donut Chart */}
        <div className="admin-card chart-card category-chart">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Sales by Category</h2>
          </div>
          <div className="chart-container" style={{ height: '300px', padding: '24px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                  formatter={(value) => [value, 'Items']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--color-text-secondary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {products.filter(p => p.stock < 5).length > 0 && (
        <div className="admin-card" style={{ marginBottom: '24px', border: '1px solid #ef4444' }}>
          <div className="admin-card-header" style={{ borderBottomColor: 'rgba(239, 68, 68, 0.2)' }}>
            <h2 className="admin-card-title" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚠️ Low Stock Alerts
            </h2>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => p.stock < 5).map(product => (
                  <tr key={product.id}>
                    <td style={{ fontWeight: 500 }}>{product.name}</td>
                    <td>{product.category}</td>
                    <td style={{ color: '#ef4444', fontWeight: 'bold' }}>{product.stock} left</td>
                    <td>
                      <span className="status-badge status-cancelled">
                        Action Required
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Recent Orders</h2>
          <button className="btn-text">View All</button>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 500 }}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td style={{ color: 'var(--color-text-secondary)' }}>{order.date}</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="admin-charts-grid" style={{ marginTop: '24px' }}>
        {/* Recent Activity Feed */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} /> Recent System Activity
            </h2>
          </div>
          <div style={{ padding: '0 24px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activities.slice(0, 5).map(act => (
                <div key={act.id} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '8px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    backgroundColor: act.type === 'alert' ? 'rgba(239, 68, 68, 0.1)' : 
                                     act.type === 'order' ? 'rgba(16, 185, 129, 0.1)' : 
                                     'rgba(245, 158, 11, 0.1)',
                    color: act.type === 'alert' ? '#ef4444' : 
                           act.type === 'order' ? '#10b981' : 
                           '#f59e0b'
                  }}>
                    {act.type === 'alert' ? <AlertCircle size={20} /> : 
                     act.type === 'order' ? <ShoppingBag size={20} /> : 
                     <ArrowLeftRight size={20} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 4px', fontSize: '0.875rem', lineHeight: '1.4' }}>{act.text}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{act.time}</span>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>No recent activity to display.</p>
              )}
            </div>
          </div>
        </div>

        {/* Newest Customers Tracker */}
        <div className="admin-card" style={{ margin: 0 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} /> Newest Customers
            </h2>
            <button className="btn-text" onClick={() => window.location.href = '/admin/customers'}>View All</button>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                </tr>
              </thead>
              <tbody>
                {customers.slice(-5).reverse().map(customer => (
                  <tr key={customer.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.75rem' }}>
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{customer.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{customer.orders}</td>
                    <td style={{ fontWeight: 500 }}>₹{customer.totalSpent.toLocaleString()}</td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '24px' }}>
                      No customers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
