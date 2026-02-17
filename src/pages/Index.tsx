import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CatergoriesGrid";
import ProductCard from "../components/ProductCard";
import { products, getFeaturedProducts } from "../data/products";
import { ChevronDown } from "lucide-react";

const Index: React.FC = () => {
  const [visibleProducts, setVisibleProducts] = useState(20);
  const featuredProducts = getFeaturedProducts();

  const loadMore = () => {
    setVisibleProducts(prev =>
      Math.min(prev + 12, products.length)
    );
  };

  return (
    <>
      <HeroBanner />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Ads</h2>
            <span className="text-sm text-muted-foreground">
              {featuredProducts.length} listings
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Fresh Recommendations
            </h2>
            <span className="text-sm text-muted-foreground">
              Showing {Math.min(visibleProducts, products.length)} of{" "}
              {products.length}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.slice(0, visibleProducts).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleProducts < products.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition"
              >
                Load More
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Index;
