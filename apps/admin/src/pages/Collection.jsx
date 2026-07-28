import { Link } from 'react-router-dom';
import './Collection.css';

const Collection = () => {
  return (
    <div className="collection-page dark-section">
      <div className="collection-hero">
        <div className="hero-bg">
          <img src="/raven_hoodie_back_1785054706044.png" alt="Monsoon '25 Hero" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container hero-content">
          <div className="breadcrumbs">
            <span>HOME</span> &gt; <span>COLLECTIONS</span> &gt; <span className="current">MONSOON '25</span>
          </div>
          
          <div className="hero-text-area">
            <p className="hero-tag">NEW COLLECTION</p>
            <h1 className="hero-title">MONSOON '25</h1>
            <p className="hero-subtitle">BUILT FOR THE STORM. MADE TO ENDURE.</p>
            <p className="hero-desc">
              A collection inspired by the raw power of nature.<br/>
              Earthy tones, weathered textures and silhouettes<br/>
              that move with you.
            </p>
            
            <div className="hero-actions">
              <Link to="/search" className="btn-primary" style={{backgroundColor: '#f5f4ef', color: '#121212'}}>SHOP COLLECTION &rarr;</Link>
              <button className="btn-text" style={{borderBottom: 'none'}}>WATCH CAMPAIGN <span style={{fontSize:'1.2rem', marginLeft:'4px'}}>▷</span></button>
            </div>
          </div>
          
          <div className="hero-nav">
            <div className="nav-line"></div>
            <ul>
              <li className="active"><span>01</span> STORY</li>
              <li><span>02</span> COLLECTION</li>
              <li><span>03</span> LOOKBOOK</li>
              <li><span>04</span> DETAILS</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="collection-section story-section">
        <div className="container section-grid">
          <div className="section-header">
            <div className="section-number">01 <span className="line"></span> THE STORY</div>
            <h2 className="section-title-large">NATURE<br/>UNLEASHED</h2>
            <p className="section-desc">
              Monsoon '25 draws from the untamed—rock,<br/>
              rain, wind and earth. Each piece is a tribute to<br/>
              resilience, crafted for the modern nomad.
            </p>
            <button className="btn-text">EXPLORE STORY &rarr;</button>
          </div>
          <div className="story-images">
            <img src="/signature_zip_hoodie_1785054724510.png" alt="Rock" className="story-img" />
            <img src="/raven_hoodie_back_1785054706044.png" alt="Rain" className="story-img" />
            <img src="/signature_zip_hoodie_1785054724510.png" alt="Model" className="story-img" />
          </div>
        </div>
      </div>

      <div className="collection-section categories-section">
        <div className="container section-grid">
          <div className="section-header">
            <div className="section-number">02 <span className="line"></span> THE COLLECTION</div>
            <h2 className="section-title-large">EXPLORE THE<br/>DROP</h2>
            <p className="section-desc">
              Functional silhouettes. Elevated essentials.<br/>
              Designed to transition through every<br/>
              season and every story.
            </p>
            <Link to="/search" className="btn-text">VIEW ALL PRODUCTS &rarr;</Link>
          </div>
          <div className="category-grid">
            <div className="category-card">
              <img src="/signature_zip_hoodie_1785054724510.png" alt="Shirts" />
              <div className="category-info">
                <h3>SHIRTS <span className="arrow">&rarr;</span></h3>
                <p>24 ITEMS</p>
              </div>
            </div>
            <div className="category-card">
              <img src="/raven_hoodie_back_1785054706044.png" alt="Hoodies" />
              <div className="category-info">
                <h3>HOODIES <span className="arrow">&rarr;</span></h3>
                <p>18 ITEMS</p>
              </div>
            </div>
            <div className="category-card">
              <img src="/signature_zip_hoodie_1785054724510.png" alt="Pants" />
              <div className="category-info">
                <h3>PANTS <span className="arrow">&rarr;</span></h3>
                <p>16 ITEMS</p>
              </div>
            </div>
            <div className="category-card">
              <img src="/raven_hoodie_back_1785054706044.png" alt="Accessories" />
              <div className="category-info">
                <h3>ACCESSORIES <span className="arrow">&rarr;</span></h3>
                <p>14 ITEMS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="collection-section lookbook-section">
        <div className="container">
          <div className="lookbook-header">
            <div className="section-number">03 <span className="line"></span> LOOKBOOK</div>
            <button className="btn-text">VIEW LOOKBOOK &rarr;</button>
          </div>
          
          <div className="lookbook-carousel">
            <div className="lookbook-slide">
              <img src="/raven_hoodie_back_1785054706044.png" alt="Look 1" />
              <span className="slide-num">01 / 06</span>
            </div>
            <div className="lookbook-slide">
              <img src="/signature_zip_hoodie_1785054724510.png" alt="Look 2" />
              <span className="slide-num">02 / 06</span>
            </div>
            <div className="lookbook-slide">
              <img src="/signature_zip_hoodie_1785054724510.png" alt="Look 3" />
              <span className="slide-num">03 / 06</span>
            </div>
            <div className="lookbook-slide">
              <img src="/raven_hoodie_back_1785054706044.png" alt="Look 4" />
              <span className="slide-num">04 / 06</span>
            </div>
            <button className="carousel-next">&gt;</button>
          </div>
        </div>
      </div>

      <div className="features-banner dark-features">
        <div className="container features-container">
          <div className="feature">
            <span className="feature-icon">☁️</span>
            <div>
              <h4>WEATHER READY</h4>
              <p>Engineered for all<br/>conditions.</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🌿</span>
            <div>
              <h4>SUSTAINABLE CHOICES</h4>
              <p>Conscious materials.<br/>Better future.</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">⭐</span>
            <div>
              <h4>PREMIUM QUALITY</h4>
              <p>Crafted with precision.<br/>Built to last.</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">📦</span>
            <div>
              <h4>EASY RETURNS</h4>
              <p>14 days return<br/>& exchange.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
