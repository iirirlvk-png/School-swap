import React, { useState, useEffect } from 'react';
import { Theme, User, Post, Conversation, Message } from './types';
import { THEMES, MOCK_USERS, MOCK_POSTS, MOCK_CONVERSATIONS } from './constants';
import Header from './components/Header';
import Onboarding from './components/Onboarding';
import Feed from './components/Feed';
import Search from './components/Search';
import Upload from './components/Upload';
import Messaging from './components/Messaging';
import Profile from './components/Profile';

export type View = 'feed' | 'search' | 'upload' | 'messages' | 'profile';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [currentView, setCurrentView] = useState<View>('feed');
  const [interestedPostIds, setInterestedPostIds] = useState<string[]>([]);

  useEffect(() => {
    // This effect ensures the body background matches the theme
    document.body.className = `${currentTheme.background} bg-gradient-to-br ${currentTheme.gradientFrom} ${currentTheme.gradientTo} ${currentTheme.textPrimary}`;
  }, [currentTheme]);

  const handleOnboardingComplete = (offers: string[]) => {
    setCurrentUser(prev => ({ ...prev, offers }));
    setIsOnboarded(true);
  };
  
  const handleSendMessage = (text: string, conversationId: string) => {
    setConversations(prevConversations =>
      prevConversations.map(convo => {
        if (convo.id === conversationId) {
          const newMessage: Message = {
            id: `m${Date.now()}`,
            senderId: currentUser.id,
            text,
            timestamp: 'Just now',
          };
          return { ...convo, messages: [...convo.messages, newMessage] };
        }
        return convo;
      })
    );
  };

  const handleInterestClick = (postId: string) => {
      setInterestedPostIds(prev => {
        if (prev.includes(postId)) {
          return prev;
        }
        console.log(`Registered interest for post ${postId}. This can be used to improve recommendations.`);
        return [...prev, postId];
      });
    };

  const renderView = () => {
    const feedComponent = (
        <Feed
            posts={posts}
            theme={currentTheme}
            onInterestClick={handleInterestClick}
            interestedPostIds={interestedPostIds}
        />
    );
    switch (currentView) {
      case 'feed':
        return feedComponent;
      case 'search':
        return <Search theme={currentTheme} />;
      case 'upload':
        return <Upload theme={currentTheme} />;
      case 'messages':
        return <Messaging conversations={conversations} currentUser={currentUser} theme={currentTheme} onSendMessage={handleSendMessage} />;
      case 'profile':
        return <Profile user={currentUser} posts={posts} theme={currentTheme} />;
      default:
        return feedComponent;
    }
  };

  if (!isOnboarded) {
    return (
      <Onboarding 
        onComplete={handleOnboardingComplete} 
        theme={currentTheme} 
        themes={THEMES}
        setCurrentTheme={setCurrentTheme} 
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
      <main className="md:pl-20 lg:pl-64 pt-8 pb-28 md:pb-8 px-4 sm:px-6 lg:px-8">
        {renderView()}
      </main>
    </div>
  );
}

export default App;