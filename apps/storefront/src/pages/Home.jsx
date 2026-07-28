import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ContentContext } from '../context/ContentContext';
import { AdminContext } from '../context/AdminContext';
import './Home.css';

const Home = () => {
  const { content } = useContext(ContentContext);
  const { products } = useContext(AdminContext);
  
  // Get latest products marked as New Arrival (max 4)
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero dark-section">
        <div className="hero-bg">
          <img src={content.home.heroImage || "/raven_hoodie_back_1785054706044.png"} alt="JATAYU Hero" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <span className="hero-eyebrow">MONSOON '25</span>
          <h1 className="hero-title" style={{whiteSpace: 'pre-line'}}>{content.home.heroTitle}</h1>
          <p className="hero-desc" style={{whiteSpace: 'pre-line'}}>{content.home.heroSubtitle}</p>
          <div className="hero-actions">
            <Link to="/collections" className="btn-primary" style={{backgroundColor: '#f5f4ef', color: '#121212'}}>{content.home.heroButton}</Link>
            <Link to="/search" className="btn-outline">VIEW ALL</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="home-categories">
        <div className="container">
          <h2 className="section-title text-center">EXPLORE CATEGORIES</h2>
          <div className="category-grid">
            <Link to="/search" className="category-card">
              <img src={content.home.cat1Image || "/signature_zip_hoodie_1785054724510.png"} alt="Hoodies" />
              <div className="category-overlay">
                <h3>HOODIES & SWEATSHIRTS</h3>
                <span>SHOP NOW &rarr;</span>
              </div>
            </Link>
            <Link to="/search" className="category-card">
              <img src={content.home.cat2Image || "/raven_hoodie_back_1785054706044.png"} alt="Tees" />
              <div className="category-overlay">
                <h3>GRAPHIC TEES</h3>
                <span>SHOP NOW &rarr;</span>
              </div>
            </Link>
            <Link to="/search" className="category-card">
              <img src={content.home.cat3Image || "/signature_zip_hoodie_1785054724510.png"} alt="Bottoms" />
              <div className="category-overlay">
                <h3>CARGOS & PANTS</h3>
                <span>SHOP NOW &rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="home-arrivals">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{margin: 0}}>NEW ARRIVALS</h2>
            <Link to="/search" className="btn-text">VIEW ALL &rarr;</Link>
          </div>
          <div className="product-grid" style={{gridTemplateColumns: 'repeat(4, 1fr)'}}>
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="home-brand-banner dark-section">
        <div className="container brand-banner-container">
          <div className="brand-banner-content">
            <span className="section-eyebrow">THE BRAND</span>
            <h2>ROOTED IN LEGEND.<br/>CRAFTED FOR TODAY.</h2>
            <p>We draw inspiration from the myth of Jatayu to create premium streetwear that stands for courage, freedom, and resilience.</p>
            <Link to="/about" className="btn-outline">OUR STORY &rarr;</Link>
          </div>
          <div className="brand-banner-image">
            <img src={content.home.brandImage || "/raven_hoodie_back_1785054706044.png"} alt="Brand Story" style={{filter: 'sepia(0.3) brightness(0.8)'}} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
