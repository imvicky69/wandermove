
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '../types';
import { GeminiFeature } from './GeminiFeature';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-0 relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors z-10"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={movie.posterUrl.replace('/400/600', '/600/900')} // Larger image for modal
                alt={`${movie.title} poster`}
                className="w-full h-auto md:h-full object-cover rounded-l-xl md:rounded-bl-xl md:rounded-tr-none"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
              <h2 className="text-3xl font-bold text-sky-100 mb-2 font-montserrat">{movie.title}</h2>
              <p className="text-sm text-slate-400 mb-4">
                {movie.genre} &bull; {releaseYear}
              </p>
              <p className="text-slate-300 mb-6 text-base leading-relaxed">
                {movie.description}
              </p>
              
              <div className="my-auto"> {/* Pushes GeminiFeature down if space allows, or keeps it centered */}
                 <GeminiFeature movieTitle={movie.title} movieYear={releaseYear.toString()} />
              </div>

              <a
                href={movie.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
              >
                Watch Now
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
