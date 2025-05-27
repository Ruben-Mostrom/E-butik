import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
