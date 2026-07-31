import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { ContentContext } from '../context/ContentContext';
import { AdminContext } from '../context/AdminContext';
import './Shop.css';

const Shop = () => {
  const { content } = useContext(ContentContext);
  const { products } = useContext(AdminContext);

  // We are not filtering by category for the main shop page
  const shopProducts = products;

  return (
    <div className="shop-page">
      <div className="shop-hero dark-section">
        <div className="hero-bg">
          <img src={content.shop?.bannerImage || "/signature_zip_hoodie_1785054724510.png"} alt="Shop Collection Banner" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="shop-hero-text">
            <h1 className="page-title">{content.shop?.title || "SHOP COLLECTION"}</h1>
            <p className="page-subtitle" style={{whiteSpace: 'pre-line'}}>{content.shop?.subtitle || "Premium essentials and statement pieces. Designed for everyday resilience."}</p>
          </div>
        </div>
      </div>

      <div className="container shop-main">
        <div className="results-header">
          <span>{shopProducts.length} ITEMS</span>
          <div className="results-actions">
            <select className="sort-select">
              <option>SORT BY: RECOMMENDED</option>
              <option>LATEST ARRIVALS</option>
              <option>PRICE: LOW TO HIGH</option>
              <option>PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        <div className="product-grid shop-grid">
          {shopProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
