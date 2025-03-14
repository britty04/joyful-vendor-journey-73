
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, LifeBuoy, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-6xl font-bold text-eventPurple-500 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="space-y-3">
          <Link 
            to="/" 
            className="flex items-center justify-center px-6 py-3 bg-eventPurple-500 text-white rounded-md hover:bg-eventPurple-600 transition-colors w-full"
          >
            <Home className="mr-2 h-4 w-4" /> Return to Home
          </Link>
          
          <Link 
            to="/vendors" 
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors w-full"
          >
            <Search className="mr-2 h-4 w-4" /> Browse Vendors
          </Link>
          
          <Link 
            to="/support/tickets" 
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors w-full"
          >
            <LifeBuoy className="mr-2 h-4 w-4" /> Contact Support
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
