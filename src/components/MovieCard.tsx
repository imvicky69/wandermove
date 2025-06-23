
import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 rounded-lg shadow-xl overflow-hidden cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-sky-100 mb-1 font-montserrat group-hover:text-cyan-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-400 mb-1">
          {movie.genre} &bull; {releaseYear}
        </p>
        <p className="text-sm text-slate-300 mb-4 line-clamp-2 flex-grow">
          {movie.description}
        </p>
        <a
          href={movie.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // Prevent card click when button is clicked
          className="mt-auto block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          Watch Now
        </a>
      </div>
    </motion.div>
  );
};
