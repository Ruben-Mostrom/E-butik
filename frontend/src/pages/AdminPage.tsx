import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category: ''
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:4000/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    const res = await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      setNewProduct({ name: '', price: 0, description: '', image_url: '', category: '' });
      fetchProducts();
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:4000/products`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchProducts();
  };

  const handleEditSave = async () => {
    if (!editingProduct) return;

    await fetch(`http://localhost:4000/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProduct)
    });

    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div>
      <h1>Adminpanel</h1>

      <h2>Skapa ny produkt</h2>
      <input
        placeholder="Namn"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        placeholder="Pris"
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
      />
      <input
        placeholder="Beskrivning"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        placeholder="Image URL"
        value={newProduct.image_url}
        onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
      />
      <input
        placeholder="Kategori"
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
      />
      <button onClick={handleAdd}>Lägg till produkt</button>

      <h2>Produkter</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editingProduct?.id === product.id ? (
              <div>
                <input
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                />
                <input
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
                <input
                  value={editingProduct.image_url}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                />
                <input
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                />
                <button onClick={handleEditSave}>Spara</button>
                <button onClick={() => setEditingProduct(null)}>Avbryt</button>
              </div>
            ) : (
              <div>
                <strong>{product.name}</strong> – {product.price} kr ({product.category})
                <button onClick={() => setEditingProduct(product)}>Redigera</button>
                <button onClick={() => handleDelete(product.id)}>Ta bort</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
