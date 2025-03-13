
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category: 'event' | 'support';
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi there! I can help with event planning or customer support. How can I assist you today?',
    timestamp: new Date(),
    category: 'event'
  }
];

const suggestedQueries = {
  event: [
    "What kind of entertainment is best for a children's party?",
    "How much food should I order for 50 guests?",
    "What's the ideal timeline for a wedding reception?"
  ],
  support: [
    "How do I cancel my booking?",
    "Can I change my event date?",
    "How do I get a refund?",
    "I need help with my order"
  ]
};

const CustomerSupportChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'event' | 'support'>('event');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      category: activeCategory
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on the active category
    setTimeout(() => {
      const eventResponses = [
        "Based on your requirements, I recommend considering a magician for entertainment. They're very popular and engaging for children's birthday parties.",
        "For a 50-person event, I'd recommend ordering food for 60 people (20% buffer). This ensures you won't run out, and leftovers can be packed for guests to take home.",
        "A typical wedding reception timeline is: Cocktail hour (1hr), Grand entrance (15min), Dinner (1.5hrs), First dance & speeches (45min), Cake cutting (15min), Open dancing (2hrs)."
      ];
      
      const supportResponses = [
        "You can cancel your booking from your profile page. Go to 'Manage Bookings' and select the booking you want to cancel. Note that cancellation policies may apply.",
        "Yes, you can change your event date if the new date is available. Go to 'Manage Bookings' in your profile and select the 'Reschedule' option for your booking.",
        "Refunds are processed based on our cancellation policy. Please check the policy details on your booking confirmation. For special circumstances, please contact our customer service team.",
        "I'm sorry you're having trouble with your order. Could you please provide your order number so I can help you better?"
      ];
      
      const responses = activeCategory === 'event' ? eventResponses : supportResponses;
      const randomIndex = Math.floor(Math.random() * responses.length);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responses[randomIndex],
        timestamp: new Date(),
        category: activeCategory
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: activeCategory === 'event' ? "AI Event Assistant" : "Customer Support",
        description: "New message from your assistant",
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

  const switchCategory = (category: 'event' | 'support') => {
    setActiveCategory(category);
  };

  return (
    <div className={cn(
      "fixed bottom-5 right-5 z-50 flex flex-col",
      "w-72 md:w-80 transition-all duration-300 ease-in-out",
      isOpen ? "h-[450px] max-h-[80vh]" : "h-14",
      "rounded-xl shadow-xl border border-purple-100 bg-white"
    )}>
      {/* Chat Header */}
      <div 
        className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {activeCategory === 'event' ? (
            <Bot className="mr-2 h-5 w-5" />
          ) : (
            <HelpCircle className="mr-2 h-5 w-5" />
          )}
          <h3 className="font-medium text-sm">
            {activeCategory === 'event' ? 'Event Planning Assistant' : 'Customer Support'}
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          {isOpen && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7 text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
            >
              {isMinimized ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-white hover:bg-white/20 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      {isOpen && (
        <div className={cn(
          "flex-1 flex flex-col overflow-hidden",
          isMinimized ? "h-0" : "h-auto"
        )}>
          {/* Category Toggle */}
          <div className="flex border-b border-gray-100">
            <button
              className={cn(
                "flex-1 py-2 text-sm font-medium",
                activeCategory === 'event' 
                  ? "text-purple-600 border-b-2 border-purple-500" 
                  : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => switchCategory('event')}
            >
              <Bot className="h-4 w-4 inline mr-1" />
              Event Planning
            </button>
            <button
              className={cn(
                "flex-1 py-2 text-sm font-medium",
                activeCategory === 'support' 
                  ? "text-purple-600 border-b-2 border-purple-500" 
                  : "text-gray-500 hover:text-gray-700"
              )}
              onClick={() => switchCategory('support')}
            >
              <HelpCircle className="h-4 w-4 inline mr-1" />
              Support
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "flex items-start space-x-2",
                  message.role === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row"
                )}
              >
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    message.role === 'user' 
                      ? "bg-primary" 
                      : "bg-gray-100"
                  )}
                >
                  {message.role === 'user' ? (
                    <span className="text-[10px] text-white">You</span>
                  ) : (
                    <Bot className="h-3 w-3 text-primary" />
                  )}
                </div>
                
                <div 
                  className={cn(
                    "px-3 py-2 max-w-[75%] rounded-xl text-sm",
                    message.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  )}
                >
                  <p className="text-xs">{message.content}</p>
                  <span className="block text-[8px] opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-center space-x-2 text-left">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
                <div className="px-3 py-2 max-w-[75%] bg-gray-100 rounded-xl rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Queries */}
          <div className="px-3 py-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Suggested questions:</p>
            <div className="flex flex-wrap gap-1">
              {suggestedQueries[activeCategory].map((query, index) => (
                <button
                  key={index}
                  className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors"
                  onClick={() => handleSuggestedQuery(query)}
                >
                  {query.length > 20 ? `${query.substring(0, 20)}...` : query}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="flex-1 border border-gray-200 rounded-full overflow-hidden focus-within:ring-1 focus-within:ring-primary/50 bg-gray-50">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={activeCategory === 'event' ? "Ask about event planning..." : "Ask for support..."}
                  className="w-full px-3 py-1.5 text-sm focus:outline-none bg-transparent"
                />
              </div>
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={cn(
                  "rounded-full h-8 w-8",
                  !inputValue.trim() && "opacity-70 cursor-not-allowed"
                )}
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupportChat;
