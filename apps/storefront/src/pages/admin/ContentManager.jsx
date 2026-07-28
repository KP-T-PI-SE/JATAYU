import { useContext, useState } from 'react';
import { ContentContext } from '../../context/ContentContext';
import { AppContext } from '../../context/AppContext';
import { Undo2, Redo2 } from 'lucide-react';

const FieldEditor = ({ value, onChange, label, isTextarea, fieldKey = '' }) => {
  const [history, setHistory] = useState([value]);
  const [pointer, setPointer] = useState(0);

  const onFieldChange = (e) => {
    const val = e.target.value;
    const newHistory = history.slice(0, pointer + 1);
    newHistory.push(val);
    setHistory(newHistory);
    setPointer(newHistory.length - 1);
    onChange(val);
  };

  const handleUndo = () => {
    if (pointer > 0) {
      const newPointer = pointer - 1;
      setPointer(newPointer);
      onChange(history[newPointer]);
    }
  };

  const handleRedo = () => {
    if (pointer < history.length - 1) {
      const newPointer = pointer + 1;
      setPointer(newPointer);
      onChange(history[newPointer]);
    }
  };

  const currentValue = history[pointer];

  const isImageField = fieldKey.toLowerCase().includes('image');

  return (
    <div style={{marginBottom: 'var(--spacing-xl)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)'}}>
        <label style={{color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0}}>{label}</label>
        <div style={{display: 'flex', gap: '8px'}}>
          <button 
            onClick={handleUndo} 
            disabled={pointer === 0} 
            className="btn-outline"
            style={{display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '0.75rem', cursor: pointer === 0 ? 'not-allowed' : 'pointer', opacity: pointer === 0 ? 0.5 : 1}} 
            title="Undo"
          >
            <Undo2 size={14}/> UNDO
          </button>
          <button 
            onClick={handleRedo} 
            disabled={pointer === history.length - 1} 
            className="btn-outline"
            style={{display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '0.75rem', cursor: pointer === history.length - 1 ? 'not-allowed' : 'pointer', opacity: pointer === history.length - 1 ? 0.5 : 1}} 
            title="Redo"
          >
            <Redo2 size={14}/> REDO
          </button>
        </div>
      </div>
      {isImageField && (
        <div style={{marginBottom: '12px'}}>
          {currentValue ? (
            <div style={{border: '1px solid var(--color-border)', padding: '16px', background: 'var(--color-bg-primary)', display: 'inline-block', borderRadius: '8px'}}>
              <img src={currentValue} alt="Preview" style={{maxHeight: '160px', maxWidth: '100%', objectFit: 'contain', display: 'block', marginBottom: '16px', borderRadius: '4px'}} onError={(e) => e.target.style.display = 'none'} onLoad={(e) => e.target.style.display = 'block'} />
              <div style={{display: 'flex', gap: '8px'}}>
                <label className="btn-primary" style={{cursor: 'pointer', padding: '6px 12px', fontSize: '0.75rem', display: 'inline-block'}}>
                  Change Image
                  <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => onFieldChange({ target: { value: reader.result } });
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
                <button type="button" className="btn-outline" style={{padding: '6px 12px', fontSize: '0.75rem', borderColor: '#ef4444', color: '#ef4444'}} onClick={() => onFieldChange({ target: { value: '' } })}>
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div style={{border: '1px dashed var(--color-border)', padding: '32px', background: 'var(--color-bg-secondary)', borderRadius: '8px', textAlign: 'center'}}>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px', fontSize: '0.875rem'}}>No image selected</p>
              <label className="btn-primary" style={{cursor: 'pointer', display: 'inline-block'}}>
                Upload Image
                <input type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => onFieldChange({ target: { value: reader.result } });
                    reader.readAsDataURL(file);
                  }
                }} />
              </label>
            </div>
          )}
        </div>
      )}

      {!isImageField && (
        isTextarea ? (
          <textarea 
            value={currentValue}
            onChange={onFieldChange}
            style={{width: '100%', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '12px', minHeight: '120px'}}
          />
        ) : (
          <input 
            type="text"
            value={currentValue}
            onChange={onFieldChange}
            style={{width: '100%', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', padding: '12px'}}
          />
        )
      )}
    </div>
  );
};

