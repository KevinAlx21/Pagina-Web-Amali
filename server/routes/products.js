// server/routes/products.js
import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middleware/auth.js';

// === AÑADIDO: Importar categorías ===
import CATEGORIES from '../data/categories.js';  // ← AQUÍ LO AGREGUÉ

const router = express.Router();

// === MULTER (Cloudinary) ===
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'amali-detalles', allowed_formats: ['jpg', 'png', 'jpeg', 'webp'] },
});
const upload = multer({ storage });

// === RUTAS ===

// GET - Todos los productos (público)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === AÑADIDO: Ruta para obtener categorías ===
router.get('/categories', (req, res) => {
  res.json(CATEGORIES);  // ← DEVUELVE LAS CATEGORÍAS
});

// POST - Crear producto (solo admin)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Imagen requerida' });

    const { name, description, price, category } = req.body;

    // === AÑADIDO: Validar todos los campos ===
    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: 'Faltan datos: nombre, descripción, precio o categoría' });
    }

    // === AÑADIDO: Validar que la categoría exista ===
    const validCategory = CATEGORIES.find(c => c.value === category);
    if (!validCategory) {
      return res.status(400).json({ error: 'Categoría inválida. Usa una de las permitidas.' });
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,  // ← AÑADIDO: Guardar categoría
      image: req.file.path,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Editar producto (solo admin)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // === AÑADIDO: Validar categoría si se envía ===
    if (category) {
      const validCategory = CATEGORIES.find(c => c.value === category);
      if (!validCategory) {
        return res.status(400).json({ error: 'Categoría inválida' });
      }
    }

    const updates = {
      name,
      description,
      price: parseFloat(price),
    };

    if (category) updates.category = category;  // ← AÑADIDO
    if (req.file) updates.image = req.file.path;  // ← Si sube nueva foto

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Eliminar producto (solo admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;