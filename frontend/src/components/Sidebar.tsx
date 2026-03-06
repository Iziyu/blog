import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Category } from '../types';
import { categoryApi } from '../api';

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams] = useSearchParams();
  const activeCateId = searchParams.get('cate_id');

  useEffect(() => {
    categoryApi.list().then(setCategories).catch(() => {});
  }, []);

  return (
    <div className="bg-blue-50 rounded-lg overflow-hidden">
      <div className="border-b border-white px-4 py-3">
        <h3 className="font-bold text-gray-800 border-l-4 border-emerald-400 pl-2">
          文章分类
        </h3>
      </div>
      <div className="p-4">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-sm">暂无分类</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                to="/"
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !activeCateId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                }`}
              >
                全部
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/?cate_id=${cat.id}`}
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCateId === String(cat.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {cat.display_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
