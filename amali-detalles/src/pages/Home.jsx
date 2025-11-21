// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

export default function Home() {
  return (
    <div className="w-full">
      
      {/* Carrusel */}
      <Carousel height="h-60 sm:h-72 md:h-80 lg:h-96" />
      
      {/* SECCIÓN DE BIENVENIDA */}
      <section className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-black mb-4">
          Bienvenidos a Amali Detalles
        </h2>

        <p className="text-base sm:text-lg font-serif text-gray-700 max-w-2xl mx-auto mb-6">
          Regala momentos inolvidables con nuestros detalles personalizados.
          Fresas con chocolate, arreglos florales, cajas premium y más.
        </p>

        <Link 
          to="/catalogo" 
          className="inline-block bg-[#d16224] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#bb4f19] transition"
        >
          Explorar Catálogo
        </Link>
      </section>

      {/* SECCIÓN DE INFORMACIÓN */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* CARD TÉRMINOS */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 sm:p-8 transition duration-300">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#d16224] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Términos y Condiciones
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Conoce nuestras políticas de entrega
              </p>
            </div>

            <div className="space-y-4 text-left">
              {[
                ["Zonas de entrega:", "Todo Quito y valles (consultar zonas adicionales)"],
                ["Tiempo de entrega:", "24-48 horas para pedidos estándar"],
                ["Pagos:", "Se requiere el pago total al momento de realizar la reserva"],
                ["Horarios:", "Lunes a Domingo de 8:00 AM a 8:00 PM"],
                ["Cancelación:", "No se aceptan devoluciones ni reembolsos"],
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-4 h-4 bg-[#d16224] rounded-full mt-1"></div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    <strong>{title}</strong> {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD FORMAS DE PAGO */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 sm:p-8 transition duration-300">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>

              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Formas de Pago
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Opciones para tu comodidad
              </p>
            </div>

            {/* 🔥 ICONOS ORIGINALES — NO SE TOCAN */}
            <div className="space-y-4">

              {/* Transferencia */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-700">Transferencia/Depósito</span>
                </div>
                <span className="text-sm text-gray-500">Banco Pichincha-Banco Internacional-Jep</span>
              </div>

              {/* Tarjeta */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-700">Tarjeta</span>
                </div>
                <span className="text-sm text-gray-500">Débito/Crédito</span>
              </div>

              {/* Payphone */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-700">Payphone</span>
                </div>
                <span className="text-sm text-gray-500">En línea</span>
              </div>

              <div className="bg-[#ffe8dc] border border-[#d16224] rounded-lg p-4 mt-4">
                <p className="text-sm text-[#5C6E5E] text-center">
                  <strong>Nota:</strong> Para pedidos mayores a $50 aplica el 75% de anticipo en temporada alta
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
