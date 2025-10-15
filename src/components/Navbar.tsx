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
import { toast } from "react-hot-toast";

const Navbar: React.FC = () => {
  const [location, setLocation] = useState("India");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
      setShowMobileMenu(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast(`Searching for: ${searchQuery}`);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">
              NaaMads
            </div>
          </Link>

          {/* Location - Desktop */}
          <div className="hidden md:flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="India">India</option>
              <option value="Dubai Colony, Kalaburgi">Dubai Colony, Kalaburgi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find Cars, Mobile Phones and more..."
                className="w-full pl-4 pr-12 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md transition-colors"
              >
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer">
                <option>ENGLISH</option>
                <option>हिंदी</option>
              </select>
            </div>

            {isAuthenticated ? (
              <>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </button>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:bg-muted px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {user?.userName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium">{user?.userName || user?.email?.split("@")[0]}</span>
                </Link>
                <Link
                  to="/sell"
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-5 h-5" />
                  <span>SELL</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Cars, Mobile Phones..."
              className="w-full pl-4 pr-12 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none text-sm font-medium focus:outline-none flex-1"
                >
                  <option value="India">India</option>
                  <option value="Dubai Colony, Kalaburgi">Dubai Colony, Kalaburgi</option>
                </select>
              </div>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {user?.userName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span className="font-medium">Profile</span>
                  </Link>
                  <Link
                    to="/sell"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-3 rounded-lg font-semibold"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Plus className="w-5 h-5" />
                    <span>SELL</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors text-destructive"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
