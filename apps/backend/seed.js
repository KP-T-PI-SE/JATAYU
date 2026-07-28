import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

// Setup basic environment
const MONGO_URI = 'mongodb://127.0.0.1:27017/jatayu';

const seedProducts = [
  {
    name: 'RAVEN OVERSIZED HOODIE',
    price: 2899,
    originalPrice: 3499,
    discount: 17,
    image: '/raven_hoodie_back_1785054706044.png',
    category: 'Men',
    stock: 45,
    status: 'Active',
    isNewArrival: true,
    description: 'The Raven Oversized Hoodie is built for those who move different.\nHeavyweight, ultra-soft and designed with our signature artwork that represents freedom, strength and resilience.',
    colors: ['Midnight Black', 'Washed Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['👕 Oversized Fit', '🧵 430 GSM Fabric', '⭐ Premium Quality'],
    materials: ['100% Premium Cotton', '430 GSM Heavyweight Fleece', 'Drop Shoulder', 'Kangaroo Pocket', 'Signature JATAYU Artwork Embroidery']
  },
  {
    name: 'CYBERPUNK TECHWEAR HOODIE',
    price: 4199,
    originalPrice: 4999,
    discount: 16,
    image: '/raven_hoodie_back_1785054706044.png',
    category: 'Men',
    stock: 25,
    status: 'Active',
    isNewArrival: true,
    description: 'Futuristic design meets unparalleled utility. Features multiple hidden pockets and a tactical strap system.',
    colors: ['Stealth Black', 'Cyber Grey'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    badges: ['⚙️ Techwear', '🌧️ Water-Resistant'],
    materials: ['Cotton Blend', 'Nylon Overlays', 'YKK Zippers', 'Adjustable Straps']
  },
  {
    name: 'VINTAGE WASHED PULLOVER',
    price: 2599,
    originalPrice: 3199,
    discount: 18,
    image: '/signature_zip_hoodie_1785054724510.png',
    category: 'Unisex',
    stock: 60,
    status: 'Active',
    isNewArrival: false,
    description: 'A classic pullover hoodie treated with a heavy vintage wash for that perfect worn-in look and ultra-soft feel from day one.',
    colors: ['Faded Mocha', 'Vintage Charcoal', 'Dusty Rose'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['🎨 Vintage Wash', '☁️ Ultra Soft'],
    materials: ['100% French Terry Cotton', 'Garment Dyed', 'Relaxed Fit', 'Ribbed Cuffs']
  },
  {
    name: 'SIGNATURE ZIP HOODIE',
    price: 3199,
    originalPrice: 3999,
    discount: 20,
    image: '/signature_zip_hoodie_1785054724510.png',
    category: 'Men',
    stock: 30,
    status: 'Active',
    isNewArrival: true,
    description: 'Elevate your everyday rotation with the Signature Zip Hoodie.\nFeaturing a custom two-way zipper and subtle branding for a minimal, premium aesthetic.',
    colors: ['Oatmeal', 'Forest Green', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['🔥 Best Seller', '🧵 380 GSM Fabric'],
    materials: ['100% French Terry Cotton', '380 GSM', 'YKK Hardware', 'Relaxed Fit']
  },
  {
    name: 'WOMEN\'S CROPPED HOODIE',
    price: 2299,
    originalPrice: 2799,
    discount: 17,
    image: '/raven_hoodie_back_1785054706044.png',
    category: 'Women',
    stock: 40,
    status: 'Active',
    isNewArrival: true,
    description: 'Raw hem cropped hoodie designed for effortless layering. Perfect for high-waisted bottoms and gym cover-ups.',
    colors: ['Blush Pink', 'Heather Grey', 'Cream'],
    sizes: ['XS', 'S', 'M', 'L'],
    badges: ['✨ Cropped Fit', '🧵 Fleece Lined'],
    materials: ['100% Cotton Fleece', 'Cropped Length', 'Drop Shoulder', 'Raw Cut Hem']
  },
  {
    name: 'MINIMALIST HEAVYWEIGHT HOODIE',
    price: 3499,
    originalPrice: 4299,
    discount: 18,
    image: '/raven_hoodie_back_1785054706044.png',
    category: 'Unisex',
    stock: 50,
    status: 'Active',
    isNewArrival: false,
    description: 'No logos. No distractions. Just pure quality. Our heaviest blank hoodie constructed to last a lifetime.',
    colors: ['Bone White', 'Pitch Black', 'Earth Brown'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badges: ['🧵 500 GSM', '⭐ Premium Basics'],
    materials: ['100% Organic Cotton', '500 GSM French Terry', 'Double Lined Hood', 'Boxy Fit']
  },
  {
    name: 'STREETWEAR GRAPHIC HOODIE',
    price: 2999,
    originalPrice: 3599,
    discount: 16,
    image: '/signature_zip_hoodie_1785054724510.png',
    category: 'Men',
    stock: 35,
    status: 'Active',
    isNewArrival: true,
    description: 'Bold back graphic with puff print details. Make a statement with this premium streetwear essential.',
    colors: ['Black', 'Off-White'],
    sizes: ['M', 'L', 'XL'],
    badges: ['🎨 Puff Print', '🔥 Trending'],
    materials: ['Cotton Blend Fleece', 'High-Density Puff Print', 'Drop Shoulder', 'Kangaroo Pocket']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products and indexes
    try {
      await mongoose.connection.db.dropCollection('products');
      console.log('Dropped existing products collection (and its indexes)');
    } catch (e) {
      if (e.code === 26) {
        console.log('Collection does not exist yet');
      } else {
        throw e;
      }
    }

    // Insert new products
    await Product.insertMany(seedProducts);
    console.log('Successfully seeded database with realistic products');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
