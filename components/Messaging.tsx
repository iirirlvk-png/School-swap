import React, { useState, useEffect } from 'react';
import { Conversation, Theme, User, Post } from '../types';
import ChatWindow from './ChatWindow';

interface MessagingProps {
  conversations: Conversation[];
  currentUser: User;
  theme: Theme;
  onSendMessage: (text: string, conversationId: string) => void;
  initialPostContext?: Post | null;
}

const Messaging: React.FC<MessagingProps> = ({ conversations, currentUser, theme, onSendMessage, initialPostContext }) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  useEffect(() => {
    // If there are conversations, select the first one by default.
    if (conversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;

  return (
    <div className={`flex h-[calc(100vh-100px)] rounded-2xl overflow-hidden shadow-2xl ${theme.cardBg} border border-white/10`}>
      {/* Conversation List Sidebar */}
      <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-white/10 ${theme.secondary} ${selectedConversationId ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-bold">Chats</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          {conversations.map(convo => {
            const otherUser = convo.participants.find(p => p.id !== currentUser.id);
            const lastMessage = convo.messages[convo.messages.length - 1];
            if (!otherUser) return null;

            return (
              <button
                key={convo.id}
                onClick={() => setSelectedConversationId(convo.id)}
                className={`w-full text-left flex items-center p-4 transition-colors duration-200 hover:${theme.primary} hover:${theme.buttonText} ${selectedConversationId === convo.id ? `${theme.primary} ${theme.buttonText}` : ''}`}
              >
                <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-12 h-12 rounded-full mr-4" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold truncate">{otherUser.name}</p>
                  <p className={`text-sm truncate ${selectedConversationId === convo.id ? 'opacity-90' : theme.textSecondary}`}>
                    {lastMessage.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Chat Window */}
      <div className={`flex-1 ${!selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
        <ChatWindow
          conversation={selectedConversation}
          currentUser={currentUser}
          theme={theme}
          onSendMessage={onSendMessage}
          chatContextPost={initialPostContext}
        />
      </div>
    </div>
  );
};

export default Messaging;
