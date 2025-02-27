import React, { useState, useEffect } from "react";
import { useCartStore } from "../components/cartStore";
import CurrencySelector from "../components/selector"; // Importar el selector de moneda

export default function PostCard({ id, title, description, image, slug, price }) {
  const [currency, setCurrency] = useState('€'); // Moneda predeterminada: Euro
  const addToCart = useCartStore((state) => state.addToCart);

  // Función para convertir el precio según la moneda seleccionada
  const convertPrice = (price, currency) => {
    switch (currency) {
      case '$':
        return (price * 1.1).toFixed(2); // Ejemplo de conversión a dólares
      case '£':
        return (price * 0.9).toFixed(2); // Ejemplo de conversión a libras
      default:
        return price.toFixed(2); // Euro por defecto
    }
  };

  // Actualizar el estado cuando se cambia la moneda
  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
  };

  return (
    <article className="h-full flex flex-col justify-between bg-green-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-5 flex flex-col justify-between flex-grow">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-gray-300 mt-2">{description.substring(0, 100)}...</p>
        <p className="text-yellow-400 font-semibold mt-2">{currency} {convertPrice(price, currency)}</p>

        {/* Botón amarillo de agregar al carrito */}
        <button
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          onClick={() => addToCart({ id, title, price, image })}
        >
          🛒 Agregar al carrito
        </button>

        <a href={`/blog/${slug}`} className="text-blue-400 hover:underline mt-3">
          Leer más
        </a>
      </div>

      <CurrencySelector onCurrencyChange={handleCurrencyChange} />
    </article>
  );
}
