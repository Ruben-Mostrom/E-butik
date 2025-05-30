import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import ProductPage from './pages/ProductPage';
import { Navbar } from './components/Navbar';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
