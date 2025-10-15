import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToast } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import CategoryDropdown from "./components/CategoryDropdown";
import Sell from "./components/Sell";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import Footer from "./pages/footer"; // ✅ import Footer

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HotToast position="top-right" />
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-background">
            {/* Navbar + Category Dropdown */}
            <Navbar />
            <CategoryDropdown />

            {/* Main Content */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/sell" element={<Sell />} />
                <Route
                  path="/search"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <h1 className="text-2xl font-semibold text-muted-foreground">
                        Search Results - Coming Soon
                      </h1>
                    </div>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer always fixed at bottom */}
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
