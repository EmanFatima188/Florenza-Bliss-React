import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>Florenza Bliss</h2>
          <p>
            Handcrafted floral arrangements delivered fresh to your door.
            Because every moment deserves something beautiful.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/occasions">Occasions</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </div>

        {/* Shop Categories */}
        <div>
          <h4>Categories</h4>
          <Link to="/shop">Roses</Link>
          <Link to="/shop">Bouquets</Link>
          <Link to="/shop">Seasonal</Link>
          <Link to="/shop">Custom Orders</Link>
        </div>

        {/* Contact */}
        <div>
          <h4>Contact Us</h4>
          <p>📍 Main Market, Gujrat, Punjab, Pakistan</p>
          <p>📞 <a href="tel:+923001234567">+92 300 123 4567</a></p>
          <p>✉️ <a href="mailto:hello@florenzabliss.pk">hello@florenzabliss.pk</a></p>
          <p>🕐 Mon–Sat: 9 AM – 8 PM</p>
        </div>

        {/* Social */}
        <div>
          <h4>Follow Us</h4>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">WhatsApp</a>
          <a href="#">Pinterest</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Florenza Bliss. All rights reserved.</p>
        <p>Made with 🌸 in Gujrat, Pakistan</p>
      </div>
    </footer>
  );
}
