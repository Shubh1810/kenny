"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBitcoin } from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';

interface PriceTickerProps {
  symbol: string;
  initialPrice?: number;
  isActive?: boolean;
}

export function PriceTicker({ symbol, initialPrice = 0, isActive = false }: PriceTickerProps) {
  const [price, setPrice] = useState(initialPrice);
  const [priceChange, setPriceChange] = useState<'up' | 'down' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/price/${symbol}`);
      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }
      const data = await response.json();
      return data.price;
    } catch (error) {
      console.error('Error fetching price:', error);
      throw error;
    }
  }, [symbol]);

  useEffect(() => {
    const updatePrice = async () => {
      try {
        const newPrice = await fetchPrice();
        setPrice(prevPrice => {
          setPriceChange(newPrice > prevPrice ? 'up' : 'down');
          return newPrice;
        });
        setError(null);
      } catch (error) {
        setError('Failed to fetch price');
        console.error('Error updating price:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    updatePrice();

    // Set up polling every 10 seconds
    const intervalId = setInterval(updatePrice, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchPrice]);

  // Reset price change indicator after animation
  useEffect(() => {
    if (priceChange) {
      const timeout = setTimeout(() => setPriceChange(null), 1000);
      return () => clearTimeout(timeout);
    }
  }, [priceChange]);

  const getIcon = () => {
    switch (symbol) {
      case 'BTCUSDT':
        return <FaBitcoin className="h-6 w-6 text-[#F7931A]" />;
      case 'SOLUSDT':
        return <SiSolana className="h-6 w-6 text-[#14F195]" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getIcon()}
      <div className={`flex items-center justify-between px-4 py-2 rounded-lg backdrop-blur-sm transition-colors duration-200
        ${isActive ? 'bg-white/10 ring-2 ring-white/20' : 'bg-white/5 hover:bg-white/8'}`}>
        <span className="text-white/60 text-sm">Live Price</span>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-white/60 text-sm">Loading...</span>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-sm"
            >
              {error}
            </motion.div>
          ) : (
            <motion.div
              key={price}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`font-mono text-lg font-medium ${
                priceChange === 'up' 
                  ? 'text-green-400' 
                  : priceChange === 'down' 
                    ? 'text-red-400' 
                    : 'text-white/90'
              }`}
            >
              ${price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}