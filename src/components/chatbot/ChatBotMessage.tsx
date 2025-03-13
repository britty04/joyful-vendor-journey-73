
import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from './ChatBot';

interface ChatBotMessageProps {
  message: Message;
}

const ChatBotMessage: React.FC<ChatBotMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex items-start space-x-2",
      isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-primary" : "bg-primary/10"
      )}>
        {isUser ? (
          <span className="text-sm text-white">You</span>
        ) : (
          <Bot className="h-4 w-4 text-primary" />
        )}
      </div>
      
      <div className={cn(
        "px-4 py-2 max-w-[75%] rounded-2xl",
        isUser 
          ? "bg-primary text-white rounded-tr-none"
          : "bg-gray-100 text-gray-800 rounded-tl-none"
      )}>
        <p className="text-sm">{message.content}</p>
        <span className="block text-[10px] opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatBotMessage;
