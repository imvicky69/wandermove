
import React, { useState, useCallback } from 'react';
import { getMovieInsights } from '../services/geminiService';
import { GeminiMovieInsights } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface GeminiFeatureProps {
  movieTitle: string;
  movieYear: string;
}

export const GeminiFeature: React.FC<GeminiFeatureProps> = ({ movieTitle, movieYear }) => {
  const [insights, setInsights] = useState<GeminiMovieInsights | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const fetchInsights = useCallback(async () => {
    if (!process.env.API_KEY) {
      setError("API Key not configured. Gemini features are disabled.");
      setIsLoading(false);
      setHasFetched(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasFetched(true);
    try {
      const result = await getMovieInsights(movieTitle, movieYear);
      setInsights(result);
    } catch (err: any) {
      console.error("Gemini API error:", err);
      setError(err.message || "Failed to fetch insights from Gemini. The cinematic universe is vast and mysterious!");
    } finally {
      setIsLoading(false);
    }
  }, [movieTitle, movieYear]);

  if (!process.env.API_KEY && !hasFetched) {
     return (
        <div className="mt-6 p-4 bg-slate-700 rounded-lg text-center">
            <p className="text-slate-300 text-sm">
                Gemini API Key not configured. Movie insights feature is unavailable.
            </p>
        </div>
     );
  }
  
  if (!hasFetched) {
    return (
      <div className="mt-6 text-center">
        <button
          onClick={fetchInsights}
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50"
        >
          {isLoading ? <LoadingSpinner size="sm" color="text-white"/> : '✨ Get Movie Insights (AI)'}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-6 p-4 bg-slate-700 rounded-lg text-center">
        <LoadingSpinner />
        <p className="text-slate-300 mt-2 text-sm">Consulting the AI oracle...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
        <p className="font-semibold">Oops! Something went wrong.</p>
        <p>{error}</p>
         <button
          onClick={fetchInsights}
          className="mt-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-3 rounded text-xs"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (insights) {
    return (
      <div className="mt-6 p-4 bg-slate-700/70 rounded-lg space-y-3 text-sm">
        <h4 className="text-md font-semibold text-emerald-400 font-montserrat">AI Movie Insights:</h4>
        {insights.tagline && (
          <div>
            <strong className="text-slate-200">Tagline:</strong>
            <p className="text-slate-300 italic">"{insights.tagline}"</p>
          </div>
        )}
        {insights.funFact && (
          <div>
            <strong className="text-slate-200">Fun Fact:</strong>
            <p className="text-slate-300">{insights.funFact}</p>
          </div>
        )}
        {insights.similarMovieSuggestion && (
          <div>
            <strong className="text-slate-200">Similar Vibe:</strong>
            <p className="text-slate-300">{insights.similarMovieSuggestion}</p>
          </div>
        )}
      </div>
    );
  }

  return null; // Should not reach here if logic is correct
};
