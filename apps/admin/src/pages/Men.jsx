import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { ContentContext } from '../context/ContentContext';
import { AdminContext } from '../context/AdminContext';
import './Men.css';

const Men = () => {
  const { content } = useContext(ContentContext);
  const { products } = useContext(AdminContext);

  const menProducts = products.filter(p => p.category === 'Men');

  return (
    <div className="men-page">
      <div className="men-hero dark-section">
        <div className="hero-bg">
          <img src={content.men?.bannerImage || "/signature_zip_hoodie_1785054724510.png"} alt="Men's Collection Banner" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="men-hero-text">
            <h1 className="page-title">{content.men?.title || "MEN'S COLLECTION"}</h1>
            <p className="page-subtitle" style={{whiteSpace: 'pre-line'}}>{content.men?.subtitle || "Premium essentials and statement pieces. Designed for everyday resilience."}</p>
          </div>
        </div>
      </div>

      <div className="container men-main">
        <div className="results-header">
          <span>{menProducts.length} ITEMS</span>
          <div className="results-actions">
            <select className="sort-select">
              <option>SORT BY: RECOMMENDED</option>
              <option>LATEST ARRIVALS</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        <div className="product-grid men-grid">
          {menProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Men;
