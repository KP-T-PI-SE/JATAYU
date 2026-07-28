import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { ContentContext } from '../context/ContentContext';
import { AdminContext } from '../context/AdminContext';
import './New.css';

const New = () => {
  const { content } = useContext(ContentContext);
  const { products } = useContext(AdminContext);

  const newProducts = products.filter(p => p.badges && p.badges.includes('NEW'));

  return (
    <div className="new-page">
      <div className="new-hero dark-section">
        <div className="hero-bg">
          <img src={content.newArrivals?.bannerImage || "/raven_hoodie_back_1785054706044.png"} alt="New Arrivals Banner" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="new-hero-text">
            <h1 className="page-title">{content.newArrivals?.title || "NEW ARRIVALS"}</h1>
            <p className="page-subtitle" style={{whiteSpace: 'pre-line'}}>{content.newArrivals?.subtitle || "The latest additions to the Jatayu collection. Built for the modern environment."}</p>
          </div>
        </div>
      </div>

      <div className="container new-main">
        <div className="results-header">
          <span>{newProducts.length} NEW ITEMS</span>
          <div className="results-actions">
            <select className="sort-select">
              <option>SORT BY: LATEST</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        <div className="product-grid new-grid">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default New;
