import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as HotToast } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

// Layout Components
import Navbar from "./components/Navbar";
import CategoryDropdown from "./components/CategoryDropdown";
import Footer from "./pages/footer";

// Pages
import Index from "./pages/Index";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notification";
import Chat from "./pages/Chat";
import Sell from "./components/Sell";
import Category from "./pages/Caterogry";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* 🔔 Toast Providers */}
        <Toaster />
        <Sonner />
        <HotToast position="top-right" />

        <AuthProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen bg-background">
                
                {/* 🧭 Header */}
                <Navbar />
                <CategoryDropdown />

                {/* 📄 Main Content */}
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/sell" element={<Sell />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                {/* 🦶 Footer */}
                {/* <Footer /> */}
              </div>
            </BrowserRouter>
          </FavoritesProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
