import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, MessageSquare, Search, Send } from 'lucide-react';
import { calculateReadingTime } from '../utils/readingTime';

export default function BlogPage({ posts, onAddComment }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePostId, setActivePostId] = useState(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) || null,
    [posts, activePostId]
  );

  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return posts
      .filter((p) => p.id !== activePost.id)
      .sort((a, b) => (a.category === activePost.category ? -1 : b.category === activePost.category ? 1 : 0))
      .slice(0, 2);
  }, [posts, activePost]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!activePost || !commentText.trim()) return;
    onAddComment(activePost.id, {
      id: `comment-${Date.now()}`,
      author: commentAuthor.trim() || 'Guest Reader',
      date: new Date().toISOString().slice(0, 10),
      text: commentText.trim(),
    });
    setCommentAuthor('');
    setCommentText('');
  };

  if (activePost) {
    return (
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setActivePostId(null)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Insights</span>
        </button>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-navy-900">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {activePost.category}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>{activePost.date}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{calculateReadingTime(activePost.content)}</span>
            </span>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
            {activePost.title}
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            By {activePost.author}
          </p>

          <div className="mt-8 space-y-4 border-t border-slate-100 pt-6 text-base leading-relaxed text-slate-700 dark:border-slate-800 dark:text-slate-300">
            {activePost.content.split('\n\n').map((para, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-1.5 border-t border-slate-100 pt-6 dark:border-slate-800">
            {(activePost.tags || []).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-navy-850 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Related Insights
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => setActivePostId(rel.id)}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-emerald-600 dark:border-slate-800 dark:bg-navy-900"
                >
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {rel.category} • {calculateReadingTime(rel.content)}
                  </div>
                  <div className="mt-1 text-sm font-bold text-navy-900 dark:text-white">
                    {rel.title}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Reader Discussion / Comments */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-navy-900">
          <div className="flex items-center gap-2 text-base font-bold text-navy-900 dark:text-white">
            <MessageSquare className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <span>Reader Perspectives ({(activePost.comments || []).length})</span>
          </div>

          <div className="mt-4 space-y-3">
            {(activePost.comments || []).length === 0 ? (
              <p className="text-xs text-slate-500">
                No comments yet. Share a perspective or question below.
              </p>
            ) : (
              activePost.comments.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-navy-950"
                >
                  <div className="flex justify-between text-xs font-bold text-navy-900 dark:text-white">
                    <span>{c.author}</span>
                    <span className="font-normal text-slate-400">{c.date}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-300">{c.text}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-5 space-y-3 border-t border-slate-100 pt-5 dark:border-slate-800">
            <input
              type="text"
              placeholder="Your Name & Title (optional)"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
            <textarea
              rows={2}
              required
              placeholder="Add a comment or analytical note..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-navy-950 dark:text-white"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 dark:bg-emerald-700"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Post Comment</span>
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            <BookOpen className="h-4 w-4" />
            <span>Executive Insights &amp; Commentary</span>
          </div>
          <h1 className="mt-1 font-serif text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">
            Finance, BI &amp; Sustainability Perspectives
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-60">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or tags..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-800 dark:bg-navy-900 dark:text-white"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-navy-900 text-white dark:bg-emerald-700'
                    : 'bg-white text-slate-700 border border-slate-200 dark:border-slate-800 dark:bg-navy-900 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActivePostId(post.id)}
            className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-600/50 hover:shadow-executive dark:border-slate-800 dark:bg-navy-900"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-emerald-50 px-3 py-0.5 font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{calculateReadingTime(post.content)}</span>
                </span>
              </div>

              <h2 className="mt-4 font-serif text-xl font-bold text-navy-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                {post.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
              <span className="text-slate-400">{post.date}</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
                <span>Read Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
