"use client";

import { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

// Define proper types for TradingView widget
interface TradingViewWidgetProps {
  symbol?: string;
}

interface TradingViewConfig {
  container_id: string;
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  toolbar_bg: string;
  enable_publishing: boolean;
  hide_top_toolbar: boolean;
  hide_legend: boolean;
  save_image: boolean;
  backgroundColor: string;
  gridColor: string;
  hide_volume: boolean;
  width: string;
  height: string;
  drawings_access: { type: string };
  studies_access: { type: string };
}

// Define the TradingView interface
interface TradingViewStatic {
  widget: new (config: TradingViewConfig) => void;
}

// Declare TradingView as a global variable with proper typing
declare global {
  interface Window {
    TradingView: TradingViewStatic;
  }
}

function TradingViewWidget({ symbol = "COINBASE:BTCUSD" }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (container.current) {
        const isMobile = window.innerWidth < 768;
        
        new window.TradingView.widget({
          container_id: container.current.id,
          symbol: symbol,
          interval: "1",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "rgba(0, 0, 0, 0.0)",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: true,
          save_image: true,
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          gridColor: "rgba(255, 255, 255, 0.06)",
          hide_volume: true,
          width: "100%",
          height: isMobile ? "300" : "400",
          drawings_access: { type: 'all' },
          studies_access: { type: 'all' }
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [symbol]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 px-2 md:p-4 rounded-xl border border-white/10 w-full h-[303px] md:h-[450px]"
    >
      <div 
        ref={container}
        id={`tradingview_chart_${symbol?.replace(/[^a-zA-Z0-9]/g, '_')}`}
        className="tradingview-widget-container h-full"
      />
    </motion.div>
  );
}

export default memo(TradingViewWidget);
