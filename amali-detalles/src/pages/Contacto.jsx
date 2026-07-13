// src/pages/Contacto.jsx
import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `¡Hola Amali!%0AMi nombre es ${formData.nombre}%0ACorreo: ${formData.email}%0ATeléfono: ${formData.telefono}%0A%0A${formData.mensaje}`;
    window.open(`https://wa.me/593987451408?text=${whatsappMessage}`, '_blank');
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#FAF0EB] py-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#5C6E5E] mb-6">
            ¡Hablemos!
          </h1>
          <p className="text-lg sm:text-xl font-serif  text-[#d16224] max-w-2xl mx-auto">
            Cuéntame qué tienes en mente y con gusto te ayudo a hacerlo realidad
          </p>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Formulario */}
            <div>
              <h2 className="text-3xl font-serif mb-8">Envíame un mensaje</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#bb4f19] focus:outline-none"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Tu correo"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#bb4f19] focus:outline-none"
                />

                <input
                  type="tel"
                  name="telefono"
                  placeholder="Tu teléfono (opcional)"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#bb4f19] focus:outline-none"
                />

                <textarea
                  name="mensaje"
                  required
                  rows="6"
                  placeholder="¿Qué detalle necesitas? ¿Fecha del evento? ¡Cuéntame todo!"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#bb4f19] focus:outline-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-[#d16224] text-white font-semibold py-4 rounded-lg hover:bg-[#bb4f19] transition"
                >
                  Enviar por WhatsApp
                </button>
              </form>
            </div>

            {/* Información de contacto */}
            <div className="space-y-8">
              <h2 className="text-3xl font-serif mb-8">También puedes encontrarme en</h2>

              <div className="space-y-8">

                {/* Ubicación */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FAF0EB] rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d16224]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Ubicación</p>
                    <p className="text-gray-600">Quito Ponciano Alto, Ecuador</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FAF0EB] rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d16224]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 1.77.46 3.5 1.34 5.02L2 22l5.1-1.32c1.45.79 3.08 1.21 4.74 1.21h.01c5.52 0 10-4.48 10-10s-4.48-9.85-10-9.85zm5.47 14.3c-.23.65-1.33 1.24-1.84 1.32-.47.08-1.07.11-1.73-.11-.4-.13-.92-.3-1.59-.58-2.82-1.22-4.66-4.06-4.81-4.25-.14-.19-1.15-1.53-1.15-2.92s.73-2.07 1-2.36c.27-.29.59-.36.79-.36h.57c.18.01.43-.07.68.52.23.55.78 1.9.85 2.03.07.13.11.29.01.47-.1.18-.15.29-.3.46-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.18.29.78 1.29 1.68 2.08 1.16 1.03 2.13 1.34 2.47 1.49.34.15.54.13.73-.08.19-.21.84-.98 1.06-1.32.22-.34.45-.28.76-.17.31.11 1.96.93 2.3 1.1.34.17.57.25.65.39.08.14.08.82-.15 1.47z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp / Teléfono</p>
                    <p className="text-gray-600">+593 987451408</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FAF0EB] rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d16224]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Correo</p>
                    <p className="text-gray-600">amalidetalles@hotmail.com</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FAF0EB] rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d16224]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.51 4.51 0 0 0 12 7.5zm0 7.2A2.7 2.7 0 1 1 14.7 12 2.71 2.71 0 0 1 12 14.7zm4.8-7.3a1.2 1.2 0 1 1-1.2-1.2 1.21 1.21 0 0 1 1.2 1.2z"/>
                    </svg>
                  </div>
                  <div>
                    <a
                      href="https://www.instagram.com/amali.ec1?igsh=MXU3cDhrc3NoMTVyNw%3D%3D&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline"
                    >
                      @amali.ec1
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
