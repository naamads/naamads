import React from 'react';
import { Search, TrendingUp, Shield, Zap } from 'lucide-react';

const HeroBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-background py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Buy & Sell Anything <br className="hidden sm:block" />
            <span className="text-secondary">Near You</span>
          </h1>
          <p className="text-lg opacity-90 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8 max-w-xl mx-auto">
            India's largest marketplace. Find great deals on cars, mobiles, electronics, and more!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent md:text-3xl font-bold">50K+</div>
              <div className="text-xs bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent  md:text-sm opacity-80">Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent md:text-3xl font-bold">10L+</div>
              <div className="text-xs bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent  md:text-sm opacity-80">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent md:text-3xl font-bold">500+</div>
              <div className="text-xs bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent  md:text-sm opacity-80">Cities</div>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Safe & Secure</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4" />
              <span className="text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Quick & Easy</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4  " />
              <span className="text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Best Prices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
