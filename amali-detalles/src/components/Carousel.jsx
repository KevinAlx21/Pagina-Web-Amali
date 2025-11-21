// src/components/Carousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Carousel({ height = 'h-64 md:h-80' }) {
  const slides = [
    {
      image: 'https://res.cloudinary.com/dteaus9vf/image/upload/v1763599917/IMG_8253_kqfzgv.jpg',
      title: '¡Detalles que enamoran!',
      subtitle: 'Fresas con chocolate, cajas premium y más',
      button: 'Ver Catálogo',
      link: '/catalogo',
      position: 'object-[50%_20%]' // 👈 POSICIÓN IMAGEN 
    },
    {
      image: 'https://res.cloudinary.com/dteaus9vf/image/upload/v1763599878/IMG_8254_j3gral.jpg',
      title: 'Regala amor en cada detalle',
      subtitle: 'Entregas a todo Quito y Valles',
      button: 'Contactar por WhatsApp',
      link: 'https://wa.link/xjw857',
      position: 'object-[50%_50%]' // 👈 POSICIÓN IMAGEN
    },
    {
      image: 'https://res.cloudinary.com/dteaus9vf/image/upload/v1763599952/IMG_8252_camvvc.jpg',
      title: 'Ofertas especiales',
      subtitle: '¡Descuentos en regalos corporativos!',
      button: 'Ver Ofertas',
      link: '/catalogo?section=ofertas',
      position: 'object-[50%_50%]' // 👈 POSICIÓN IMAGEN
    }
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop
      className={`w-full ${height}`}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-full w-full">
            
            {/* 👉 Ahora cada imagen usa su propio slide.position */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className={`
                w-full h-full object-cover
                ${slide.position}
              `}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white max-w-2xl">
              <h1 className="text-xl md:text-3xl font-bold mb-2">
                {slide.title}
              </h1>
              <p className="text-base md:text-lg mb-3 md:mb-4">
                {slide.subtitle}
              </p>
              <a
                href={slide.link}
                target={slide.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-block bg-[#d16224] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-[#b8561f] transition text-sm md:text-base"
              >
                {slide.button}
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
