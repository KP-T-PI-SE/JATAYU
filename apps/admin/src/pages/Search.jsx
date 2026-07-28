import { useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { AdminContext } from '../context/AdminContext';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { products } = useContext(AdminContext);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <span className="search-icon-inline">🔍</span>
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
              <li>All Categories</li>
              <li className="active"><span className="dot"></span> Hoodies & Sweatshirts <span>(56)</span></li>
              <li>T-Shirts <span>(12)</span></li>
              <li>Jackets <span>(8)</span></li>
              <li>Tracksuits <span>(4)</span></li>
              <li>Accessories <span>(3)</span></li>
            </ul>
          </div>

          <div className="filter-group">
            <h4>GENDER</h4>
            <label className="checkbox-label">
              <input type="checkbox" checked readOnly /> Men
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Women
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Unisex
            </label>
          </div>

          <div className="filter-group">
            <h4>SIZE</h4>
            <div className="size-grid">
              <button className="size-btn">XS</button>
              <button className="size-btn">S</button>
              <button className="size-btn">M</button>
              <button className="size-btn">L</button>
              <button className="size-btn">XL</button>
              <button className="size-btn">XXL</button>
            </div>
          </div>

          <div className="filter-group">
            <h4>COLOR</h4>
            <div className="color-grid">
              <button className="color-btn active" style={{backgroundColor: '#1a1a1a'}}></button>
              <button className="color-btn" style={{backgroundColor: '#5c5c5c'}}></button>
              <button className="color-btn" style={{backgroundColor: '#636b53'}}></button>
              <button className="color-btn" style={{backgroundColor: '#d1b894'}}></button>
              <button className="color-btn add-btn">+</button>
            </div>
          </div>

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
              <span>💡</span>
              <p>PERSONALIZED<br/>RECOMMENDATIONS</p>
            </div>
            <div className="help-feature">
              <span>⭐</span>
              <p>EXCLUSIVE<br/>STYLIST PICKS</p>
            </div>
            <div className="help-feature">
              <span>⏱️</span>
              <p>FAST<br/>RESPONSE</p>
            </div>
            <div className="help-feature">
              <span>🛡️</span>
              <p>100% SECURE<br/>PRIVACY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
