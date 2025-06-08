import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import type { Category } from '../types/Category';

const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category_id: 1
  });

  const [newCategoryName, setNewCategoryName] = useState('');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:4000/products');
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('http://localhost:4000/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const res = await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      setNewProduct({ name: '', price: 0, description: '', image_url: '', category_id: 1 });
      fetchProducts();
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    const res = await fetch('http://localhost:4000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategoryName })
    });

    if (res.ok) {
      setNewCategoryName('');
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const res = await fetch(`http://localhost:4000/categories/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      fetchCategories();
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

  const getCategoryName = (categoryId: number) => {
    return categories.find((cat) => cat.id === categoryId)?.name || 'Okänd kategori';
  };

  return (
    <div>
      <h1>Adminpanel</h1>

      <h2>Skapa ny kategori</h2>
      <input placeholder="Kategori namn" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
      <button onClick={handleAddCategory}>Lägg till kategori</button>
      <h2>Kategorier</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name} <button onClick={() => handleDeleteCategory(cat.id)}>Ta bort</button>
          </li>
        ))}
      </ul>

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
      <select
        value={newProduct.category_id}
        onChange={(e) => setNewProduct({ ...newProduct, category_id: parseInt(e.target.value) })}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
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
                <select
                  value={editingProduct.category_id}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category_id: parseInt(e.target.value) })}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleEditSave}>Spara</button>
                <button onClick={() => setEditingProduct(null)}>Avbryt</button>
              </div>
            ) : (
              <div>
                <strong>{product.name}</strong> – {product.price} kr ({getCategoryName(product.category_id)})
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
