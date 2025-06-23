
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-cyan-400 font-montserrat tracking-tight">
          Gemini Movie Showcase
        </h1>
      </div>
    </header>
  );
};
