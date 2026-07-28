import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';
import './HelpPages.css';

const Story = () => {
  const { content } = useContext(ContentContext);

  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">{content.story.title.toUpperCase()}</span>
        </div>
        
        <div className="help-header">
          <h1>{content.story.title.toUpperCase()}</h1>
          <p>{content.story.subtitle}</p>
        </div>

        <div className="help-content">
          <div className="help-section">
            <h2>THE BEGINNING</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.story.beginning}</p>
          </div>

          <div className="help-section">
            <h2>OUR CRAFT</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.story.craft}</p>
          </div>

          <div className="help-section">
            <h2>THE COMMUNITY</h2>
            <p style={{whiteSpace: 'pre-line'}}>{content.story.community}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
