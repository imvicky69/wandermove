
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Gemini Movie Showcase. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Powered by React, Tailwind CSS, and Google Gemini API.
        </p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};
