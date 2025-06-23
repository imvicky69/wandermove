
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const allButtonClasses = `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
    selectedCategory === 'All'
      ? 'bg-cyan-600 text-white shadow-md'
      : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
  }`;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        onClick={() => setSelectedCategory('All')}
        className={allButtonClasses}
      >
        All Categories
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-cyan-600 text-white shadow-md'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
