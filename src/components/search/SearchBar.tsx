
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  animatePlaceholder?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search...", 
  onSearch,
  className = "",
  animatePlaceholder = false
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // For animated placeholder effect
  const [displayPlaceholder, setDisplayPlaceholder] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const placeholders = [
    "Find a birthday magician...",
    "Search for wedding photographers...",
    "Looking for a cake baker...",
    "Need a DJ for your party..."
  ];

  // Animated placeholder effect
  useEffect(() => {
    if (!animatePlaceholder) {
      setDisplayPlaceholder(placeholder);
      return;
    }
    
    const currentText = placeholders[currentPlaceholderIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayPlaceholder(currentText.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
        
        if (currentCharIndex === currentText.length) {
          // Wait a bit at the end of the text before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayPlaceholder(currentText.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
        
        if (currentCharIndex === 0) {
          setIsDeleting(false);
          setCurrentPlaceholderIndex((currentPlaceholderIndex + 1) % placeholders.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentPlaceholderIndex, isDeleting, placeholder, animatePlaceholder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        // Default behavior: navigate to vendors page with search query
        navigate(`/vendors?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`bg-white rounded-xl shadow-lg p-2 flex items-center playful-shadow ${className}`}
    >
      <div className="bg-eventPurple-100 p-3 rounded-lg text-eventPurple-600 mx-2">
        <Search className="w-5 h-5" />
      </div>
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={displayPlaceholder}
        className="flex-1 py-3 px-4 bg-transparent border-none focus:outline-none text-gray-700"
      />
      <Button 
        type="submit" 
        size="lg" 
        className="bg-eventPurple-600 hover:bg-eventPurple-700 text-white rounded-lg shadow-md ml-2"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
