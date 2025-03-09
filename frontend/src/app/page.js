import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Our Blog
      </h1>
      <p className="text-gray-600 mb-6">
        Discover interesting articles and share your thoughts with our community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* We'll add featured posts here later */}
      </div>
    </div>
  );
}
