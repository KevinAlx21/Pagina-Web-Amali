// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import productRoutes from './routes/products.js';

// === 1. CARGAR .env PRIMERO ===
dotenv.config();

// === 2. VERIFICAR JWT_SECRET ===
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('CLOUDINARY_NAME:', process.env.CLOUDINARY_NAME);

// === 3. CONFIGURAR CLOUDINARY ===
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

console.log('Cloudinary configurado:', {
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_KEY?.slice(0, 4) + '...',
  secret: process.env.CLOUDINARY_SECRET ? 'OK' : 'FALTA'
});

// === 4. AHORA SÍ: IMPORTAR authRoutes ===
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server en puerto ${PORT}`);
});