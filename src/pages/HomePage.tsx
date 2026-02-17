import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Smartphone,
  Home,
  Shirt,
  Gamepad2,
  Book,
  ArrowRight,
  TrendingUp,
  Shield,
  Users,
  MapPin,
  Heart,
} from "lucide-react";
import data from "../data/homepage.json";
import CategoryGrid from "@/components/CatergoriesGrid";

const HomePage: React.FC = () => {
  const { categories, features, recentListings } = data;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Find Everything You Need
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            India's most trusted marketplace for buying and selling
          </p>
          <Link
            to="/sell"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Start Selling Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const Icon = iconsMap[cat.icon as keyof typeof iconsMap];
              return (
                <Link
                  key={i}
                  to={`/category/${cat.name.toLowerCase()}`}
                  className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 ${cat.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} ads</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section> */}
      <CategoryGrid />

      {/* Recent Listings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Recent Listings</h2>
            <Link
              to="/listings"
              className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentListings.map((item) => (
              <div
                key={item.id}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                  <p className="text-lg font-bold text-primary mb-2">{item.price}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose NaaMads?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = iconsMap[f.icon as keyof typeof iconsMap];
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

const iconsMap = {
  Car,
  Smartphone,
  Home,
  Shirt,
  Gamepad2,
  Book,
  TrendingUp,
  Shield,
  Users,
};

export default HomePage;
