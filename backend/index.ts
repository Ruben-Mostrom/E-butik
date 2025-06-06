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
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image_url TEXT,
      category TEXT
    )
  `);

  app.get('/products', async (_req, res) => {
    const products = await database.all('SELECT * FROM products');
    res.json(products);
  });

  app.post('/products', async (req: Request, res: Response) => {
    const { name, price, description, image_url, category } = req.body;
    if (!name || !price) {
      res.status(400).json({ error: 'Name and price are required' });
      return;
    }
    const result = await database.run(
      'INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)',
      name,
      price,
      description || null,
      image_url || null,
      category || null
    );
    res.status(201).json({ id: result.lastID, name, price, description, image_url, category });
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
    const { id, name, price, description, image_url, category } = req.body;
    if (!id || !name || !price) {
      res.status(400).json({ error: 'ID, name and price are required' });
      return;
    }
    await database.run(
      'UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category = ? WHERE id = ?',
      name,
      price,
      description || null,
      image_url || null,
      category || null,
      id
    );
    res.status(204).send();
  });

  app.listen(4000, () => {
    console.log('Webbtjänsten kan nu ta emot anrop.');
  });
})();