const ContentManager = () => {
  const { content, updateContent } = useContext(ContentContext);
  const { showToast } = useContext(AppContext);
  
  const [activeTab, setActiveTab] = useState('home');

  const [formData, setFormData] = useState({
    home: { ...content.home },
    story: { ...content.story },
    shipping: { ...content.shipping },
    returns: { ...content.returns },
    sustainability: { ...content.sustainability },
    careers: { ...content.careers },
    press: { ...content.press },
    privacy: { ...content.privacy },
    terms: { ...content.terms },
    men: { ...content.men },
    women: { ...content.women },
    newArrivals: { ...content.newArrivals },
    collections: { ...content.collections },
    about: { ...content.about }
  });

  const handleChange = (page, key, value) => {
    setFormData(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [key]: value
      }
    }));
  };

  const handleSave = (page) => {
    Object.keys(formData[page]).forEach(key => {
      updateContent(page, key, formData[page][key]);
    });
    showToast(`${page.charAt(0).toUpperCase() + page.slice(1)} page content updated successfully`);
  };

  const tabs = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'story', label: 'Our Story' },
    { id: 'men', label: 'Men\'s Collection' },
    { id: 'women', label: 'Women\'s Collection' },
    { id: 'newArrivals', label: 'New Arrivals' },
    { id: 'collections', label: 'All Collections' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'returns', label: 'Returns' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'careers', label: 'Careers' },
    { id: 'press', label: 'Press' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'terms', label: 'Terms' },
  ];

  const renderField = (page, key, label, isTextarea = false) => {
    return <FieldEditor key={`${page}-${key}`} value={formData[page][key]} onChange={(val) => handleChange(page, key, val)} label={label} isTextarea={isTextarea} fieldKey={key} />;
  };

  const renderFormActions = (page) => {
    const pageLabel = tabs.find(t => t.id === page)?.label || 'Page';
    return (
      <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginTop: '32px', borderTop: '1px solid var(--color-border)', paddingTop: '24px'}}>
        <button className="btn-primary" onClick={() => handleSave(page)}>Save {pageLabel}</button>
      </div>
    );
  };

  return (
    <>
      <div className="admin-page-header">
        <h1>Content Management System</h1>
      </div>

      <div className="admin-card" style={{marginBottom: 'var(--spacing-3xl)'}}>
        <div className="admin-card-header" style={{display: 'flex', gap: 'var(--spacing-md)', borderBottom: '1px solid var(--color-border)', padding: '0 16px', overflowX: 'auto', whiteSpace: 'nowrap'}}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 'var(--spacing-lg) var(--spacing-md)',
                color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div style={{padding: 'var(--spacing-2xl)'}}>
          
          {activeTab === 'home' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Hero Section</h2>
              {renderField('home', 'heroTitle', 'Hero Title')}
              {renderField('home', 'heroSubtitle', 'Hero Subtitle', true)}
              {renderField('home', 'heroButton', 'Button Text')}
              {renderField('home', 'heroImage', 'Hero Background Image URL')}
              
              <h2 style={{margin: 'var(--spacing-xl) 0', fontSize: '1.25rem', paddingTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)'}}>Categories Section</h2>
              {renderField('home', 'cat1Image', 'Category 1 (Hoodies) Image URL')}
              {renderField('home', 'cat2Image', 'Category 2 (Tees) Image URL')}
              {renderField('home', 'cat3Image', 'Category 3 (Cargos) Image URL')}

              <h2 style={{margin: 'var(--spacing-xl) 0', fontSize: '1.25rem', paddingTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)'}}>Brand Banner Section</h2>
              {renderField('home', 'brandImage', 'Brand Story Background Image URL')}
              
              {renderFormActions('home')}
            </div>
          )}

          {activeTab === 'men' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Men's Collection Banner</h2>
              {renderField('men', 'title', 'Title')}
              {renderField('men', 'subtitle', 'Subtitle', true)}
              {renderField('men', 'bannerImage', 'Banner Image URL')}
              {renderFormActions('men')}
            </div>
          )}

          {activeTab === 'women' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Women's Collection Banner</h2>
              {renderField('women', 'title', 'Title')}
              {renderField('women', 'subtitle', 'Subtitle', true)}
              {renderField('women', 'bannerImage', 'Banner Image URL')}
              {renderFormActions('women')}
            </div>
          )}

          {activeTab === 'newArrivals' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>New Arrivals Banner</h2>
              {renderField('newArrivals', 'title', 'Title')}
              {renderField('newArrivals', 'subtitle', 'Subtitle', true)}
              {renderField('newArrivals', 'bannerImage', 'Banner Image URL')}
              {renderFormActions('newArrivals')}
            </div>
          )}

          {activeTab === 'collections' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>All Collections Banner</h2>
              {renderField('collections', 'title', 'Title')}
              {renderField('collections', 'subtitle', 'Subtitle', true)}
              {renderField('collections', 'bannerImage', 'Banner Image URL')}
              {renderFormActions('collections')}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Hero Section</h2>
              {renderField('about', 'heroTitle', 'Title', true)}
              {renderField('about', 'heroDesc', 'Description', true)}
              {renderField('about', 'heroImage', 'Background Image URL')}

              <h2 style={{margin: 'var(--spacing-xl) 0', fontSize: '1.25rem', paddingTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)'}}>Our Story Section</h2>
              {renderField('about', 'storyTitle', 'Title', true)}
              {renderField('about', 'storyDesc1', 'Paragraph 1', true)}
              {renderField('about', 'storyDesc2', 'Paragraph 2', true)}
              {renderField('about', 'storyImage', 'Section Image URL')}

              <h2 style={{margin: 'var(--spacing-xl) 0', fontSize: '1.25rem', paddingTop: 'var(--spacing-xl)', borderTop: '1px solid var(--color-border)'}}>Craftsmanship Section</h2>
              {renderField('about', 'craftTitle', 'Title', true)}
              {renderField('about', 'craftDesc', 'Description', true)}
              {renderField('about', 'craftImage', 'Background Image URL')}

              {renderFormActions('about')}
            </div>
          )}

          {activeTab === 'story' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Page Details</h2>
              {renderField('story', 'title', 'Page Title')}
              {renderField('story', 'subtitle', 'Page Subtitle')}
              {renderField('story', 'beginning', 'The Beginning (Paragraph)', true)}
              {renderField('story', 'craft', 'Our Craft (Paragraph)', true)}
              {renderField('story', 'community', 'The Community (Paragraph)', true)}
              {renderFormActions('story')}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Shipping Details</h2>
              {renderField('shipping', 'title', 'Page Title')}
              {renderField('shipping', 'subtitle', 'Page Subtitle')}
              {renderField('shipping', 'times', 'Delivery Times', true)}
              {renderField('shipping', 'domestic', 'Domestic Shipping info', true)}
              {renderField('shipping', 'international', 'International Shipping info', true)}
              {renderFormActions('shipping')}
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Returns Policy</h2>
              {renderField('returns', 'title', 'Page Title')}
              {renderField('returns', 'subtitle', 'Page Subtitle')}
              {renderField('returns', 'policy', 'Our Policy', true)}
              {renderField('returns', 'refunds', 'Refund Processing', true)}
              {renderFormActions('returns')}
            </div>
          )}

          {activeTab === 'sustainability' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Sustainability Info</h2>
              {renderField('sustainability', 'title', 'Page Title')}
              {renderField('sustainability', 'subtitle', 'Page Subtitle')}
              {renderField('sustainability', 'design', 'Designed For Longevity', true)}
              {renderField('sustainability', 'ethical', 'Ethical Manufacturing', true)}
              {renderField('sustainability', 'packaging', 'Carbon Neutral Shipping', true)}
              {renderFormActions('sustainability')}
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Careers</h2>
              {renderField('careers', 'title', 'Page Title')}
              {renderField('careers', 'subtitle', 'Page Subtitle')}
              {renderField('careers', 'culture', 'Our Culture', true)}
              {renderField('careers', 'notFit', "Don't see a fit?", true)}
              {renderFormActions('careers')}
            </div>
          )}

          {activeTab === 'press' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Press & Media</h2>
              {renderField('press', 'title', 'Page Title')}
              {renderField('press', 'subtitle', 'Page Subtitle')}
              {renderField('press', 'inquiries', 'Press Inquiries', true)}
              {renderField('press', 'assets', 'Brand Assets', true)}
              {renderFormActions('press')}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Privacy Policy</h2>
              {renderField('privacy', 'title', 'Page Title')}
              {renderField('privacy', 'subtitle', 'Last Updated Text')}
              {renderField('privacy', 'intro', 'Introduction', true)}
              {renderField('privacy', 'collect', 'Information We Collect', true)}
              {renderField('privacy', 'use', 'How We Use Information', true)}
              {renderField('privacy', 'cookies', 'Cookies', true)}
              {renderField('privacy', 'contact', 'Contact Us', true)}
              {renderFormActions('privacy')}
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="cms-form">
              <h2 style={{marginBottom: 'var(--spacing-xl)', fontSize: '1.25rem'}}>Terms & Conditions</h2>
              {renderField('terms', 'title', 'Page Title')}
              {renderField('terms', 'subtitle', 'Last Updated Text')}
              {renderField('terms', 'intro', 'Introduction', true)}
              {renderField('terms', 'products', 'Products & Pricing', true)}
              {renderField('terms', 'billing', 'Orders & Billing', true)}
              {renderField('terms', 'intellectual', 'Intellectual Property', true)}
              {renderField('terms', 'governing', 'Governing Law', true)}
              {renderFormActions('terms')}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ContentManager;
