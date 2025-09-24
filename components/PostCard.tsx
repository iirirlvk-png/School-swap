import React from 'react';
import { Post, Theme, PostStatus } from '../types';

interface PostCardProps {
  post: Post;
  theme: Theme;
  onInterestClick: (postId: string) => void;
  isInterested: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, theme, onInterestClick, isInterested }) => {
  const { author, title, description, category, imageUrl, status, timestamp } = post;

  const getStatusChip = () => {
    switch (status) {
      case PostStatus.AVAILABLE:
        return <span className="text-xs font-bold px-2 py-1 rounded-full bg-sky-500/20 text-sky-300">{status}</span>;
      case PostStatus.COMPLETED:
        return <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-300">{status}</span>;
      case PostStatus.UNAVAILABLE:
        return <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-500/20 text-red-400">{status}</span>;
      default:
        return null;
    }
  };

  return (
    <article className={`p-5 rounded-2xl shadow-lg transition-all duration-300 ${theme.cardBg} border border-white/10 hover:border-white/20`}>
      <header className="flex items-center mb-4">
        <img src={author.avatarUrl} alt={author.name} className="w-12 h-12 rounded-full mr-4 border-2 border-white/20" />
        <div>
          <p className="font-bold text-lg">{author.name}</p>
          <p className={`text-sm ${theme.textSecondary}`}>{author.school}</p>
        </div>
        <div className="ml-auto text-right">
          {getStatusChip()}
          <p className={`text-xs mt-1 ${theme.textSecondary}`}>{timestamp}</p>
        </div>
      </header>
      
      {imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className={`${theme.textSecondary}`}>{description}</p>
      </div>

      <footer className="mt-4 flex items-center justify-between pt-4 border-t border-white/10">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${theme.secondary}`}>{category}</span>
        {isInterested ? (
            <button disabled className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-not-allowed ${theme.textSecondary}`}>
                Interest Registered
            </button>
        ) : (
            <button
                onClick={() => onInterestClick(post.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 border-2 border-transparent hover:border-white/20 hover:${theme.secondary} ${theme.textPrimary}`}
            >
                <span className="font-bold tracking-wider">
                    <span className="opacity-60">IN</span>tErEST<span className="opacity-60">Ed</span>
                </span>
            </button>
        )}
      </footer>
    </article>
  );
};

export default PostCard;