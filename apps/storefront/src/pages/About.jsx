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
              <span>FOLLOW US</span>
              <div className="social-icons">
                <a href="#">IG</a>
                <a href="#">FB</a>
                <a href="#">YT</a>
                <a href="#">PIN</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
