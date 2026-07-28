import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Privacy = () => {
  const { content } = useContext(ContentContext);

  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.privacy.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.privacy.title.toUpperCase()}</h1>
          <p>{content.privacy.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>INTRODUCTION</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.privacy.intro}</p>
          </div>

          <div className="help-section">
            <h2>INFORMATION WE COLLECT</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.privacy.collect}</p>
          </div>

          <div className="help-section">
            <h2>HOW WE USE YOUR INFORMATION</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.privacy.use}</p>
          </div>

          <div className="help-section">
            <h2>COOKIES</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.privacy.cookies}</p>
          </div>

          <div className="help-section">
            <h2>CONTACT US</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.privacy.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
