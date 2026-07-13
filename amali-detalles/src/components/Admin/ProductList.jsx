// src/components/Admin/ProductList.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProductList() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [categories, setCategories] = useState([]);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchProducts = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${API}/api/products`),
        fetch(`${API}/api/products/categories`)
      ]);

      const prods = await prodRes.json();
      const cats = await catRes.json();

      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error('Error al cargar:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===========================
  // ELIMINAR
  // ===========================
  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;

    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error();

      setProducts(products.filter((p) => p.id !== id));

    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  // ===========================
  // EDITAR
  // ===========================
  const startEdit = (product) => {
    setEditing(product);

    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: null
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', editForm.name);
    formData.append('description', editForm.description);
    formData.append('price', editForm.price);
    formData.append('category', editForm.category);

    if (editForm.image) {
      formData.append('image', editForm.image);
    }

    try {

      const res = await fetch(`${API}/api/products/${editing.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) throw new Error();

      await fetchProducts();

      setEditing(null);

      setEditForm({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
      });

    } catch (err) {
      console.error(err);
      alert('Error al editar producto');
    }
  };

  const cancelEdit = () => {
    setEditing(null);

    setEditForm({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null
    });
  };

  if (loading) {
    return (
      <p className="text-center py-8">
        Cargando productos...
      </p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto w-full">

      <h2 className="text-2xl font-bold text-[#d16224] mb-4">
        Lista de Productos
      </h2>

      {editing && (
        <div className="bg-yellow-50 p-6 rounded-lg mb-6 border border-yellow-200">

          <h3 className="text-xl font-bold text-[#d16224] mb-4">
            Editando: {editing.name}
          </h3>

          <form onSubmit={handleEdit} className="space-y-3">

            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: e.target.value
                })
              }
              className="w-full p-3 border rounded"
              required
            />

            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  description: e.target.value
                })
              }
              className="w-full p-3 border rounded"
              required
            />

            <input
              type="number"
              step="0.01"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  price: e.target.value
                })
              }
              className="w-full p-3 border rounded"
              required
            />

            <select
              value={editForm.category}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  category: e.target.value
                })
              }
              className="w-full p-3 border rounded"
              required
            >
              <option value="">
                Selecciona categoría
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.value}
                  value={cat.value}
                >
                  {cat.label}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  image: e.target.files[0]
                })
              }
              className="w-full p-3 border rounded"
            />

            <div className="flex gap-2">

              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Guardar Cambios
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>

            </div>

          </form>

        </div>
      )}

      {products.length === 0 ? (

        <p>No hay productos.</p>

      ) : (

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-lg">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm">
                {product.description}
              </p>

              <p className="text-[#d16224] font-bold mt-2">
                ${product.price}
              </p>

              <span className="inline-block px-3 py-1 text-xs font-medium text-[#d16224] bg-orange-100 rounded-full mt-2">
                {categories.find(c => c.value === product.category)?.label || product.category}
              </span>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => startEdit(product)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      <button
        onClick={fetchProducts}
        className="mt-6 w-full bg-[#d16224] text-white py-2 rounded hover:bg-[#b4521f]"
      >
        Actualizar Lista
      </button>

    </div>
  );
}