import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../types';
import { articleApi, categoryApi } from '../api';

export default function WriteArticle() {
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [content, setContent] = useState('');
  const [cateId, setCateId] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    categoryApi.list().then(setCategories).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!cateId) {
      setError('请选择文章分类');
      return;
    }

    setLoading(true);
    try {
      const article = await articleApi.create({ cate_id: cateId, title, brief, content });
      navigate(`/article/${article.id}`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error;
      setError(msg || '发布失败，请重试');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">写文章</h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="请输入文章标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select
              value={cateId}
              onChange={(e) => setCateId(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            >
              <option value={0}>请选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.display_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
              placeholder="请输入文章摘要"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={15}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-sm font-mono"
              placeholder="支持 HTML 内容"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? '发布中...' : '发布文章'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
