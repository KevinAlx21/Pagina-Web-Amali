// src/pages/CartPage.jsx
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, totalItems, totalPrice, whatsappUrl } = useCart();

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-serif font-bold text-[#d16224] mb-4">Tu Carrito</h1>
        <p className="text-gray-600 font-serif mb-8 text-lg">Tu carrito está vacío</p>

        <Link
          to="/catalogo"
          className="inline-block bg-[#d16224] text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-[#b8561f] transition"
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* TÍTULO Y VOLVER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-[#d16224]">Tu Carrito</h1>
        <Link
          to="/catalogo"
          className="text-[#d16224] font-serif font-bold hover:text-[#b8561f]"
        >
          Continuar Comprando
        </Link>
      </div>

      {/* ITEMS DEL CARRITO */}
      <div className="space-y-5 mb-10">
        {cart.map(item => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100  font-serif font-bold hover:shadow-md transition"
          >
            {/* Imagen */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl shadow"
            />

            {/* Info */}
            <div className="flex-1 w-full">
              <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-[#d16224] font-bold text-lg mt-1">${item.price}</p>
            </div>

            {/* Cantidad */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQty(item._id, item.qty - 1)}
                className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-gray-700 hover:bg-gray-300 transition cursor-pointer"
              >
                −
              </button>

              <span className="w-8 text-center font-semibold text-gray-800">
                {item.qty}
              </span>

              <button
                onClick={() => updateQty(item._id, item.qty + 1)}
                className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-gray-700 hover:bg-gray-300 transition cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Eliminar */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 font-semibold hover:text-red-700 transition cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL Y BOTÓN DE COMPRA */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center text-2xl font-bold mb-5">
          <span>Total ({totalItems} items):</span>
          <span className="text-[#d16224]">${totalPrice.toFixed(2)}</span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-600 text-white py-4 rounded-xl text-center font-semibold hover:bg-green-700 transition text-xl shadow"
        >
          Comprar por WhatsApp
        </a>
      </div>
    </div>
  );
}
