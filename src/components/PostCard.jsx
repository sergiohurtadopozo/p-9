import { useCartStore } from "../components/cartStore";

export default function PostCard({ id, title, description, image, slug, price }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <article className="h-full flex flex-col justify-between bg-green-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-5 flex flex-col justify-between flex-grow">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-gray-300 mt-2">{description.substring(0, 100)}...</p>
        <p className="text-yellow-400 font-semibold mt-2">${price}</p>

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
    </article>
  );
}
