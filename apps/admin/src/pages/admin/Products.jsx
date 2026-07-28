import React, { useContext, useState } from 'react';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import { AdminContext } from '../../context/AdminContext';

const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', costPrice: '', price: '', discount: 0, image: '', images: [], category: 'Men', stock: 0, description: '', colors: '', sizes: '', badges: '', materials: '', isNewArrival: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Derived values for calculators
  const cost = Number(formData.costPrice) || 0;
  const sellPrice = Number(formData.price) || 0;
  const discountPct = Number(formData.discount) || 0;
  const discountAmount = (sellPrice * discountPct) / 100;
  const finalPrice = sellPrice - discountAmount;
  const profit = finalPrice - cost;
  const profitMargin = finalPrice > 0 ? ((profit / finalPrice) * 100).toFixed(1) : 0;

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', costPrice: '', price: '', discount: 0, image: '', images: [], category: 'Men', stock: 0, description: '', colors: '', sizes: '', badges: '', materials: '', isNewArrival: false });
    setImageFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id || product._id);
    setFormData({ 
      name: product.name, 
      costPrice: product.costPrice || '', 
      price: product.price, 
      discount: product.discount || 0,
      image: product.image, 
      images: product.images || [],
      category: product.category, 
      stock: product.stock,
      description: product.description || '',
      colors: product.colors ? product.colors.join(', ') : '',
      sizes: product.sizes ? product.sizes.join(', ') : '',
      badges: product.badges ? product.badges.join(', ') : '',
      materials: product.materials ? product.materials.join('\n') : '',
      isNewArrival: product.isNewArrival || false
    });
    setImageFile(null);
    setImagePreview(product.images?.[0]?.url || product.image || '');
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let uploadedImageUrl = formData.image;
    let uploadedImages = formData.images || [];

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: uploadData,
        });
        if (response.ok) {
          const result = await response.json();
          uploadedImages = [result];
          uploadedImageUrl = result.url;
          
          if (editingId && formData.images?.[0]?.publicId) {
            fetch(`${API_URL}/upload`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ publicId: formData.images[0].publicId })
            }).catch(console.error);
          }
        } else {
          alert('Image upload failed');
          setIsUploading(false);
          return;
        }
      } catch (error) {
        console.error('Upload error', error);
        alert('Upload error');
        setIsUploading(false);
        return;
      }
    }

    const productData = { 
      ...formData, 
      image: uploadedImageUrl,
      images: uploadedImages,
      costPrice: Number(formData.costPrice),
      price: Number(formData.price), 
      discount: Number(formData.discount),
      stock: Number(formData.stock),
      description: formData.description,
      colors: formData.colors ? formData.colors.split(',').map(c => c.trim()).filter(c => c) : [],
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()).filter(s => s) : [],
      badges: formData.badges ? formData.badges.split(',').map(b => b.trim()).filter(b => b) : [],
      materials: formData.materials ? formData.materials.split('\n').map(m => m.trim()).filter(m => m) : [],
      isNewArrival: formData.isNewArrival
    };

    if (editingId) {
      await updateProduct(editingId, productData);
    } else {
      await addProduct(productData);
    }
    setIsUploading(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Products Management</h1>
        <div className="admin-page-actions">
          <button className="btn-primary" onClick={openAddModal} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Plus size={16} /> Add New Product
          </button>
        </div>
      </div>

      <div className="admin-stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <h3 className="stat-title">Total Inventory Value</h3>
          <div className="stat-value" style={{color: '#10b981'}}>
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
          <h3 className="stat-title">Total Units</h3>
          <div className="stat-value">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Products</h3>
          <div className="stat-value">{products.length}</div>
        </div>
      </div>
      <div className="admin-page-header" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Inventory Breakdown</h2>
      </div>

      <div className="admin-stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <h3 className="stat-title">Men's Products</h3>
          <div className="stat-value">{products.filter(p => p.category === 'Men').length}</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Women's Products</h3>
          <div className="stat-value">{products.filter(p => p.category === 'Women').length}</div>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">New Arrivals</h3>
          <div className="stat-value">{products.filter(p => p.badges && p.badges.includes('NEW')).length}</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Inventory</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <img src={product.images?.[0]?.url || product.image || 'https://via.placeholder.com/40'} alt={product.name} className="product-cell-img" />
                      <div className="product-cell-info">
                        <span className="product-cell-name">{product.name}</span>
                        <span className="product-cell-id">ID: {product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {product.discount > 0 ? (
                      <div>
                        <div style={{fontWeight: 600, color: '#10b981'}}>
                          ₹{(product.price - (product.price * product.discount) / 100).toLocaleString()}
                        </div>
                        <div style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)', textDecoration: 'line-through'}}>
                          ₹{product.price.toLocaleString()}
                        </div>
                      </div>
                    ) : (
                      <div style={{fontWeight: 500}}>₹{product.price.toLocaleString()}</div>
                    )}
                  </td>
                  <td>{product.category}</td>
                  <td>{product.stock} in stock</td>
                  <td>
                    <span className={`status-badge ${product.stock > 0 ? 'status-delivered' : 'status-cancelled'}`}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="Edit" onClick={() => openEditModal(product)}><Edit size={16} /></button>
                      <button className="icon-btn text-red" title="Delete" onClick={() => deleteProduct(product.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div style={{backgroundColor: 'var(--color-bg-primary)', padding: '32px', borderRadius: '8px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--color-border)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2 style={{margin: 0, fontSize: '1.25rem'}}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer'}}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              {/* Product Image */}
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Product Image</label>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" style={{width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-border)'}} />
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{color: 'var(--color-text-secondary)'}} />
                </div>
              </div>

              {/* Product Info */}
              <div style={{display: 'flex', gap: '16px'}}>
                <div style={{flex: 2}}>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Product Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Collection">Collection</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Calculator */}
              <div style={{padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: '4px'}}>
                <h3 style={{fontSize: '1rem', marginBottom: '16px', color: 'var(--color-text-primary)'}}>Pricing & Profit Calculator</h3>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Cost Price (₹)</label>
                    <input required type="number" value={formData.costPrice} onChange={e => setFormData({...formData, costPrice: e.target.value})} placeholder="Cost to make" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Selling Price (₹)</label>
                    <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="Base Price" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Discount (%)</label>
                    <input type="number" min="0" max="100" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} placeholder="0" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                  </div>
                </div>

                {/* Calculator Results */}
                <div style={{display: 'flex', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)'}}>
                  <div style={{flex: 1}}>
                    <span style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>Final Customer Price</span>
                    <div style={{fontSize: '1.125rem', fontWeight: 600}}>₹{finalPrice.toLocaleString()}</div>
                  </div>
                  <div style={{flex: 1}}>
                    <span style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>Profit Per Item</span>
                    <div style={{fontSize: '1.125rem', fontWeight: 600, color: profit > 0 ? '#10b981' : '#ef4444'}}>₹{profit.toLocaleString()}</div>
                  </div>
                  <div style={{flex: 1}}>
                    <span style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>Profit Margin</span>
                    <div style={{fontSize: '1.125rem', fontWeight: 600}}>{profitMargin}%</div>
                  </div>
                </div>
              </div>

              <div style={{display: 'flex', gap: '16px'}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Initial Stock</label>
                  <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
                </div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', paddingTop: '24px'}}>
                  <label style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', cursor: 'pointer'}}>
                    <input type="checkbox" checked={formData.isNewArrival} onChange={e => setFormData({...formData, isNewArrival: e.target.checked})} style={{width: '20px', height: '20px'}} />
                    Mark as New Arrival
                  </label>
                </div>
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Product Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Enter product details..." style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white', minHeight: '100px', resize: 'vertical'}} />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Color Variants (comma separated)</label>
                <input type="text" value={formData.colors} onChange={e => setFormData({...formData, colors: e.target.value})} placeholder="e.g. Black, White, Crimson" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Sizes (comma separated)</label>
                <input type="text" value={formData.sizes} onChange={e => setFormData({...formData, sizes: e.target.value})} placeholder="e.g. S, M, L, XL" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Badges (comma separated)</label>
                <input type="text" value={formData.badges} onChange={e => setFormData({...formData, badges: e.target.value})} placeholder="e.g. 👕 Oversized Fit, ⭐ Premium" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white'}} />
              </div>

              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>Material & Care (one per line)</label>
                <textarea value={formData.materials} onChange={e => setFormData({...formData, materials: e.target.value})} placeholder="100% Cotton&#10;Machine Wash Cold" style={{width: '100%', padding: '12px', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'white', minHeight: '80px', resize: 'vertical'}} />
              </div>
              
              <button type="submit" disabled={isUploading} className="btn-primary" style={{marginTop: '8px', padding: '12px'}}>{isUploading ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Product')}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
