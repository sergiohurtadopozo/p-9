import { fetchPostData } from "./firebase";

const articles: any[] = [];

// Función para obtener todos los posts
export const getPosts = async () => {
  if (articles.length) return articles;
  const fetchedPosts = await fetchPostData();
  if (fetchedPosts) {
    articles.push(...Object.values(fetchedPosts));
  }
  return articles;
};

// Función para obtener un post por su slug
export const getPostBySlug = async (slug: string) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
};

// Función para obtener todos los slugs
export const getAllSlugs = async () => {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
};