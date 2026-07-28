import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Shipping = () => {
  const { content } = useContext(ContentContext);
  
  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.shipping.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.shipping.title.toUpperCase()}</h1>
          <p>{content.shipping.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>DELIVERY TIMES & COSTS</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.shipping.times}</p>
            
            <h3>DOMESTIC (INDIA)</h3>
            <p style={{whiteSpace: 'pre-line'}}>{content.shipping.domestic}</p>

            <h3>INTERNATIONAL</h3>
            <p style={{whiteSpace: 'pre-line'}}>{content.shipping.international}</p>
          </div>

          <div className="help-section">
            <h2>ORDER TRACKING</h2>
            <p>Once your order is shipped, you will receive a confirmation email containing your tracking number. You can track your order directly on our <Link to="/track" style={{textDecoration: 'underline'}}>Tracking Page</Link> or via the carrier's website.</p>
          </div>

          <div className="help-section">
            <h2>CUSTOMS & DUTIES (INTERNATIONAL)</h2>
            <p>For international orders, custom duties and local taxes may be applied depending on your country's regulations. These charges are the responsibility of the customer and are not included in the checkout total.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
