
import { useState } from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';

const AIRecommendation = () => {
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
      // Show a toast or redirect to results
    }, 1500);
  };

  const suggestions = [
    "Best magician for a 5-year-old's birthday?",
    "Affordable decorators in Mumbai?",
    "What games for a princess-themed party?",
    "Photographer who's good with kids?"
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-50 to-transparent"></div>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Bot size={28} className="text-primary" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
              <Sparkles size={16} />
              <span>AI-Powered Recommendations</span>
            </div>
            <h2 className="font-bold text-gray-900 mb-4">
              Need Help Planning Your Event?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI assistant can recommend the perfect vendors based on your specific requirements. 
              Just ask a question and get personalized suggestions instantly.
            </p>
          </div>

          {/* AI Query Input */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg mb-8">
            <form onSubmit={handleSubmit} className="flex items-center p-2">
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
                className={`ml-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 transition-all duration-300 active:scale-95 flex items-center ${
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
                    <span className="mr-2">Get Ideas</span>
                    <ArrowRight size={16} />
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Suggested Queries */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Or try one of these questions:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-200 hover:border-primary/30 hover:bg-gray-50 transition-colors"
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
