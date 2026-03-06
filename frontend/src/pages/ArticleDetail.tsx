import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Article, Comment, User } from '../types';
import { articleApi, commentApi, voteApi } from '../api';
import Sidebar from '../components/Sidebar';

interface ArticleDetailProps {
  user: User | null;
}

export default function ArticleDetail({ user }: ArticleDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [voteCnt, setVoteCnt] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const articleId = Number(id);

    setLoading(true);
    Promise.all([
      articleApi.show(articleId),
      commentApi.list(articleId),
      voteApi.status(articleId),
    ])
      .then(([art, cmts, voteStatus]) => {
        setArticle(art);
        setComments(cmts || []);
        setVoted(voteStatus.voted);
        setVoteCnt(art.vote_cnt);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleVote = async () => {
    if (!user || !id) return;
    try {
      const res = await voteApi.toggle(Number(id));
      setVoted(res.voted);
      setVoteCnt(res.vote_cnt);
    } catch {}
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !id || submitting) return;

    setSubmitting(true);
    try {
      const comment = await commentApi.create(Number(id), { content: commentText });
      setComments([comment, ...comments]);
      setCommentText('');
    } catch {}
    setSubmitting(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-500">
        <p className="text-lg">文章不存在</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-72 shrink-0 order-2 md:order-1">
          <Sidebar />
        </aside>

        <main className="flex-1 order-1 md:order-2">
          <nav className="text-sm text-gray-500 mb-4 border-b border-blue-600 pb-2">
            <Link to="/" className="text-blue-600 hover:underline">首页</Link>
            <span className="mx-2">&gt;&gt;</span>
            <span className="text-gray-700">{article.title}</span>
          </nav>

          <article className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-3">{article.title}</h1>

            <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
              <span>{formatDate(article.created_at)}</span>
              {article.category && (
                <Link to={`/?cate_id=${article.category.id}`} className="text-blue-600 hover:underline">
                  {article.category.display_name}
                </Link>
              )}
              {article.user && (
                <span>作者：<span className="text-red-500 font-medium">{article.user.name}</span></span>
              )}
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {article.view_cnt}
              </span>
            </div>

            <div
              className="article-content prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100">
              <button
                onClick={handleVote}
                disabled={!user}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  voted
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={user ? '' : '请先登录'}
              >
                <svg className="w-5 h-5" fill={voted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {voteCnt}
              </button>
              <span className="text-sm text-gray-500">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                {comments.length} 评论
              </span>
            </div>
          </article>

          <section className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">评论</h3>

            {user ? (
              <form onSubmit={handleComment} className="mb-6">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写下你的评论..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!commentText.trim() || submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? '提交中...' : '发表评论'}
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-gray-500 mb-4">
                <Link to="/login" className="text-blue-600 hover:underline">登录</Link> 后即可发表评论
              </p>
            )}

            {comments.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">暂无评论</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                        {comment.user?.name?.charAt(0) || '?'}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{comment.user?.name || '匿名'}</span>
                      <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-gray-700 text-sm pl-10">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
