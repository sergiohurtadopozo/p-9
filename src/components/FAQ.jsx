import React, { useState } from 'react';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null); // Estado para manejar cuál pregunta está activa

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index); // Alternar visibilidad
  };

  return (
    <div
      className="faq p-8 rounded-lg shadow-lg"
      style={{
        backgroundColor: '#1a202c', // Fondo verde oscuro similar al de Bet365
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff', // Asegura que el texto sea blanco sobre el fondo oscuro
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-500">Preguntas Frecuentes</h2>

      {/* Cada pregunta con su respectiva respuesta */}
      {[
        {
          question: '¿Cómo me inscribo en un curso?',
          answer: 'Solo tienes que hacer clic en el botón de inscripción en la página del curso que te interese.',
        },
        {
          question: '¿Los cursos son en vivo o grabados?',
          answer: 'Todos nuestros cursos son grabados y pueden ser visualizados en cualquier momento.',
        },
        {
          question: '¿Cuánto tiempo tengo acceso al curso?',
          answer: 'Tendrás acceso ilimitado al curso una vez que te inscribas.',
        },
        {
          question: '¿Puedo obtener un certificado al finalizar el curso?',
          answer: 'Sí, recibirás un certificado de finalización al completar todos los módulos del curso.',
        },
        {
          question: '¿Hay algún requisito previo para inscribirse en los cursos?',
          answer: 'No, nuestros cursos están diseñados para todos los niveles, desde principiantes hasta avanzados.',
        },
      ].map((item, index) => (
        <div key={index} className="faq-item mb-6">
          <h3
            onClick={() => toggleAnswer(index)} // Hacer clic cambia el estado de la pregunta activa
            className="text-xl font-semibold text-teal-300 cursor-pointer hover:text-teal-400 transition-colors duration-200"
          >
            {item.question}
          </h3>
          
          {/* Mostrar respuesta solo si la pregunta está activa */}
          {activeQuestion === index && (
            <div className="bg-green-700 p-4 rounded-lg shadow-md mt-2">
              <p className="text-lg text-gray-200">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
