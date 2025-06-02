"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const sqlite = __importStar(require("sqlite"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let database;
(() => __awaiter(void 0, void 0, void 0, function* () {
    database = yield sqlite.open({
        driver: sqlite3_1.default.Database,
        filename: 'test.sqlite'
    });
    yield database.run('PRAGMA foreign_keys = ON');
    yield database.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image_url TEXT,
      category TEXT
    )
  `);
    app.get('/products', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield database.all('SELECT * FROM products');
        res.json(products);
    }));
    app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, price, description, image_url, category } = req.body;
        if (!name || !price) {
            res.status(400).json({ error: 'Name and price are required' });
            return;
        }
        const result = yield database.run('INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)', name, price, description || null, image_url || null, category || null);
        res.status(201).json({ id: result.lastID, name, price, description, image_url, category });
    }));
    app.delete('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ error: 'ID is required' });
            return;
        }
        yield database.run('DELETE FROM products WHERE id = ?', id);
        res.status(204).send();
    }));
    app.put('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, name, price, description, image_url, category } = req.body;
        if (!id || !name || !price) {
            res.status(400).json({ error: 'ID, name and price are required' });
            return;
        }
        yield database.run('UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category = ? WHERE id = ?', name, price, description || null, image_url || null, category || null, id);
        res.status(204).send();
    }));
    app.listen(4000, () => {
        console.log('Webbtjänsten kan nu ta emot anrop.');
    });
}))();
