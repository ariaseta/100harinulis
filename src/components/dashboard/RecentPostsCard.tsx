import React from 'react';
import { Edit3 } from 'lucide-react';

interface Post {
  id: string | number;
  title: string;
  date: string;
  likes: number;
  comments: number;
  url: string;
}

interface RecentPostsCardProps {
  posts: Post[];
}

const RecentPostsCard: React.FC<RecentPostsCardProps> = ({ posts }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Edit3 className="mr-2 h-5 w-5 text-blue-600" />
          Tulisan Terbaru
        </h2>
        <a href="#" className="text-blue-600 text-sm font-medium">
          Lihat Semua
        </a>
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border-b pb-4 last:border-0 last:pb-0">
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-lg hover:text-blue-600"
            >
              {post.title}
            </a>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">{post.date}</span>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{post.likes} likes</span>
                <span>{post.comments} komentar</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="btn btn-secondary w-full mt-6">
        Tambahkan Tulisan Baru
      </button>
    </div>
  );
};

export default RecentPostsCard;