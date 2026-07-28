import { createContext, useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

export const ContentContext = createContext();

const defaultContent = {
  home: {
    heroTitle: "THE RAVEN\nCOLLECTION",
    heroSubtitle: "Heavyweight essentials for the everyday grind.\nDesigned in Mumbai. Worn globally.",
    heroButton: "SHOP THE DROP",
    heroImage: "/raven_hoodie_back_1785054706044.png",
    cat1Image: "/signature_zip_hoodie_1785054724510.png",
    cat2Image: "/raven_hoodie_back_1785054706044.png",
    cat3Image: "/signature_zip_hoodie_1785054724510.png",
    brandImage: "/raven_hoodie_back_1785054706044.png"
  },
  story: {
    title: "ROOTED IN MYTH.\nBUILT FOR THE STREETS.",
    subtitle: "THE JATAYU STORY",
    beginning: "JATAYU was born from a desire to merge the rich, epic mythology of India with the raw, unfiltered aesthetic of modern streetwear. In the Ramayana, Jatayu is the legendary vulture king who fought valiantly against impossible odds. We see that same spirit in the youth of today—bold, uncompromising, and fearless.",
    craft: "Every JATAYU garment is conceptualized in our Mumbai studio. We obsess over the details: the drop of a shoulder, the weight of a loopback terry cotton, the precision of a screen print. We believe that streetwear is not just about logos; it is about architecture and silhouette.",
    community: "More than a brand, JATAYU is a movement. We are building a community of creatives, artists, and rebels who refuse to be boxed in. When you wear JATAYU, you are carrying a piece of a legacy.",
    heroImage: "/raven_hoodie_back_1785054706044.png",
    craftImage: "/signature_zip_hoodie_1785054724510.png",
    communityImage: "/raven_hoodie_back_1785054706044.png"
  },
  shipping: {
    title: "SHIPPING & DELIVERY",
    subtitle: "Everything you need to know about getting your gear.",
    times: "We process all orders within 24-48 hours. Once processed, you will receive a tracking link via email and SMS.",
    domestic: "Standard Delivery: 3-5 business days (FREE on orders above ₹1,999, otherwise ₹99)\nExpress Delivery: 1-2 business days (₹199)",
    international: "Standard International: 7-14 business days (Calculated at checkout)\nExpress International: 3-5 business days (Calculated at checkout)"
  },
  returns: {
    title: "RETURNS & EXCHANGES",
    subtitle: "Not the perfect fit? We've got you covered.",
    policy: "We accept returns and exchanges within 14 days of the delivery date. Items must be in their original condition: unworn, unwashed, and with all tags attached.\n\nNote: Final sale items and limited edition drops may not be eligible for returns. Please check the product description.",
    refunds: "Once we receive and inspect your returned item, we will process your refund within 3-5 business days. The refund will be issued to your original payment method. Please note that shipping costs are non-refundable."
  },
  sustainability: {
    title: "SUSTAINABILITY",
    subtitle: "Our commitment to the planet and its people.",
    design: "True sustainability starts with longevity. Fast fashion is the enemy of the environment, which is why we engineer our garments to last. By using heavyweight cottons and reinforced stitching, a JATAYU hoodie isn't just for a season—it's for years to come.",
    ethical: "We work exclusively with manufacturing partners in India who share our commitment to fair wages, safe working conditions, and ethical labor practices. We regularly audit our supply chain to ensure these standards are met without compromise.",
    packaging: "All JATAYU orders are shipped using 100% biodegradable or recycled packaging. We have eliminated single-use virgin plastics from our outbound shipping process.\n\nFurthermore, we calculate the carbon footprint of every shipment and invest in verified carbon offset projects, meaning your delivery is 100% carbon neutral."
  },
  careers: {
    title: "CAREERS AT JATAYU",
    subtitle: "Join the movement.",
    culture: "We are a small, hyper-focused team of designers, creatives, and operators building the future of streetwear. We value autonomy, bold ideas, and a relentless pursuit of perfection.\n\nAt JATAYU, there is no corporate red tape. If you have an idea that can push the brand forward, you have the freedom to execute it.",
    notFit: "We're always looking for exceptional talent. If you think you belong at JATAYU but don't see an open role that fits your skill set, send your portfolio and resume to careers@jatayu.com."
  },
  press: {
    title: "PRESS & MEDIA",
    subtitle: "JATAYU in the news.",
    inquiries: "For all press, media, and styling inquiries, please contact our PR team at press@jatayu.com.",
    assets: "High-resolution logos, brand guidelines, and campaign imagery are available upon request for editorial use."
  },
  privacy: {
    title: "PRIVACY POLICY",
    subtitle: "Last Updated: October 2025",
    intro: "At JATAYU, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.",
    collect: "We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site.\n\n• Personal Data: Name, email address, shipping address, billing address, phone number.\n• Derivative Data: IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site.\n• Financial Data: Data related to your payment method (e.g. valid credit card number, card brand, expiration date) is collected by our payment processors and we do not store this information.",
    use: "We may use the information we collect from you to:\n• Process and fulfill your orders.\n• Improve customer service and respond to your requests.\n• Personalize your user experience.\n• Send periodic emails regarding your order or other products and services.",
    cookies: "We use \"cookies\" to enhance your experience, gather general visitor information, and track visits to our website. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings.",
    contact: "If you have questions or comments about this Privacy Policy, please contact us at: privacy@jatayu.com"
  },
  terms: {
    title: "TERMS & CONDITIONS",
    subtitle: "Please read these terms carefully.",
    lastUpdated: "January 1, 2026",
    content: "By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.\n\nUse License\nPermission is granted to temporarily download one copy of the materials (information or software) on JATAYU's website for personal, non-commercial transitory viewing only."
  },
  men: {
    title: "MEN'S COLLECTION",
    subtitle: "Premium essentials and statement pieces. Designed for everyday resilience.",
    bannerImage: "/signature_zip_hoodie_1785054724510.png"
  },
  women: {
    title: "WOMEN'S COLLECTION",
    subtitle: "Redefining streetwear with bold silhouettes and uncompromised comfort.",
    bannerImage: "/raven_hoodie_back_1785054706044.png"
  },
  newArrivals: {
    title: "NEW ARRIVALS",
    subtitle: "The latest drops. Fresh silhouettes, premium materials, unmistakable JATAYU identity.",
    bannerImage: "/signature_zip_hoodie_1785054724510.png"
  },
  collections: {
    title: "ALL COLLECTIONS",
    subtitle: "Explore our full range of premium streetwear essentials and statement pieces.",
    bannerImage: "/raven_hoodie_back_1785054706044.png"
  },
  about: {
    heroTitle: "BUILT TO RISE.\nMADE TO LAST.",
    heroDesc: "JATAYU is more than clothing. It's a mindset.\nInspired by strength, freedom and purpose,\nwe create pieces that move with you —\nfrom everyday moments to defining journeys.",
    heroImage: "/raven_hoodie_back_1785054706044.png",
    storyTitle: "ROOTED IN LEGEND.\nMADE FOR TODAY.",
    storyDesc1: "In Hindu mythology, Jatayu was the mighty warrior who\nstood up for what was right, even in the face of impossible odds.\nWe draw inspiration from his courage and spirit.",
    storyDesc2: "JATAYU is our tribute to that legacy —\ncrafted for the modern world.",
    storyImage: "/raven_hoodie_back_1785054706044.png",
    craftTitle: "DETAILS\nDEFINE US.",
    craftDesc: "Every stitch, every cut and every finish\nis a reflection of our commitment to\nprecision and perfection.\nWe don't just make clothes.\nWe craft experiences.",
    craftImage: "/signature_zip_hoodie_1785054724510.png"
  }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem('jatayu_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Deep merge parsed content with defaultContent to ensure new pages are included
        const merged = { ...defaultContent };
        Object.keys(parsed).forEach(pageKey => {
          if (merged[pageKey]) {
            merged[pageKey] = { ...merged[pageKey], ...parsed[pageKey] };
          } else {
            merged[pageKey] = parsed[pageKey];
          }
        });
        return merged;
      } catch (e) {
        return defaultContent;
      }
    }
    return defaultContent;
  });
  
  // Need to get showToast from AppContext if possible, but AppContext might be sibling
  // To avoid circular deps or complex nesting, we can just return a standalone function or rely on the UI calling it.
  
  useEffect(() => {
    localStorage.setItem('jatayu_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (page, key, value) => {
    setContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [key]: value
      }
    }));
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};
