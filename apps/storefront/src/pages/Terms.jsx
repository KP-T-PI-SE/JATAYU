import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Terms = () => {
  const { content } = useContext(ContentContext);

  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.terms.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.terms.title.toUpperCase()}</h1>
          <p>{content.terms.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>INTRODUCTION</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.terms.intro}</p>
          </div>

          <div className="help-section">
            <h2>PRODUCTS & PRICING</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.terms.products}</p>
          </div>

          <div className="help-section">
            <h2>ORDERS & BILLING</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.terms.billing}</p>
          </div>

          <div className="help-section">
            <h2>INTELLECTUAL PROPERTY</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.terms.intellectual}</p>
          </div>

          <div className="help-section">
            <h2>GOVERNING LAW</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.terms.governing}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
