import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();
  
  // Estado para cambiar texto del botón
  const [added, setAdded] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
      onClick={onClick}
    >

      {/* IMAGEN DEL PRODUCTO */}
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-64 object-cover"
      />

      <div className="p-5">

        {/* TÍTULO */}
        <h3 className="text-xl font-serif font-bold text-black mb-1">{product.name}</h3>

        {/* DESCRIPCIÓN */}
        <p className="text-gray-600 font-serif text-sm mb-3">{product.description}</p>

        {/* PRECIO */}
        <p className="text-2xl font-serif font-bold text-black mb-4">${product.price}</p>

        
        {/* BOTÓN CARRITO */}
        
        <button
          onClick={(e) => {
            e.stopPropagation(); // evita abrir la vista del producto
            addToCart(product);
            
            // Cambiar texto del botón temporalmente
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className={`w-full py-3 rounded-lg transition font-semibold cursor-pointer
            ${added 
              ? "bg-green-600 hover:bg-green-700 text-white" // verde cuando se agrega
              : "bg-[#d16224] hover:bg-[#b8561f] text-white"   // color normal
            }`}
        >
          {added ? "Agregado ✓" : "Agregar al Carrito"}
        </button>

      </div>

    </div>
  );
}
