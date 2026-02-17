import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Browse Categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/50 hover:bg-accent transition-all duration-200 group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </span>
              <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
