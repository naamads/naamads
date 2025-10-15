import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import categoriesData from '../data/categories.json';

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

interface CategoryDropdownProps {
  onCategorySelect?: (category: string, subcategory?: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL CATEGORIES');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category: string, subcategory?: string) => {
    const displayText = subcategory || category;
    setSelectedCategory(displayText);
    setIsOpen(false);
    onCategorySelect?.(category, subcategory);
  };

  const categories: Category[] = categoriesData.categories;

  return (
    <div className="bg-muted/50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full md:w-64 px-4 py-3 text-sm font-semibold hover:bg-muted/80 transition-colors"
          >
            <span>{selectedCategory}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 md:right-auto mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-auto">
              <div className="p-2">
                <button
                  onClick={() => handleCategoryClick('ALL CATEGORIES')}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-muted transition-colors font-medium"
                >
                  ALL CATEGORIES
                </button>
                
                <div className="mt-2 space-y-1">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => handleCategoryClick(category.name)}
                        className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <span className="font-medium">{category.name}</span>
                        {category.subcategories.length > 0 && (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      
                      {category.subcategories.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.subcategories.map((subcategory, index) => (
                            <button
                              key={index}
                              onClick={() => handleCategoryClick(category.name, subcategory)}
                              className="w-full text-left px-4 py-1.5 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                            >
                              {subcategory}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
