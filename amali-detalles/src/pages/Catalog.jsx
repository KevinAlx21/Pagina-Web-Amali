import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import ProductModal from '../components/ProductModal.jsx';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/categories`)
        ]);

        if (!prodRes.ok || !catRes.ok) throw new Error('Error en el servidor');

        const prods = await prodRes.json();
        const cats = await catRes.json();

        setProducts(prods);
        setCategories([{ value: 'all', label: 'Todos' }, ...cats]);
      } catch (err) {
        console.error('Error cargando catálogo:', err);
        setProducts([]);
        setCategories([{ value: 'all', label: 'Todos' }]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const filtered =
    selected === 'all'
      ? products
      : products.filter((p) => p.category === selected);

  if (loading) return <p className="text-center py-16 text-xl">Cargando catálogo...</p>;

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-4xl font-serif font-bold text-black text-center mb-6">
        Catálogo Amali Detalles
      </h1>

      {/* CATEGORÍAS */}
      <div className="flex gap-3 mb-10 px-1 overflow-x-auto md:overflow-visible font-serif font-bold justify-start md:justify-center scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-[#d16224]">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelected(cat.value)}
            className={`
              whitespace-nowrap px-5 py-2 rounded-full font-medium transition
              ${selected === cat.value
                ? 'bg-[#d16224] text-white shadow-md'
                : 'bg-white border border-[#d16224] text-[#d16224] hover:bg-[#ffe8dc] cursor-pointer'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={() => openModal(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
}