// Fetch data from Firebase Realtime Database
export const fetchPostData = async () => {
  const databaseURL = "https://proyecto-p9-default-rtdb.europe-west1.firebasedatabase.app/posts.json";

  try {
    const response = await fetch(databaseURL);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud fetch:", error);
    return null;
  }
};

// Write data to Firebase using fetch
export const setPostData = async (postId, postData) => {
  const databaseURL = `https://proyecto-p9-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;

  try {
    const response = await fetch(databaseURL, {
      method: "PUT", // Firebase Realtime Database usa PUT para escribir datos
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Error al escribir los datos");
    }

    console.log("Datos guardados correctamente");
    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud fetch (PUT):", error);
    return null;
  }
};
