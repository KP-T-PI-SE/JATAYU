import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Press = () => {
  const { content } = useContext(ContentContext);

  const pressFeatures = [
    { id: 1, publication: 'HYPEBEAST', title: 'JATAYU Redefines Indian Streetwear with Monsoon Collection', date: 'Sept 2025' },
    { id: 2, publication: 'GQ INDIA', title: 'The New Wave of Premium Essentials', date: 'Aug 2025' },
    { id: 3, publication: 'VOGUE', title: 'How Jatayu is Merging Myth with Modernity', date: 'July 2025' }
  ];

  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.press.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.press.title.toUpperCase()}</h1>
          <p>{content.press.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>FEATURED IN</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px'}}>
              {pressFeatures.map(feature => (
                <div key={feature.id} style={{padding: '24px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)'}}>
                  <div style={{color: 'var(--color-text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '12px'}}>{feature.publication}</div>
                  <h3 style={{fontSize: '1.25rem', marginBottom: '16px', lineHeight: 1.4}}>{feature.title}</h3>
                  <div style={{fontSize: '0.875rem', color: 'var(--color-text-secondary)'}}>{feature.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="help-section">
            <h2>PRESS INQUIRIES</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.press.inquiries}</p>
          </div>

          <div className="help-section">
            <h2>BRAND ASSETS</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.press.assets}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
