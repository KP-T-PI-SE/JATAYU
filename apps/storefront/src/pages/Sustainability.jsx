import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Sustainability = () => {
  const { content } = useContext(ContentContext);
  
  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.sustainability.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.sustainability.title.toUpperCase()}</h1>
          <p>{content.sustainability.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>DESIGNED FOR LONGEVITY</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.sustainability.design}</p>
          </div>

          <div className="help-section">
            <h2>ETHICAL MANUFACTURING</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.sustainability.ethical}</p>
          </div>

          <div className="help-section">
            <h2>CARBON NEUTRAL SHIPPING & PACKAGING</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.sustainability.packaging}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
