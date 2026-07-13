// src/components/Admin/AddProduct.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AddProduct() {
  const { token } = useAuth();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/categories`
        );

        if (!res.ok) throw new Error('Error cargando categorías');

        const data = await res.json();
        setCategories(data);

        if (data.length > 0) {
          setForm(prev => ({ ...prev, category: data[0].value }));
        }
      } catch (err) {
        console.error('Error cargando categorías:', err);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!form.category) {
      setMessage('Selecciona una categoría');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    if (form.image) formData.append('image', form.image);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage('¡Producto agregado con éxito!');
        setForm({
          name: '',
          description: '',
          price: '',
          category: categories[0]?.value || '',
          image: null
        });
        document.querySelector('input[type="file"]').value = ''; // limpiar input file
      } else {
        setMessage(data.error || 'Error al agregar');
      }
    } catch (err) {
      setMessage('Error de red');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-xl mx-auto w-full"
    >
      <h2 className="text-2xl font-bold text-[#d16224] mb-4">Agregar Producto</h2>

      {message && (
        <p className={`mb-4 font-medium ${message.includes('éxito') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-3 border rounded mb-3"
        required
      />

      <textarea
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-3 border rounded mb-3 h-28"
        required
      />

      <input
        type="number"
        step="0.01"
        placeholder="Precio"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full p-3 border rounded mb-3"
        required
      />

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full p-3 border rounded mb-3"
        required
      >
        <option value="">Selecciona una categoría</option>
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        className="w-full p-3 border rounded mb-4"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#d16224] text-white py-3 rounded hover:bg-[#b4521f] disabled:opacity-50 transition"
      >
        {loading ? 'Guardando...' : 'Agregar Producto'}
      </button>
    </form>
  );
}