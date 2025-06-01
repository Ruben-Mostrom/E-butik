import { useCart } from '../context/useCart';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-heading">Kundvagn</h1>
      {cart.length === 0 ? (
        <p>Din kundvagn är tom.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <strong>{item.name}</strong> – {item.quantity} st – {item.price} kr/st
                  <div className="cart-buttons">
                    <button onClick={() => decreaseQuantity(item.id)} className="cart-btn">
                      −
                    </button>
                    <button onClick={() => increaseQuantity(item.id)} className="cart-btn">
                      +
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="cart-btn remove-btn">
                      Ta bort
                    </button>
                  </div>
                </div>
                <img src={item.image_url} alt={item.name} className="cart-img" />
              </li>
            ))}
          </ul>

          <p className="cart-total">Totalt: {total} kr</p>

          <div className="cart-actions">
            <button onClick={clearCart} className="cart-btn clear-btn">
              Töm kundvagn
            </button>
            <Link to="/checkout">
              <button className="cart-btn checkout-btn">Gå till kassan</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
