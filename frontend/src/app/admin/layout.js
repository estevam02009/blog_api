'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/posts" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Posts
              </Link>
            </li>
            <li>
              <Link href="/admin/categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Admin Panel</h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user?.name}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/login');
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}