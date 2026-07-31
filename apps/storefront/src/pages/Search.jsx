import { useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { AdminContext } from '../context/AdminContext';
import { Search as SearchIcon, Lightbulb, Star, Clock, ShieldCheck } from 'lucide-react';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { products } = useContext(AdminContext);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categoryCounts = products.reduce((acc, product) => {
    if (product.category) acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  const availableSizes = [...new Set(products.flatMap(p => p.sizes || []))].filter(Boolean);
  const availableColors = [...new Set(products.flatMap(p => p.colors || []))].filter(Boolean);

  return (
    <div className="search-page">
      <div className="search-header dark-section">
        <div className="container">
          <div className="search-header-content">
            <div className="search-title-area">
              <h1 className="page-title">SEARCH</h1>
              <p className="page-subtitle">Find what defines you.</p>
            </div>
            <div className="search-input-area">
              <div className="search-input-wrapper">
                <span className="search-icon-inline"><SearchIcon size={20} /></span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-large"
                />
                <button className="clear-search">×</button>
              </div>
              <div className="search-suggestions">
                <span>SUGGESTIONS:</span>
                <button className="suggestion-chip active">black hoodie</button>
                <button className="suggestion-chip">oversized hoodie</button>
                <button className="suggestion-chip">zip hoodie</button>
                <button className="suggestion-chip">black sweatshirt</button>
                <button className="suggestion-chip">hoodie men</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container search-main">
        <aside className="sidebar">
          <div className="filter-group">
            <h4>CATEGORIES</h4>
            <ul>
              <li className="active">All Categories <span>({products.length})</span></li>
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <li key={cat}>{cat} <span>({count})</span></li>
              ))}
            </ul>
          </div>


          {availableSizes.length > 0 && (
            <div className="filter-group">
              <h4>SIZE</h4>
              <div className="size-grid">
                {availableSizes.map(size => (
                  <button key={size} className="size-btn">{size}</button>
                ))}
              </div>
            </div>
          )}

          {availableColors.length > 0 && (
            <div className="filter-group">
              <h4>COLOR</h4>
              <div className="color-grid">
                {availableColors.map(color => (
                  <button key={color} className="color-btn" style={{backgroundColor: color}} title={color}></button>
                ))}
              </div>
            </div>
          )}

          <div className="filter-group">
            <h4>FIT</h4>
            <label className="checkbox-label">
              <input type="checkbox" /> Oversized
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Regular
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Relaxed
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Slim
            </label>
          </div>
        </aside>

        <main className="results-area">
          <div className="results-header">
            <span>{filteredProducts.length} RESULTS FOR "{searchQuery.toUpperCase() || 'ALL'}"</span>
            <div className="results-actions">
              <div className="view-toggle">
                <span>VIEW</span>
                <button className="view-btn active">▦</button>
                <button className="view-btn">☰</button>
              </div>
              <select className="sort-select">
                <option>SORT BY: RELEVANCE</option>
                <option>PRICE: LOW TO HIGH</option>
                <option>PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>

          <div className="product-grid search-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <span>...</span>
            <button className="page-btn">6</button>
            <button className="page-btn">&gt;</button>
          </div>
        </main>
      </div>

      <div className="help-banner">
        <div className="container help-container">
          <div className="help-chat">
            <h4>STILL CAN'T FIND<br/>WHAT YOU'RE LOOKING FOR?</h4>
            <p>Our stylists are here to help you.</p>
            <button className="btn-text">CHAT WITH STYLIST &rarr;</button>
          </div>
          <div className="help-features">
            <div className="help-feature">
              <span><Lightbulb size={24} /></span>
              <p>PERSONALIZED<br/>RECOMMENDATIONS</p>
            </div>
            <div className="help-feature">
              <span><Star size={24} /></span>
              <p>EXCLUSIVE<br/>STYLIST PICKS</p>
            </div>
            <div className="help-feature">
              <span><Clock size={24} /></span>
              <p>FAST<br/>RESPONSE</p>
            </div>
            <div className="help-feature">
              <span><ShieldCheck size={24} /></span>
              <p>100% SECURE<br/>PRIVACY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
