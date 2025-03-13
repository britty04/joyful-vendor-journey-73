
import { useState } from 'react';
import { Bot, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const AIRecommendation = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // In a real app, this would send the question to an AI backend
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setQuestion('');
      // Navigate to AI guided booking page 
      navigate('/guided-booking');
    }, 1500);
  };

  const handleGuidedBooking = () => {
    navigate('/guided-booking');
  };

  const suggestions = [
    "Best magician for a 5-year-old's birthday?",
    "Affordable decorators in Mumbai?",
    "What games for a princess-themed party?",
    "Photographer who's good with kids?"
  ];

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white -z-10"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-eventBlue-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-eventPink-100 rounded-full opacity-30 blur-3xl -z-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-[15%] w-8 h-8 opacity-70 animate-float -z-10">
        <div className="w-full h-full bg-eventYellow-400 rounded-md rotate-12"></div>
      </div>
      <div className="absolute bottom-20 right-[10%] w-6 h-6 opacity-70 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-full h-full bg-eventPink-400 rounded-full"></div>
      </div>
      <div className="absolute top-1/2 right-[20%] w-5 h-5 opacity-70 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="w-full h-full bg-eventPurple-400 rounded-md rotate-45"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full relative">
              <Bot size={32} className="text-primary" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-eventYellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
              <Sparkles size={16} />
              <span>AI-Powered Recommendations</span>
            </div>
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900 mb-4">
              Need Help Planning Your Event?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI assistant can recommend the perfect vendors based on your specific requirements. 
              Just ask a question and get personalized suggestions instantly.
            </p>
          </div>

          {/* AI Query Input */}
          <div className="playful-card playful-shadow mb-8 p-3">
            <form onSubmit={handleSubmit} className="flex items-center p-2">
              <Bot size={20} className="text-gray-400 mx-3" />
              <input
                type="text"
                placeholder="Ask anything about planning your event..."
                className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className={`ml-2 rounded-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 transition-all duration-300 active:scale-95 flex items-center ${
                  isLoading || !question.trim() ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="mr-2">Thinking</span>
                    <span className="flex space-x-1">
                      <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:0.0s]"></span>
                      <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Zap size={16} className="mr-2" />
                    <span>Get Ideas</span>
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Guided Booking Button */}
          <div className="text-center mb-6">
            <Button 
              onClick={handleGuidedBooking}
              className="bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try Our AI-Guided Booking Experience
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Let our AI assistant guide you step-by-step through planning your perfect event
            </p>
          </div>

          {/* Suggested Queries */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Or try one of these questions:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-purple-100 hover:border-primary/30 hover:bg-purple-50 transition-colors"
                  onClick={() => setQuestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendation;
