import React, { useState } from 'react';
import { Post, Theme, PostStatus } from '../types';
import PostCard from './PostCard';

interface FeedProps {
  posts: Post[];
  theme: Theme;
  onInterestClick: (postId: string) => void;
  interestedPostIds: string[];
}

const Feed: React.FC<FeedProps> = ({ posts, theme, onInterestClick, interestedPostIds }) => {
  const [filter, setFilter] = useState<'all' | 'available' | 'completed'>('all');

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'available') return post.status === PostStatus.AVAILABLE;
    if (filter === 'completed') return post.status === PostStatus.COMPLETED;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Recent Activity</h2>
        <div className={`p-1 rounded-lg flex space-x-1 ${theme.secondary}`}>
          <button onClick={() => setFilter('all')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${filter === 'all' ? `${theme.primary} ${theme.buttonText}` : ''}`}>All</button>
          <button onClick={() => setFilter('available')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${filter === 'available' ? `${theme.primary} ${theme.buttonText}` : ''}`}>Available</button>
          <button onClick={() => setFilter('completed')} className={`px-3 py-1 text-sm font-semibold rounded-md transition ${filter === 'completed' ? `${theme.primary} ${theme.buttonText}` : ''}`}>Completed</button>
        </div>
      </div>
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            theme={theme}
            onInterestClick={onInterestClick}
            isInterested={interestedPostIds.includes(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;