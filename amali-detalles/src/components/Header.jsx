import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [shake, setShake] = useState(false);
  const [open, setOpen] = useState(false); // menú móvil

  useEffect(() => {
    if (totalItems > 0) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header className="bg-[#FAF0EB] text-black border-b border-gray-200 p-3 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-1 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="h-7 w-28 sm:h-8 sm:w-32 md:h-9 md:w-36 object-contain" 
          />
        </Link>

        {/* === ICONO CARRITO + BOTÓN HAMBURGUESA (SOLO MÓVIL) === */}
        <div className="flex items-center gap-4 md:hidden">

          {/* CARRITO MÓVIL */}
          <Link
            to="/carrito"
            className={`relative transition ${shake ? "shake-cart" : ""}`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 
                0L7 13m0 0l-2.293 2.293c-.63.63-.184 
                1.707.707 1.707H17m0 0a2 2 0 100 
                4 2 2 0 000-4z"
              />
            </svg>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="md:hidden text-black"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* NAV DESKTOP */}
          <nav className="hidden md:flex gap-8 items-center text-lg font-serif font-bold">
          <Link to="/" className="hover:text-[#d16224]">Inicio</Link>
          <Link to="/catalogo" className="hover:text-[#d16224]">Catálogo</Link>
          <Link to="/nosotros" className="hover:text-[#d16224]">Sobre Nosotros</Link>
          <Link to="/contacto" className="hover:text-[#d16224]">Contacto</Link>

          {/* CARRITO (DESKTOP) */}
          <Link
            to="/carrito"
            className={`relative transition ${shake ? "shake-cart" : ""}`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 
                0L7 13m0 0l-2.293 2.293c-.63.63-.184 
                1.707.707 1.707H17m0 0a2 2 0 100 
                4 2 2 0 000-4z"
              />
            </svg>

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* PANEL ADMIN */}
          {user?.email === "amalidetalles@hotmail.com" && (
            <Link
              to="/panel-amali-2025"
              className="bg-white text-[#d16224] px-4 py-2 rounded-lg hover:bg-[#ffe8dc] transition font-semibold"
            >
              Panel
            </Link>
          )}
        </nav>
      </div>

      {/* NAV MÓVIL */}
      {open && (
        <div className="md:hidden mt-3 pb-3 border-t border-gray-300">
          <div className="flex flex-col gap-4 text-lg p-3 font-serif font-bold">

            <Link onClick={() => setOpen(false)} to="/" className="hover:text-[#d16224]">Inicio</Link>
            <Link onClick={() => setOpen(false)} to="/catalogo" className="hover:text-[#d16224]">Catálogo</Link>
            <Link onClick={() => setOpen(false)} to="/nosotros" className="hover:text-[#d16224]">Sobre Nosotros</Link>
            <Link onClick={() => setOpen(false)} to="/contacto" className="hover:text-[#d16224]">Contacto</Link>

            {/* PANEL ADMIN MÓVIL */}
            {user?.email === "amalidetalles@hotmail.com" && (
              <Link
                to="/panel-amali-2025"
                onClick={() => setOpen(false)}
                className="bg-white text-[#d16224] px-4 py-2 rounded-lg text-center border border-[#d16224]"
              >
                Panel
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
