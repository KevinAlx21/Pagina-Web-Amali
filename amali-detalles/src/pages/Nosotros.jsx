// src/pages/Nosotros.jsx
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Nosotros() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-10 md:py-8">
        <div className="container mx-auto px-6 sm:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#5C6E5E] mb-3">
            Sobre Amali
          </h1>
          <p className="text-lg font-serif sm:text-xl text-[#d16224] max-w-2xl mx-auto">
            Detalles hechos con amor para los momentos más especiales de tu vida
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-12 md:py-8 bg-white">
        <div className="container mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Imagen */}
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="Amali Detalles" 
              className="w-48 sm:w-64 md:w-80 object-contain drop-shadow-lg"
            />
          </div>

          {/* Texto */}
          <div className="space-y-4 text-gray-700 text-base sm:text-lg font-serif leading-relaxed">
            <p>
              ¡Hola! Soy <span className="font-serif  text-[#d16224]">Yadira</span>, la cara (y las manos) detrás de Amali.
            </p>
            <p>
              En Amali nos dedicamos a crear detalles personalizados que transmiten cariño, gratitud y emociones verdaderas. Creemos que un regalo va más allá del objeto: es un mensaje, un abrazo y una manera especial de decir “eres importante”.
            </p>
            <p>
              Cada uno de nuestros productos se diseña según el gusto y esencia de quien regala y de quien recibe, porque sabemos que los pequeños gestos pueden convertir un día común en un recuerdo inolvidable.
            </p>
            <p>
              Trabajamos con amor para que cada detalle hable por ti y conecte corazones.
            </p>
            <p className="text-[#d16224] font-medium">
              Amali – Sorprende con amor.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de valores */}
      <section className="py-12 md:py-8 bg-white">
        <div className="container mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5C6E5E] text-center mb-8 md:mb-12">
            Lo que nos mueve
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Card 1 */}
            <div className="bg-[#FAF0EB] p-6 rounded-2xl shadow-md text-center">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Hecho con amor</h3>
              <p className="text-gray-600 text-base font-serif sm:text-lg">
                Cada detalle lleva horas de dedicación y muchísimo cariño.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF0EB] p-6 rounded-2xl shadow-md text-center">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">Calidad premium</h3>
              <p className="text-gray-600 text-base font-serif sm:text-lg">
                Elaboramos detalles con una presentación excepcional y contenido siempre de alto nivel
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF0EB] p-6 rounded-2xl shadow-md text-center">
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">😊</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">100% personalizado</h3>
              <p className="text-gray-600 text-base font-serif sm:text-lg">
                Tú sueñas el detalle, nosotros lo hacemos realidad.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
