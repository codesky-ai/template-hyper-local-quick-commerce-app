import React from 'react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Shop by Category</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {/* All Categories Button */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>

        {/* Category Buttons */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            {category.name}
            <span className="text-xs opacity-75">({category.productsCount})</span>
          </button>
        ))}
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {categories.map((category) => (
          <button
            key={`card-${category.id}`}
            onClick={() => onCategorySelect(category.id)}
            className={`bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all ${
              selectedCategory === category.id
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-16 h-16 mx-auto rounded-xl object-cover mb-3"
            />
            <h3 className="font-medium text-gray-900 text-sm mb-1">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500">
              {category.productsCount} items
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;