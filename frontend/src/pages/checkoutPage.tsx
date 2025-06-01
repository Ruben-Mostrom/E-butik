import { useState } from 'react';
import { useCart } from '../context/useCart';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !address) {
      alert('Vänligen fyll i alla fält');
      return;
    }

    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <h2>Tack för din beställning, {name}!</h2>
        <p>Vi har skickat en bekräftelse till {email}</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return <p className="checkout-container">Din kundvagn är tom. Lägg till produkter innan du går till kassan.</p>;
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-heading">Kassa</h1>

      <h2 className="section-title">Orderöversikt</h2>
      <ul className="order-list">
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} st - {item.price} kr/st
          </li>
        ))}
      </ul>
      <p className="order-total">
        <strong>Totalt: {total} kr</strong>
      </p>

      <h2 className="section-title">Dina uppgifter</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Namn:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          E-post:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Adress:
          <input value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>

        <button type="submit" className="submit-btn">
          Slutför köp
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
