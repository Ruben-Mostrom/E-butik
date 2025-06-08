import cors from 'cors';
import express, { Request, Response } from 'express';
import * as sqlite from 'sqlite';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';

const app = express();

app.use(cors());
app.use(express.json());

let database: Database;

(async () => {
  database = await sqlite.open({
    driver: sqlite3.Database,
    filename: 'test.sqlite'
  });

  await database.run('PRAGMA foreign_keys = ON');

  await database.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  await database.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image_url TEXT,
      category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  app.get('/products', async (_req, res) => {
    const products = await database.all(`
    SELECT products.*, categories.name AS category
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
  `);
    res.json(products);
  });

  app.get('/categories', async (_req, res) => {
    const categories = await database.all('SELECT * FROM categories');
    res.json(categories);
  });

  app.delete('/categories/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }

    const used = await database.get('SELECT 1 FROM products WHERE category_id = ? LIMIT 1', id);
    if (used) {
      res.status(400).json({ error: 'Kategori används av produkter och kan inte tas bort' });
      return;
    }

    const result = await database.run('DELETE FROM categories WHERE id = ?', id);
    if (result.changes === 0) {
      res.status(404).json({ error: 'Kategori hittades inte' });
      return;
    }

    res.status(204).send();
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    const result = await database.run('INSERT INTO categories (name) VALUES (?)', name);
    res.status(201).json({ id: result.lastID, name });
  });

  app.post('/products', async (req: Request, res: Response) => {
    const { name, price, description, image_url, category_id } = req.body;
    if (!name || !price) {
      res.status(400).json({ error: 'Name and price are required' });
      return;
    }
    const result = await database.run(
      'INSERT INTO products (name, price, description, image_url, category_id) VALUES (?, ?, ?, ?, ?)',
      name,
      price,
      description || null,
      image_url || null,
      category_id || null
    );
    res.status(201).json({ id: result.lastID, name, price, description, image_url, category_id });
  });

  app.delete('/products', async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }
    await database.run('DELETE FROM products WHERE id = ?', id);
    res.status(204).send();
  });

  app.put('/products', async (req: Request, res: Response) => {
    const { id, name, price, description, image_url, category_id } = req.body;
    if (!id || !name || !price) {
      res.status(400).json({ error: 'ID, name and price are required' });
      return;
    }
    await database.run(
      'UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category_id = ? WHERE id = ?',
      name,
      price,
      description || null,
      image_url || null,
      category_id || null,
      id
    );
    res.status(204).send();
  });

  app.listen(4000, () => {
    console.log('Webbtjänsten kan nu ta emot anrop.');
  });
})();
