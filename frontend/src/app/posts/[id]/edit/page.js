'use client';
import { useState, useEffect } from 'react';
import { fetchApi } from '@/utils/api';
import { useRouter, useParams } from 'next/navigation';

export default function EditPost() {
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchPost(), fetchCategories()]);
  }, []);

  const fetchPost = async () => {
    try {
      const data = await fetchApi(`/posts/${params.id}`);
      setPost({
        ...data,
        tags: data.tags.join(', ')
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await fetchApi('/categories');
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...post,
        tags: post.tags.split(',').map(tag => tag.trim())
      };
      
      await fetchApi(`/posts/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
      });
      
      router.push(`/posts/${params.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Editar Postagem</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Título</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Conteúdo</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            rows="10"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Categoria</label>
          <select
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={post.tags}
            onChange={(e) => setPost({ ...post, tags: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="tecnologia, programação, web"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => router.push(`/posts/${params.id}`)}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}