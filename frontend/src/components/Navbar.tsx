import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-blue-400 font-bold text-lg hover:text-white transition-colors">
            iziyu CMS
          </Link>

          <form onSubmit={handleSearch} className="hidden sm:flex items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索文章..."
              className="px-3 py-1.5 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 text-sm w-48"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors text-sm"
            >
              搜索
            </button>
          </form>

          <div className="hidden sm:flex items-center gap-4">
            <Link to="/" className="text-blue-400 hover:text-white transition-colors text-sm">
              首页
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/write" className="text-blue-400 hover:text-white transition-colors text-sm">
                  写文章
                </Link>
                <span className="text-gray-400 text-sm">{user.name}</span>
                <button
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                >
                  退出
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-blue-400 hover:text-white transition-colors text-sm">
                  登录
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          <button
            className="sm:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-2">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索文章..."
                className="flex-1 px-3 py-1.5 rounded-l-md bg-gray-800 text-white border border-gray-700 text-sm"
              />
              <button type="submit" className="px-3 py-1.5 bg-blue-600 rounded-r-md text-sm">
                搜索
              </button>
            </form>
            <Link to="/" className="block text-blue-400 hover:text-white text-sm py-1" onClick={() => setMenuOpen(false)}>
              首页
            </Link>
            {user ? (
              <>
                <Link to="/write" className="block text-blue-400 hover:text-white text-sm py-1" onClick={() => setMenuOpen(false)}>
                  写文章
                </Link>
                <button onClick={() => { onLogout(); setMenuOpen(false); }} className="block text-gray-400 hover:text-red-400 text-sm py-1">
                  退出 ({user.name})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-blue-400 hover:text-white text-sm py-1" onClick={() => setMenuOpen(false)}>
                  登录
                </Link>
                <Link to="/register" className="block text-blue-400 hover:text-white text-sm py-1" onClick={() => setMenuOpen(false)}>
                  注册
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
