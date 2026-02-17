import React from 'react';
// import Navbar from '../components/Navbar';
import Footer from '../pages/footer';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { products } from '../data/products';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <Navbar /> */}
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-heart" />
            <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
            <span className="bg-heart text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {favorites.length}
            </span>
          </div>

          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">Start adding items to your favorites by clicking the heart icon</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
