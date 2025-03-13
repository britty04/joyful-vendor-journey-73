
import React from 'react';
import CustomerSupportChat from '../customer/CustomerSupportChat';

// Export the Message interface so it can be imported by ChatBotMessage
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'event' | 'support';
}

const ChatBot = () => {
  return <CustomerSupportChat />;
};

export default ChatBot;
