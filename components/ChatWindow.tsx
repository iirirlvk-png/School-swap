import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Theme, User, Post } from '../types';
import { GREETINGS } from '../constants';
import KnotIcon from './icons/KnotIcon';
import SendIcon from './icons/SendIcon';

interface ChatWindowProps {
    conversation: Conversation | null;
    currentUser: User;
    theme: Theme;
    onSendMessage: (text: string, conversationId: string) => void;
    chatContextPost?: Post | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser, theme, onSendMessage, chatContextPost }) => {
    const [newMessage, setNewMessage] = useState('');
    const [placeholder, setPlaceholder] = useState(GREETINGS[0]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If there's a post context, set a specific placeholder and don't cycle.
        if (chatContextPost) {
            setPlaceholder(`Ask about '${chatContextPost.title}'...`);
            return;
        }

        // If no context, cycle through greetings.
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * GREETINGS.length);
            setPlaceholder(GREETINGS[randomIndex]);
        }, 3000); // Change every 3 seconds

        // Cleanup interval on component unmount or when context changes.
        return () => clearInterval(intervalId);
    }, [chatContextPost]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages]);

    const handleSend = () => {
        if (newMessage.trim() && conversation) {
            onSendMessage(newMessage.trim(), conversation.id);
            setNewMessage('');
        }
    };

    if (!conversation) {
        return (
            <div className={`flex-1 flex items-center justify-center h-full ${theme.textSecondary}`}>
                <div className="text-center">
                    <KnotIcon className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Select a conversation</h3>
                    <p>Start chatting with your schoolmates.</p>
                </div>
            </div>
        );
    }
    
    const { participants, messages } = conversation;
    const otherUser = participants.find(p => p.id !== currentUser.id);

    return (
        <div className={`flex-1 flex flex-col h-full ${theme.secondary}`}>
            {/* Chat Header */}
            <div className={`flex items-center p-4 border-b border-white/10 ${theme.cardBg}`}>
                {otherUser && (
                    <>
                        <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-10 h-10 rounded-full mr-4" />
                        <div>
                            <p className={`font-semibold ${theme.textPrimary}`}>{otherUser.name}</p>
                            <p className={`text-sm ${theme.textSecondary}`}>{otherUser.school}</p>
                        </div>
                    </>
                )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                    const isCurrentUser = msg.senderId === currentUser.id;
                    return (
                        <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                isCurrentUser
                                    ? `${theme.accent} ${theme.buttonText} rounded-br-lg`
                                    : `${theme.cardBg} ${theme.textPrimary} rounded-bl-lg`
                            }`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 text-right opacity-70`}>{msg.timestamp}</p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className={`p-4 mt-auto border-t border-white/10 ${theme.cardBg}`}>
                <div className="relative flex items-center">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder={placeholder}
                        rows={1}
                        className={`w-full px-4 py-3 pr-14 text-base resize-none rounded-full border-none focus:ring-2 focus:${theme.accent.replace('bg-', 'ring-')} ${theme.secondary} ${theme.textPrimary} placeholder:${theme.textSecondary}`}
                    ></textarea>
                     <button
                        onClick={handleSend}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors duration-200 ${newMessage.trim() ? `${theme.accent} ${theme.buttonText}` : `${theme.textSecondary}`}`}
                        aria-label="Send message"
                        disabled={!newMessage.trim()}
                    >
                        {/* FIX: Replaced KnotIcon with SendIcon for better UX. */}
                        <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
