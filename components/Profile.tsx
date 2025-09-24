import React, { useState } from 'react';
import { User, Post, Theme, PostStatus } from '../types';

interface ProfileProps {
    user: User;
    posts: Post[];
    theme: Theme;
}

const Profile: React.FC<ProfileProps> = ({ user, posts, theme }) => {
    const [activeTab, setActiveTab] = useState<'offers' | 'archived'>('offers');

    const userPosts = posts.filter(p => p.author.id === user.id);
    const activeOffers = userPosts.filter(p => p.status !== PostStatus.COMPLETED);
    const archivedTrades = userPosts.filter(p => p.status === PostStatus.COMPLETED);
    
    const renderPostList = (postList: Post[]) => (
        <div className="space-y-4">
            {postList.length > 0 ? (
                postList.map(post => (
                    <div key={post.id} className={`p-4 rounded-xl flex items-center justify-between ${theme.secondary}`}>
                        <div>
                            <p className="font-semibold">{post.title}</p>
                            <p className={`text-sm ${theme.textSecondary}`}>{post.category}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            post.status === PostStatus.COMPLETED ? 'bg-green-500/20 text-green-300' : 'bg-sky-500/20 text-sky-300'
                        }`}>
                            {post.status}
                        </span>
                    </div>
                ))
            ) : (
                <p className={`text-center py-8 ${theme.textSecondary}`}>No items to show here.</p>
            )}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto">
            <div className="relative mb-8 text-center">
                 <div className={`pt-20 p-8 mt-16 rounded-3xl shadow-lg border border-white/10 ${theme.cardBg}`}>
                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <p className={`text-md ${theme.textSecondary}`}>{user.school}</p>
                    <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${theme.secondary}`}>
                        <span className={`mr-2 text-lg ${theme.accent.replace('bg-','text-')}`}>&#10003;</span>
                        {user.transactionCount} Completed Trades
                    </div>
                </div>
                 <img src={user.avatarUrl} alt={user.name} className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg" />
            </div>

            <div>
                <div className="flex border-b border-white/10 mb-6">
                    <button
                        onClick={() => setActiveTab('offers')}
                        className={`px-4 py-2 font-semibold transition-all duration-300 ${activeTab === 'offers' ? `${theme.textPrimary} border-b-2 ${theme.accent.replace('bg-','border-')}` : theme.textSecondary}`}
                    >
                        My Offers ({activeOffers.length})
                    </button>
                     <button
                        onClick={() => setActiveTab('archived')}
                        className={`px-4 py-2 font-semibold transition-all duration-300 ${activeTab === 'archived' ? `${theme.textPrimary} border-b-2 ${theme.accent.replace('bg-','border-')}` : theme.textSecondary}`}
                    >
                        Archived Trades ({archivedTrades.length})
                    </button>
                </div>

                <div>
                    {activeTab === 'offers' ? renderPostList(activeOffers) : renderPostList(archivedTrades)}
                </div>
            </div>
        </div>
    );
};

export default Profile;