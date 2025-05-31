import { useState } from 'react';
import { useCart } from '../context/useCart';

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

    // skicka orderdata till backend eller API
    // För demo gör vi bara en bekräftelse
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div>
        <h2>Tack för din beställning, {name}!</h2>
        <p>Vi har skickat en bekräftelse till {email}.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return <p>Din kundvagn är tom. Lägg till produkter innan du går till kassan.</p>;
  }

  return (
    <div>
      <h1>Kassa</h1>

      <h2>Orderöversikt</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} st - {item.price} kr/st
          </li>
        ))}
      </ul>
      <p>
        <strong>Totalt: {total} kr</strong>
      </p>

      <h2>Dina uppgifter</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Namn:
          <br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />

        <label>
          E-post:
          <br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />

        <label>
          Adress:
          <br />
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <br />

        <button type="submit">Slutför köp</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
