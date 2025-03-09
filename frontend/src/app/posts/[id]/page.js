'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchApi } from '@/utils/api';

export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const data = await fetchApi(`/posts/${params.id}`);
      setPost(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!post) return <div className="text-center">Post not found</div>;

  return (
    <article className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex justify-between text-gray-500 mb-6">
        <span>By {post.author?.name || 'Unknown'}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="prose max-w-none">
        {post.content}
      </div>
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        <div className="flex gap-2">
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}