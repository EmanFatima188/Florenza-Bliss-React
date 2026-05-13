import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/page';
import Hero from './components/Hero/page';
import FeaturesStrip from './components/FeaturesStrip/page';
import FeaturedProducts from './components/FeaturedProducts/page';
import OccasionsBanner from './components/OccasionsBanner/page';
import WhyChooseUs from './components/WhyChooseUs/page';
import Testimonials from './components/Testimonials/page';
import Footer from './components/Footer/page';
import Cart from './pages/Cart/page';
import Shop from './pages/Shop/page';
import Occasions from './pages/Occasions/page';
import Login from './pages/Login/page';
import Dashboard from './pages/Dashboard/page';

export interface CartItem {
  name: string;
  price: number;
  qty: number;
}

export interface CartActions {
  cart: CartItem[];
  cartCount: number;
  addToCart: (name: string, price: number) => void;
  removeFromCart: (name: string) => void;
  updateQty: (name: string, qty: number) => void;
  clearCart: () => void;
}

// Home page — assembled from components (moved from pages/Home)
function Home({ addToCart, cartCount }: { addToCart: (name: string, price: number) => void; cartCount: number }) {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />
      <FeaturesStrip />
      <FeaturedProducts addToCart={addToCart} />
      <OccasionsBanner />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(name: string, price: number) {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { name, price, qty: 1 }];
    });
  }

  function removeFromCart(name: string) {
    setCart((prev) => prev.filter((i) => i.name !== name));
  }

  function updateQty(name: string, qty: number) {
    if (qty < 1) { removeFromCart(name); return; }
    setCart((prev) => prev.map((i) => i.name === name ? { ...i, qty } : i));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const cartActions: CartActions = { cart, cartCount, addToCart, removeFromCart, updateQty, clearCart };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home addToCart={addToCart} cartCount={cartCount} />} />
        <Route path="/shop"      element={<Shop addToCart={addToCart} cartCount={cartCount} />} />
        <Route path="/occasions" element={<Occasions addToCart={addToCart} cartCount={cartCount} />} />
        <Route path="/cart"      element={<Cart {...cartActions} />} />
        <Route path="/login"     element={<Login cartCount={cartCount} />} />
        <Route path="/dashboard" element={<Dashboard cartCount={cartCount} />} />
      </Routes>
    </BrowserRouter>
  );
}
