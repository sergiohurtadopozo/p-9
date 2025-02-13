import React, { useState, useEffect } from 'react';
import { fetchPostData } from '../lib/firebase.js';

const BuscadorDeModulos = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching posts from Firebase..."); // Depuración
      const postsFromFirebase = await fetchPostData();
      if (postsFromFirebase) {
        const postsArray = Object.values(postsFromFirebase);
        console.log("Posts recibidos:", postsArray); // Depuración
        setPosts(postsArray);
      } else {
        console.log("No se recibieron datos.");
      }
    };
    fetchPosts();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePostClick = (post) => {
    window.location.href = `/blog/${post.slug}`;      
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPost(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const filteredPosts = posts.filter((post) =>
    post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Botón para abrir el diálogo */}
      <button
        onClick={handleOpenDialog}
        className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-green-500 bg-black rounded-lg hover:bg-green-700 hover:text-white transition-all duration-300 ease-in-out">
      
        Explorar Cursos
      </button>

      {/* Dialog que se abre con el botón */}
      {isDialogOpen && (
        <dialog open className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Buscar Cursos</h2>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Busca posts..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full p-3 border-2 border-green-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 mb-4"
          />

          {/* Mostrar lista de resultados filtrados */}
          <ul className="space-y-2">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <li
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="cursor-pointer text-lg font-semibold text-neutral-900 hover:text-green-500 hover:underline transition-all duration-300 transform hover:scale-105"
                >
                  {post.title}
                </li>
              ))
            ) : (
              <li className="text-lg font-medium text-red-500">No se encontraron resultados</li>
            )}
          </ul>

          {/* Mostrar el modal con información del post seleccionado */}
          {selectedPost && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold">{selectedPost.title}</h3>
              <p>{selectedPost.description}</p>
            </div>
          )}

          {/* Botón para cerrar el diálogo */}
          <button
            onClick={handleCloseDialog}
            className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all"
          >
            Cerrar
          </button>
        </dialog>
      )}
    </div>
  );
};

export default BuscadorDeModulos;
