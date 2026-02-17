import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  Bell,
  MessageCircle,
  Plus,
  Menu,
  MapPin,
  Globe,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

const Navbar: React.FC = () => {
  const [location, setLocation] = useState("India");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { user, isAuthenticated, signOut } = useAuth();
  const { favorites } = useFavorites();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    setShowMobileMenu(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Success", description: "Logged out successfully" });
      navigate("/");
      setShowMobileMenu(false);
    } catch {
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/">
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">NaaMads</div>

          </Link>

          {/* Location (Desktop) */}
          <div className="hidden md:flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4 text-primary" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer text-foreground"
            >
              <option value="India">India</option>
              <option value="Dubai Colony, Kalaburgi">Dubai Colony, Kalaburgi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          {/* Search (Desktop) */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full pl-4 pr-12 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Search className="w-5 h-5 text-primary" />
              </button>
            </div>
          </form>
          {/* Desktop Actions */}
           <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer text-foreground">
                <option>ENGLISH</option>
                <option>हिंदी</option>
              </select>
            </div>

            {isAuthenticated ? (
              <>
                <Link to="/favorites" className="relative p-2.5 hover:bg-muted rounded-full">
                  <Heart className="w-5 h-5" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>

                <Link to="/notifications" className="p-2.5 hover:bg-muted rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Link>

                <Link to="/chat" className="p-2.5 hover:bg-muted rounded-full relative">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {user?.userName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium">{user?.userName || user?.email?.split("@")[0]}</span>
                </Link>

                  <Link to="/sell" className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    <Plus className="w-5 h-5" /> SELL
                  </Link>

                <button onClick={handleSignOut} className="p-2.5 hover:bg-muted rounded-full">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground"
                >
                  Login
                </Link>
                <Link
                  to="/sell"
                  className="gradient-primary px-4 py-2.5 rounded-lg text-primary-foreground font-semibold flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> SELL
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 hover:bg-muted rounded-lg"
          >
            {showMobileMenu ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-input"
          />
        </form>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-card border-t border-border p-4 space-y-3">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-muted p-3 rounded-lg"
            >
              <option>India</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>

            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setShowMobileMenu(false)} className="block p-3 hover:bg-muted rounded-lg">
                  Profile
                </Link>
                <Link to="/favorites" onClick={() => setShowMobileMenu(false)} className="block p-3 hover:bg-muted rounded-lg">
                  Favorites ({favorites.length})
                </Link>
                <Link to="/sell" onClick={() => setShowMobileMenu(false)} className="block p-3 gradient-primary text-primary-foreground rounded-lg">
                  SELL
                </Link>
                <button onClick={handleSignOut} className="w-full p-3 text-destructive">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block p-3 text-center border-2 border-primary rounded-lg">
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
