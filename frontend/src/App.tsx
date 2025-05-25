import { useState } from 'react';
import './App.css';
import { ProductList } from './pages/ProductList';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Hello World</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <div className="app">
        <ProductList />
      </div>
    </>
  );
}

export default App;
