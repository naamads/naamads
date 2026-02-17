import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../pages/footer';
import { getProductById, products } from '../data/products';
import { useFavorites } from '../contexts/FavoritesContext';
import ProductCard from '../components/ProductCard';
import { Heart, MapPin, Calendar, Share2, Flag, Phone, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showPhone, setShowPhone] = useState(false);

  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <Link to="/" className="text-primary hover:underline">Go back home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
   
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Image & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4 gradient-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-semibold">
                      FEATURED
                    </div>
                  )}
                </div>
              </div>

              {/* Details Card */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h1 className="text-2xl font-bold text-foreground mb-4">{product.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {product.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Posted {product.date}
                  </span>
                </div>

                <div className="border-t border-border pt-6">
                  <h2 className="font-semibold text-foreground mb-3">Description</h2>
                  <p className="text-muted-foreground">
                    This is a great {product.category} item in excellent condition. 
                    The product is well maintained and ready for immediate use. 
                    Contact the seller for more details and to schedule a viewing.
                    Price is slightly negotiable for genuine buyers.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & Actions */}
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <div className="text-3xl font-bold text-foreground mb-6">
                  {formatPrice(product.price)}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="w-full flex items-center justify-center gap-2 gradient-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-5 h-5" />
                    {showPhone ? '+91 98765 43210' : 'Show Phone Number'}
                  </button>

                  <Link
                    to="/chat"
                    className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat with Seller
                  </Link>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium border transition-all ${
                        isFavorite(product.id)
                          ? 'bg-heart/10 border-heart text-heart'
                          : 'border-border hover:border-heart hover:text-heart'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                      Save
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium border border-border hover:border-primary hover:text-primary transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 gradient-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-lg">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Seller Name</p>
                      <p className="text-sm text-muted-foreground">Member since 2023</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="text-sm text-primary hover:underline"
                  >
                    View all ads by this seller →
                  </Link>
                </div>

                {/* Report */}
                <button className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                  <Flag className="w-4 h-4" />
                  Report this ad
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Ads</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
