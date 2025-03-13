
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import VendorList from "./pages/VendorList";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import VendorDashboard from "./pages/VendorDashboard";
import VendorOnboarding from "./pages/VendorOnboarding";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import AIGuidedBookingPage from "./pages/AIGuidedBookingPage";
import TicketingEventsPage from "./pages/TicketingEventsPage";
import Checkout from "./pages/Checkout";
import BookingSuccess from "./pages/BookingSuccess";
import ServicesDemo from "./pages/ServicesDemo";
import SearchPage from "./pages/SearchPage";
import MonetizationDemo from "./pages/MonetizationDemo";
import ScalabilityDemo from "./pages/ScalabilityDemo";
import CustomerSupport from "./pages/CustomerSupport";
import SupportTickets from "./pages/SupportTickets";
import ChatBot from "./components/chatbot/ChatBot";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <div className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white via-purple-50/30 to-white opacity-60"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-eventPurple-200 rounded-full opacity-20 blur-3xl animate-float" style={{animationDuration: '15s'}}></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-eventPink-200 rounded-full opacity-20 blur-3xl animate-float" style={{animationDuration: '20s', animationDelay: '2s'}}></div>
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-eventYellow-200 rounded-full opacity-15 blur-3xl animate-float" style={{animationDuration: '18s', animationDelay: '5s'}}></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-eventBlue-200 rounded-full opacity-15 blur-3xl animate-float" style={{animationDuration: '25s', animationDelay: '3s'}}></div>
            <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-green-200 rounded-full opacity-10 blur-3xl animate-float" style={{animationDuration: '22s', animationDelay: '8s'}}></div>
            <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80"></div>
          </div>
          
          <Toaster />
          <Sonner 
            theme="light"
            position="top-right"
            toastOptions={{
              style: {
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px -15px rgba(153,102,255,0.25)',
              },
              className: "animate-slide-down"
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vendors" element={<SearchPage />} />
              <Route path="/vendors/list" element={<VendorList />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
              <Route path="/vendor/onboarding" element={<VendorOnboarding />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/guided-booking" element={<AIGuidedBookingPage />} />
              <Route path="/events" element={<TicketingEventsPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/booking/success" element={<BookingSuccess />} />
              <Route path="/services" element={<ServicesDemo />} />
              <Route path="/monetization" element={<MonetizationDemo />} />
              <Route path="/scalability" element={<ScalabilityDemo />} />
              <Route path="/support" element={<CustomerSupport />} />
              <Route path="/support/tickets" element={<SupportTickets />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <ChatBot />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
