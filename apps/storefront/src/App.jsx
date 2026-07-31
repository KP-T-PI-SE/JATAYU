import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toast from './components/Toast';
import StoreLayout from './layouts/StoreLayout';
import { AdminProvider } from './context/AdminContext';
import { CustomerProvider } from './context/CustomerContext';

// Store Pages
import Wishlist from './pages/Wishlist';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Collection from './pages/Collection';
import Bag from './pages/Bag';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Home from './pages/Home';
import New from './pages/New';
import Shop from './pages/Shop';
import Account from './pages/Account';

// Help Pages
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import SizeGuide from './pages/SizeGuide';
import FAQ from './pages/FAQ';
import TrackOrder from './pages/TrackOrder';

// Company & Legal Pages
import Story from './pages/Story';
import Sustainability from './pages/Sustainability';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <AdminProvider>
      <CustomerProvider>
        <Router>
        <Routes>
          {/* Storefront Routes */}
          <Route path="/" element={<StoreLayout />}>
            <Route index element={<Home />} />
            <Route path="new" element={<New />} />
            <Route path="shop" element={<Shop />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="account" element={<Account />} />
            <Route path="search" element={<Search />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="collections" element={<Collection />} />
            <Route path="bag" element={<Bag />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="about" element={<About />} />
            
            {/* Help Routes */}
            <Route path="shipping" element={<Shipping />} />
            <Route path="returns" element={<Returns />} />
            <Route path="size-guide" element={<SizeGuide />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="track" element={<TrackOrder />} />

            {/* Company & Legal Routes */}
            <Route path="story" element={<Story />} />
            <Route path="sustainability" element={<Sustainability />} />
            <Route path="careers" element={<Careers />} />
            <Route path="press" element={<Press />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>
        </Routes>
        <Toast />
      </Router>
      </CustomerProvider>
    </AdminProvider>
  );
}

export default App;
