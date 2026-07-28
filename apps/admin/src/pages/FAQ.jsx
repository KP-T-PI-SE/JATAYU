import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './HelpPages.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. International shipping costs and delivery times are calculated at checkout based on your location. Please note that customs duties and taxes are the responsibility of the customer."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns and exchanges within 14 days of delivery. Items must be unworn, unwashed, and have all original tags attached. Final sale items are not eligible for return."
    },
    {
      question: "How do your clothes fit?",
      answer: "Our pieces are designed with a signature oversized and relaxed fit. If you prefer a more true-to-size, tailored look, we recommend sizing down. Please refer to our Size Guide for detailed measurements."
    },
    {
      question: "When will my order ship?",
      answer: "Orders are typically processed and shipped within 24-48 hours of being placed (excluding weekends and holidays). Once shipped, you'll receive a confirmation email with a tracking number."
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order using the tracking link in your shipping confirmation email, or by visiting our Track Order page and entering your order number and email address."
    },
    {
      question: "Do you restock sold out items?",
      answer: "We occasionally restock popular items, but many of our collections are limited drops. The best way to stay informed about restocks and new drops is to subscribe to our newsletter."
    }
  ];

  return (
    <div className="help-page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">HOME</Link> &gt; <span className="current">FAQs</span>
        </div>
        
        <div className="help-header">
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
          <p>Got questions? We've got answers.</p>
        </div>

        <div className="help-content">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          
          <div className="help-section" style={{textAlign: 'center', marginTop: 'var(--spacing-4xl)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-3xl)'}}>
            <h3>STILL NEED HELP?</h3>
            <p>If you couldn't find the answer to your question, our support team is here to help.</p>
            <a href="mailto:support@jatayu.com" className="btn-primary" style={{display: 'inline-block', padding: '1rem 2rem', marginTop: '1rem'}}>CONTACT SUPPORT</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
