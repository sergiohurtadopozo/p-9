import React, { useState, useEffect } from 'react';

// Simulación de la compra (mock) sin errores
const mockPurchase = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Compra exitosa!');
    }, 1500);
  });
};

// Componente Modal para Video
const VideoModal = ({ videoUrl, onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
      <button 
        className="absolute top-2 right-2 text-gray-700 font-bold text-lg" 
        onClick={onClose}
      >
        ×
      </button>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">¡Bienvenido al video del curso!</h3>
      <iframe
        width="100%"
        height="400"
        src={videoUrl}
        title="Video del curso"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

// Componente Modal para mensajes
const Modal = ({ message, onClose, isError }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className={`text-xl font-semibold ${isError ? 'text-red-600' : 'text-green-600'}`}>
        {message}
      </h2>
      <div className="mt-4 flex justify-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
);

// Componente principal
const BotonComprar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Videos de los cursos
  const courseVideos = {
    "Fundamentos Técnicos del Fútbol": "https://www.youtube.com/embed/kNux3hnrgcg",
    "Estrategias y Posicionamiento en el Campo": "https://www.youtube.com/embed/H4TVqz1f06c",
    "Mejora Física y Mental": "https://www.youtube.com/embed/CM5Kpv29iFM",
    "Estrategias Avanzadas": "https://www.youtube.com/embed/-8p0rGlQ2LQ",
    "Proyecto Final: Diseña tu Plan Táctico": "https://www.youtube.com/embed/N84LlKWid1I",
    "Nutrición y Rendimiento Deportivo": "https://www.youtube.com/embed/CEVXawuw3jk",
    "Preparación para Torneos": "https://www.youtube.com/embed/KfDaI-KQ5kU",
    "Comunicación en el Equipo": "https://www.youtube.com/embed/sqhymZJ-sgU",
    "Entrenamientos Individuales": "https://www.youtube.com/embed/8DPHALEIit8",
    "Revisión de Reglas del Fútbol": "https://www.youtube.com/embed/mRW4Ts-Hx04",
    "Control de Presión en el Juego": "https://www.youtube.com/embed/d9sKMDO4mg8",
    "Analítica y Estadísticas en el Fútbol": "https://www.youtube.com/embed/UZqkX-nb7nw",
  };

  // Verificar si ya hay datos guardados en el localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
      setIsSubscribed(true);
    }
  }, []);

  // Manejo de compra
  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const result = await mockPurchase();
      setMessage(result);
      setIsError(false);
      setIsPurchased(true);
      if (selectedCourse && courseVideos[selectedCourse]) {
        setVideoUrl(courseVideos[selectedCourse]);
        setIsVideoOpen(true); // Abre el modal del video automáticamente
      }
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para guardar la suscripción en el localStorage
  const handleSubscription = () => {
    if (name && email) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      setIsSubscribed(true);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setIsSubscribed(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Cursos Disponibles</h1>
      {isSubscribed ? (
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="py-3 px-6 mt-2 text-lg font-semibold bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSubscription}
            className="py-3 px-6 mt-2 text-lg font-semibold bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            disabled={!name || !email}
          >
            Suscribirse
          </button>
        </div>
      )}
      <div className="my-4">
        <label className="block text-gray-700 font-semibold">Selecciona un curso:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
          disabled={!isSubscribed}
        >
          <option value="">Selecciona...</option>
          {Object.keys(courseVideos).map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handlePurchase}
        className="py-4 px-8 text-2xl font-semibold bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300"
        disabled={!selectedCourse || isLoading || !isSubscribed}
      >
        {isLoading ? 'Cargando...' : 'Comprar Curso'}
      </button>
      {isModalOpen && <Modal message={message} onClose={() => setIsModalOpen(false)} isError={isError} />}
      {isVideoOpen && videoUrl && <VideoModal videoUrl={videoUrl} onClose={() => setIsVideoOpen(false)} />}
    </div>
  );
};

export default BotonComprar;
