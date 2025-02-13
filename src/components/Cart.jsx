import { useCartStore } from "../components/cartStore";
import { useState, useEffect } from "react";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Verificar si el usuario está suscrito desde el localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    if (storedName && storedEmail) {
      setIsSubscribed(true);  // Usuario suscrito
    } else {
      setIsSubscribed(false); // Usuario no suscrito
    }
  }, []);

  const handleCheckout = () => {
    if (!isSubscribed) {
      alert("¡Debes estar suscrito para realizar la compra!");  // Mensaje si no está suscrito
      return;
    }

    setIsCheckout(true); // Simula el proceso de checkout
    clearCart(); // Vacía el carrito después de la compra
    alert("¡Compra realizada con éxito! 🛒"); // Muestra el alert de compra exitosa
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Botón para abrir el carrito */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒 {cart.length} {isOpen ? "▼" : "▲"}
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-12 w-72 bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">El carrito está vacío.</p>
          ) : (
            <>
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-green-600 text-sm">${item.price}</p>
                    </div>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>

              {/* Botón para proceder a la compra */}
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full"
                onClick={handleCheckout}
                disabled={!isSubscribed}  // Bloquea el botón si no está suscrito
              >
                Comprar
              </button>
            </>
          )}
        </div>
      )}

      {!isSubscribed && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white py-2 px-4 rounded-md">
          <p>¡Debes estar suscrito para realizar compras!</p>
        </div>
      )}
    </div>
  );
}
