import React, { useState } from "react";

const FootballSlider = () => {
  const slides = [
    {
      id: 0,
      title: "Fundamentos Técnicos del Fútbol",
      description:
        "Aprende los principios básicos para dominar el balón y mejorar tu técnica.",
      image:
        "https://wallpapers.com/images/hd/uefa-champions-league-field-v7chfpp2xl8v843j.jpg",
    },
    {
      id: 1,
      title: "Estrategias y Posicionamiento",
      description:
        "Descubre cómo optimizar tu rendimiento en el campo con tácticas avanzadas.",
      image:
        "https://estaticos-cdn.prensaiberica.es/clip/66b06c28-e429-439c-aac9-6ccc692361ac_source-aspect-ratio_default_0.jpg",
    },
    {
      id: 2,
      title: "Mejora Física y Mental",
      description:
        "Fortalece tu cuerpo y mente para rendir al máximo en cada partido.",
      image:
        "https://e1.pxfuel.com/desktop-wallpaper/941/562/desktop-wallpaper-wanda-metropolitano-new-football-stadium-3840x2400-for-your-mobile-tablet.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Slider */}
      <div className="overflow-hidden relative rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 relative"
              style={{ width: "100%" }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                {currentSlide === slide.id && (
                  <>
                    <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-sm sm:text-base">{slide.description}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-black hover:bg-gray-200"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-black hover:bg-gray-200"
        >
          &#8594;
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default FootballSlider;
