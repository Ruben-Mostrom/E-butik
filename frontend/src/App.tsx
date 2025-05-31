import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import { Navbar } from './components/Navbar';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/checkoutPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
