import React from 'react';
import { useParams, Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../pages/footer';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory, categories } from '../data/products';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryProducts = getProductsByCategory(id || '');
  const category = categories.find(c => c.id === id);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <Navbar /> */}
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">{category?.name || id}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-4xl">{category?.icon}</span>
                {category?.name || id}
              </h1>
              <p className="text-muted-foreground mt-1">
                {categoryProducts.length} ads found
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Products Grid */}
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">{category?.icon || '📦'}</span>
              <h2 className="text-xl font-semibold text-foreground mb-2">No ads in this category</h2>
              <p className="text-muted-foreground mb-6">Be the first to post!</p>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 gradient-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Post an Ad
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;
