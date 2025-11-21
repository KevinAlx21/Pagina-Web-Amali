// src/pages/Admin.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AddProduct from '../components/Admin/AddProduct.jsx';
import ProductList from '../components/Admin/ProductList.jsx';

export default function Admin() {
  const { user, login, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_EMAIL = 'amalidetalles@hotmail.com';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.error) setError(res.error);
  };

  /* ===========================
     LOGIN (si no hay usuario)
  ============================ */
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fff5ee] px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#d16224]/30"
        >
          <h2 className="text-3xl font-extrabold text-[#d16224] text-center mb-6 tracking-wide">
            Panel Admin
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 
                       focus:outline-none focus:border-[#d16224] focus:ring-1 focus:ring-[#d16224]/60 transition"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 
                       focus:outline-none focus:border-[#d16224] focus:ring-1 focus:ring-[#d16224]/60 transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#d16224] text-white py-3 rounded-lg 
                       hover:bg-[#b44f1e] transition font-semibold shadow-md"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  /* ===========================================
     ACCESO DENEGADO (si NO es el admin real)
  ============================================ */
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fff5ee] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-red-200">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Acceso Denegado
          </h1>

          <p className="text-gray-600 mb-6">
            Solo el administrador principal puede acceder a este panel.
          </p>

          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="bg-[#d16224] text-white px-6 py-2 rounded-lg hover:bg-[#b44f1e] transition shadow"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  /* ===========================================
     PANEL ADMINISTRATIVO COMPLETO
  ============================================ */
  return (
    <div className="container mx-auto px-4 py-10">
      {/* HEADER DEL PANEL */}
      <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold text-[#d16224] drop-shadow-sm">
          Panel de {user.name}
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* COMPONENTES DEL ADMIN */}
      <div className="space-y-10">
        <AddProduct />
        <ProductList />
      </div>
    </div>
  );
}
