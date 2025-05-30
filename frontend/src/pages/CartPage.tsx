import { useCart } from '../context/useCart';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Kundvagn</h1>
      {cart.length === 0 ? (
        <p>Din kundvagn är tom.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} – {item.quantity} st – {item.price} kr/st
                <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
              </li>
            ))}
          </ul>
          <p>Totalt: {total} kr</p>
          <button onClick={clearCart}>Töm kundvagn</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
