import { useCart } from "../context/CartContext.jsx";
import { useEffect, useState } from "react";

export default function ProductModal({ product, closeModal }) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  // 👉 Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      closeModal();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="
          bg-white rounded-2xl shadow-xl relative animate-fadeIn
          max-w-3xl w-full 
          max-h-[90vh] overflow-y-auto 
          p-6 flex flex-col md:flex-row gap-6
        "
        style={{ animation: "fadeIn 0.25s ease-out" }}
      >
        {/* ========================= IZQUIERDA – IMAGEN ========================= */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
  src={product.image}
  alt={product.name}
  className="
  w-full max-h-[400px] object-contain
  rounded-3xl shadow-[0_5px_20px_rgba(0,0,0,0.1)]
  border border-gray-100 p-4
  bg-white
"
/>

        </div>

        {/* ========================= DERECHA – INFO ========================= */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">

          {/* 🔥 FIX: HEADER DEL LADO DERECHO (TÍTULO + BOTÓN X) */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold text-black leading-tight break-words pr-4">
              {product.name}
            </h2>

            <button
              className="
                w-10 h-10 flex items-center justify-center
                bg-white/80 backdrop-blur-md 
                rounded-full shadow-md
                hover:bg-gray-100
                shrink-0
                cursor-pointer
              "
              onClick={closeModal}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* DESCRIPCIÓN Y PRECIO */}
          <div>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {product.description}
            </p>

            <p className="text-3xl font-bold text-[#d16224] mb-4">
              ${product.price}
            </p>
          </div>

          {/* Cantidad */}
          <div className="mt-2 mb-4 flex items-center gap-4">
            <button
              className="
                w-10 h-10 flex items-center justify-center 
                rounded-lg border border-gray-300 text-xl hover:bg-gray-100 cursor-pointer
              "
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
              -
            </button>

            <span className="text-xl font-semibold w-10 text-center">
              {qty}
            </span>

            <button
              className="
                w-10 h-10 flex items-center justify-center 
                rounded-lg border border-gray-300 text-xl hover:bg-gray-100 cursor-pointer
              "
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleAdd}
            className={`w-full py-3 rounded-lg transition font-semibold cursor-pointer
              ${
                added
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-[#d16224] hover:bg-[#b8561f] text-white"
              }
            `}
          >
            {added ? "Agregado ✓" : "Añadir al Carrito"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
