import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating(true);
    toggleFavorite(product.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(1)}K`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="bg-card rounded-xl overflow-hidden card-hover border border-border/50">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-2 left-2 gradient-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-semibold shadow-md">
              FEATURED
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 bg-card/90 backdrop-blur-sm rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
              isAnimating ? 'animate-heart' : ''
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite(product.id)
                  ? 'fill-heart text-heart'
                  : 'text-muted-foreground hover:text-heart'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="text-xl font-bold text-foreground mb-1">
            {formatPrice(product.price)}
          </div>

          {/* Title */}
          <h3 className="text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Location & Date */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{product.location}</span>
            </div>
            <span>{product.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
