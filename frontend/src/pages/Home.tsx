import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Article } from '../types';
import { articleApi } from '../api';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const cateId = searchParams.get('cate_id') || '';

  useEffect(() => {
    setLoading(true);
    articleApi
      .list({
        page,
        page_size: 10,
        search: search || undefined,
        cate_id: cateId ? Number(cateId) : undefined,
      })
      .then((res) => {
        setArticles(res.data || []);
        setTotal(res.total);
      })
      .catch(() => {
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [page, search, cateId]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {search && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-gray-600">搜索：</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{search}</span>
          <Link to="/" className="text-gray-400 hover:text-red-500 text-sm ml-2">清除</Link>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-72 shrink-0 order-2 md:order-1">
          <Sidebar />
        </aside>

        <main className="flex-1 order-1 md:order-2">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <p>暂无文章</p>
            </div>
          ) : (
            <div className="space-y-1">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg p-5 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <Link to={`/article/${article.id}`} className="block">
                    <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h2>
                  </Link>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                    <span>{formatDate(article.created_at)}</span>
                    {article.category && (
                      <Link
                        to={`/?cate_id=${article.category.id}`}
                        className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {article.category.display_name}
                      </Link>
                    )}
                    {article.user && (
                      <span className="text-red-500 font-medium">{article.user.name}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {article.view_cnt}
                    </span>
                  </div>
                  {article.brief && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{article.brief}</p>
                  )}
                </article>
              ))}
            </div>
          )}

          <Pagination page={page} total={total} pageSize={10} onChange={handlePageChange} />
        </main>
      </div>
    </div>
  );
}
