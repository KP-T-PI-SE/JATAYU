import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './About.css';

const About = () => {
  const { content } = useContext(ContentContext);
  
  return (
    <div className="about-page">
      <div className="about-hero dark-section">
        <div className="container about-hero-container">
          <div className="about-hero-content">
            <span className="hero-eyebrow">ABOUT JATAYU ───</span>
            <h1 className="about-title" style={{whiteSpace: 'pre-line'}}>{content.about?.heroTitle || "BUILT TO RISE.\nMADE TO LAST."}</h1>
            <p className="about-desc" style={{whiteSpace: 'pre-line'}}>{content.about?.heroDesc || "JATAYU is more than clothing. It's a mindset.\nInspired by strength, freedom and purpose,\nwe create pieces that move with you —\nfrom everyday moments to defining journeys."}</p>
            <Link to="/collections" className="btn-outline">EXPLORE COLLECTIONS &rarr;</Link>
          </div>
          <div className="about-hero-image">
            <img src={content.about?.heroImage || "/raven_hoodie_back_1785054706044.png"} alt="Built to rise" />
          </div>
        </div>
      </div>

      <div className="about-story-section">
        <div className="container story-grid">
          <div className="story-content">
            <span className="section-eyebrow">OUR STORY ───</span>
            <h2 className="story-title" style={{whiteSpace: 'pre-line'}}>{content.about?.storyTitle || "ROOTED IN LEGEND.\nMADE FOR TODAY."}</h2>
            <div className="story-text">
              <p style={{whiteSpace: 'pre-line'}}>{content.about?.storyDesc1 || "In Hindu mythology, Jatayu was the mighty warrior who\nstood up for what was right, even in the face of impossible odds.\nWe draw inspiration from his courage and spirit."}</p>
              <p style={{whiteSpace: 'pre-line'}}>{content.about?.storyDesc2 || "JATAYU is our tribute to that legacy —\ncrafted for the modern world."}</p>
            </div>
            <div className="signature">
              <span className="signature-font">Team Jatayu</span>
              <span className="signature-text">TEAM JATAYU</span>
            </div>
          </div>
          <div className="story-image">
            <img src={content.about?.storyImage || "/raven_hoodie_back_1785054706044.png"} alt="Eagle Statue" style={{filter: 'sepia(0.5) brightness(0.8)'}} />
          </div>
        </div>
      </div>

      <div className="about-values-section">
        <div className="container values-grid">
          <div className="value-item">
            <span className="value-icon">💎</span>
            <div>
              <h4>PREMIUM QUALITY</h4>
              <p>We use the finest fabrics<br/>and materials to ensure<br/>comfort, durability and style.</p>
            </div>
          </div>
          <div className="value-item">
            <span className="value-icon">✂️</span>
            <div>
              <h4>TIMELESS DESIGN</h4>
              <p>Minimal. Functional.<br/>Versatile pieces designed<br/>to outlast trends.</p>
            </div>
          </div>
          <div className="value-item">
            <span className="value-icon">🌿</span>
            <div>
              <h4>RESPONSIBLE MADE</h4>
              <p>Ethical production,<br/>conscious packaging and<br/>respect for our planet.</p>
            </div>
          </div>
          <div className="value-item">
            <span className="value-icon">👥</span>
            <div>
              <h4>MADE FOR YOU</h4>
              <p>For the dreamers, the doers<br/>and the ones who choose<br/>to rise every day.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-craft-section dark-section">
        <div className="craft-bg">
          <img src={content.about?.craftImage || "/signature_zip_hoodie_1785054724510.png"} alt="Craftsmanship" />
          <div className="craft-overlay"></div>
        </div>
        <div className="container craft-content">
          <span className="section-eyebrow">CRAFTSMANSHIP ───</span>
          <h2 className="craft-title" style={{whiteSpace: 'pre-line'}}>{content.about?.craftTitle || "DETAILS\nDEFINE US."}</h2>
          <p className="craft-desc" style={{whiteSpace: 'pre-line'}}>{content.about?.craftDesc || "Every stitch, every cut and every finish\nis a reflection of our commitment to\nprecision and perfection.\nWe don't just make clothes.\nWe craft experiences."}</p>
          <button className="btn-outline">OUR MATERIALS &rarr;</button>
        </div>
      </div>

      <div className="about-behind-section">
        <div className="container">
          <div className="behind-header">
            <span className="line"></span>
            <h3>BEHIND THE BRAND</h3>
            <span className="line"></span>
          </div>
          
          <div className="behind-grid">
            <div className="behind-card">
              <img src="/signature_zip_hoodie_1785054724510.png" alt="Design" />
              <div className="behind-overlay">
                <span className="behind-num">01</span>
                <h4>DESIGN</h4>
                <p>Ideas born from culture,<br/>mythology and<br/>modern aesthetics.</p>
              </div>
            </div>
            <div className="behind-card">
              <img src="/raven_hoodie_back_1785054706044.png" alt="Source" />
              <div className="behind-overlay">
                <span className="behind-num">02</span>
                <h4>SOURCE</h4>
                <p>Carefully selected fabrics<br/>and trims from trusted<br/>partners.</p>
              </div>
            </div>
            <div className="behind-card">
              <img src="/signature_zip_hoodie_1785054724510.png" alt="Craft" />
              <div className="behind-overlay">
                <span className="behind-num">03</span>
                <h4>CRAFT</h4>
                <p>Precision manufacturing<br/>with attention to every<br/>detail.</p>
              </div>
            </div>
            <div className="behind-card">
              <img src="/raven_hoodie_back_1785054706044.png" alt="Deliver" />
              <div className="behind-overlay">
                <span className="behind-num">04</span>
                <h4>DELIVER</h4>
                <p>Thoughtful packaging,<br/>quick delivery and<br/>unmatched service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-journey-section dark-section">
        <div className="container journey-container">
          <div className="journey-text">
            <span className="section-eyebrow">JOIN THE JOURNEY</span>
            <h2>BE PART OF<br/>SOMETHING GREATER.</h2>
            <p>New drops, stories and exclusive offers.</p>
          </div>
          <div className="journey-actions">
            <div className="journey-form">
              <input type="email" placeholder="Enter your email" />
              <button className="btn-primary" style={{backgroundColor: '#f5f4ef', color: '#121212'}}>SUBSCRIBE</button>
            </div>
            <div className="journey-social">
              <div className="social-icons">
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Youtube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" aria-label="X (Twitter)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Pinterest">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.605 0 12.017 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
