import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/">Florenza Bliss</Link>

      <ul id="nav-menu" className={menuOpen ? 'open' : ''}>
        <li><Link to="/"          onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/shop"      onClick={() => setMenuOpen(false)}>Shop</Link></li>
        <li><Link to="/occasions" onClick={() => setMenuOpen(false)}>Occasions</Link></li>
        <li>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart {cartCount > 0 && <span id="cart-count">{cartCount}</span>}
          </Link>
        </li>
        <li><Link to="/login"     onClick={() => setMenuOpen(false)}>Login</Link></li>
        <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
      </ul>

      <button
        className="menu-toggle"
        id="menu-toggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
