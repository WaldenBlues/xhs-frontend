import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
      <SearchIcon className="w-6 h-6 text-gray-600" />
    </button>
  );
};

export default Search; 