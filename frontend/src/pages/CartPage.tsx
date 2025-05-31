import { useCart } from '../context/useCart';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

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
                <button onClick={() => decreaseQuantity(item.id)} style={{ margin: '0 5px' }}>
                  -
                </button>
                <button onClick={() => increaseQuantity(item.id)} style={{ margin: '0 5px' }}>
                  +
                </button>
                <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
                <img src={item.image_url} alt={item.name} style={{ width: '80px', height: 'auto' }} />
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
