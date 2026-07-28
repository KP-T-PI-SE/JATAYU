import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Returns = () => {
  const { content } = useContext(ContentContext);
  
  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.returns.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.returns.title.toUpperCase()}</h1>
          <p>{content.returns.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>OUR RETURN POLICY</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.returns.policy}</p>
          </div>

          <div className="help-section">
            <h2>HOW TO RETURN OR EXCHANGE</h2>
            <ul>
              <li>Visit our Returns Portal and enter your Order Number and Email.</li>
              <li>Select the item(s) you wish to return or exchange.</li>
              <li>Print the provided shipping label.</li>
              <li>Package the items securely and drop them off at the designated carrier location.</li>
            </ul>
          </div>

          <div className="help-section">
            <h2>REFUND PROCESSING</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.returns.refunds}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;
