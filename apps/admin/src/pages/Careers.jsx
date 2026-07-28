import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Careers = () => {
  const { content } = useContext(ContentContext);

  const openRoles = [
    { id: 1, title: 'Senior Apparel Designer', department: 'Design', location: 'Mumbai, HQ', type: 'Full-time' },
    { id: 2, title: 'E-commerce Manager', department: 'Operations', location: 'Remote', type: 'Full-time' },
    { id: 3, title: 'Social Media Intern', department: 'Marketing', location: 'Mumbai, HQ', type: 'Internship' },
  ];

  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.careers.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.careers.title.toUpperCase()}</h1>
          <p>{content.careers.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>OUR CULTURE</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.careers.culture}</p>
          </div>

          <div className="help-section">
            <h2>OPEN ROLES</h2>
            <div style={{marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {openRoles.map(role => (
                <div key={role.id} style={{padding: '24px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h3 style={{margin: '0 0 8px 0'}}>{role.title}</h3>
                    <div style={{color: 'var(--color-text-secondary)', fontSize: '0.875rem', display: 'flex', gap: '16px'}}>
                      <span>{role.department}</span>
                      <span>•</span>
                      <span>{role.location}</span>
                      <span>•</span>
                      <span>{role.type}</span>
                    </div>
                  </div>
                  <button className="btn-outline">APPLY NOW</button>
                </div>
              ))}
            </div>
          </div>

          <div className="help-section" style={{marginTop: '48px', padding: '32px', border: '1px solid var(--color-border)', textAlign: 'center'}}>
            <h2>DON'T SEE A FIT?</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.careers.notFit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
