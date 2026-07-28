import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { ContentContext } from '../context/ContentContext';
import { AdminContext } from '../context/AdminContext';
import './Women.css';

const Women = () => {
  const { content } = useContext(ContentContext);
  const { products } = useContext(AdminContext);

  const womenProducts = products.filter(p => p.category === 'Women');

  return (
    <div className="women-page">
      <div className="women-hero dark-section">
        <div className="hero-bg">
          <img src={content.women?.bannerImage || "/raven_hoodie_back_1785054706044.png"} alt="Women's Collection Banner" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="women-hero-text">
            <h1 className="page-title">{content.women?.title || "WOMEN'S COLLECTION"}</h1>
            <p className="page-subtitle" style={{whiteSpace: 'pre-line'}}>{content.women?.subtitle || "Redefining streetwear with bold silhouettes and uncompromised comfort."}</p>
          </div>
        </div>
      </div>

      <div className="container women-main">
        <div className="results-header">
          <span>{womenProducts.length} ITEMS</span>
          <div className="results-actions">
            <select className="sort-select">
              <option>SORT BY: RECOMMENDED</option>
              <option>LATEST ARRIVALS</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        <div className="product-grid women-grid">
          {womenProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;
