
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ChatBotMessage from './ChatBotMessage';
import { toast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi there! I\'m your AI event planning assistant. How can I help you plan your perfect event today?',
    timestamp: new Date()
  }
];

const suggestedQueries = [
  "What kind of entertainment is best for a children's party?",
  "How much food should I order for 50 guests?",
  "What's the ideal timeline for a wedding reception?",
  "Recommend venues for a corporate event in Mumbai"
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Based on your requirements, I recommend considering a magician for entertainment. They're very popular and engaging for children's birthday parties.",
        "For a 50-person event, I'd recommend ordering food for 60 people (20% buffer). This ensures you won't run out, and leftovers can be packed for guests to take home.",
        "A typical wedding reception timeline is: Cocktail hour (1hr), Grand entrance (15min), Dinner (1.5hrs), First dance & speeches (45min), Cake cutting (15min), Open dancing (2hrs).",
        "Some popular corporate event venues in Mumbai include The Lalit, Grand Hyatt, and The St. Regis. Each offers different packages based on your specific needs."
      ];
      
      const randomIndex = Math.floor(Math.random() * botResponses.length);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: botResponses[randomIndex],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: "AI Assistant",
        description: "New message from your event planning assistant",
      });
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
    setIsMinimized(false);
  };

  return (
    <div className={cn(
      "fixed bottom-5 right-5 z-50 flex flex-col",
      "w-80 md:w-96 transition-all duration-300 ease-in-out",
      isOpen ? "h-[500px] max-h-[80vh]" : "h-14",
      "rounded-xl shadow-xl border border-purple-100 bg-white"
    )}>
      {/* Chat Header */}
      <div 
        className="flex items-center justify-between p-3 bg-gradient-to-r from-eventPurple-500 to-eventPink-500 text-white rounded-t-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          <h3 className="font-medium">Event Planning Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          {isOpen && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      {isOpen && (
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden",
          isMinimized ? "h-0" : "h-auto"
        )}>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatBotMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-left">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="px-4 py-2 max-w-[75%] bg-gray-100 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Queries */}
          <div className="px-4 py-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((query, index) => (
                <button
                  key={index}
                  className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
                  onClick={() => handleSuggestedQuery(query)}
                >
                  {query.length > 25 ? `${query.substring(0, 25)}...` : query}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="flex-1 border border-gray-200 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 bg-gray-50">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about events..."
                  className="w-full px-4 py-2 focus:outline-none bg-transparent"
                />
              </div>
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "rounded-full",
                  !inputValue.trim() && "opacity-70 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
