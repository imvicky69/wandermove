
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MovieGrid } from './components/MovieGrid';
import { SearchBar } from './components/SearchBar';
import { SortDropdown } from './components/SortDropdown';
import { CategoryFilter } from './components/CategoryFilter';
import { MovieModal } from './components/MovieModal';
import { Movie, SortOption, Category } from './types';
import { INITIAL_MOVIES, ALL_CATEGORIES } from './constants';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.RELEASE_DATE_DESC);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filterAndSortMovies = useCallback(() => {
    let tempMovies = [...movies];

    // Filter by category
    if (selectedCategory !== 'All') {
      tempMovies = tempMovies.filter(movie => movie.genre.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by search term
    if (searchTerm) {
      tempMovies = tempMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort movies
    switch (sortOption) {
      case SortOption.TITLE_ASC:
        tempMovies.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SortOption.TITLE_DESC:
        tempMovies.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case SortOption.RELEASE_DATE_ASC:
        tempMovies.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
        break;
      case SortOption.RELEASE_DATE_DESC:
        tempMovies.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
    }
    setFilteredMovies(tempMovies);
  }, [movies, searchTerm, sortOption, selectedCategory]);

  useEffect(() => {
    filterAndSortMovies();
  }, [filterAndSortMovies]);


  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-slate-800 rounded-xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
          </div>
          <CategoryFilter
            categories={ALL_CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        
        {filteredMovies.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-slate-400">No movies found.</h2>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <MovieGrid movies={filteredMovies} onMovieClick={handleMovieClick} />
        )}

      </main>
      <Footer />
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
