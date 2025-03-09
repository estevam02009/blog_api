'use client';
import { useState, useEffect } from 'react';
import { fetchApi } from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    tags: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCategories(), fetchUsers()]);
    };
    fetchData();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await fetchApi('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await fetchApi('/users');
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...post,
        tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
      };
      
      await fetchApi('/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      router.push('/posts');
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.message || 'Failed to create post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Criar Nova Postagem</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Autor</label>
          <select
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Selecione um autor</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
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
            Publicar
          </button>
          <button
            type="button"
            onClick={() => router.push('/posts')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}