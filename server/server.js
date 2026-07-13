import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';


// Cargar .env
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);


// Solo mostrar advertencias de variables faltantes

console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'OK' : 'FALTA');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en puerto ${PORT}`);
});