import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import './Navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Link to="/">Min butik</Link>
        </div>

        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Hem
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              🛒 Kundvagn ({cartCount})
            </Link>
          </li>
        </ul>
      </div>

      <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        ☰
      </button>
    </nav>
  );
};
