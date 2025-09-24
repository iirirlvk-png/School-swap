import React from 'react';
import { Theme } from '../types';
import { OFFER_CATEGORIES } from '../constants';
import SearchIcon from './icons/SearchIcon';

interface SearchProps {
  theme: Theme;
}

const Search: React.FC<SearchProps> = ({ theme }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8">
        <SearchIcon className={`absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6 ${theme.textSecondary}`} />
        <input
          type="text"
          placeholder="Search for notes, textbooks, and more..."
          className={`w-full pl-14 pr-4 py-4 text-lg rounded-xl border-none focus:ring-2 focus:${theme.accent.replace('bg-', 'ring-')} ${theme.secondary} ${theme.textPrimary} placeholder:${theme.textSecondary}`}
        />
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {OFFER_CATEGORIES.map(category => (
            <button
              key={category}
              className={`p-4 rounded-xl text-left font-semibold transition-transform duration-200 hover:-translate-y-1 ${theme.secondary} hover:${theme.primary} hover:${theme.buttonText}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
