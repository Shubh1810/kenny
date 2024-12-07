'use client';

import { useEffect, useRef, memo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: any) => any;
    };
  }
}

const MotionDiv = motion.div as unknown as React.FC<HTMLMotionProps<"div"> & { className?: string }>;

function TradingViewWidget({ symbol = "COINBASE:BTCUSD" }: { symbol?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (container.current && window.TradingView) {
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
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 px-2 md:p-4 rounded-xl border border-white/10 w-full h-[400px] md:h-[450px]"
    >
      <div 
        ref={container}
        id={`tradingview_chart_${symbol?.replace(/[^a-zA-Z0-9]/g, '_')}`}
        className="tradingview-widget-container h-full"
      />
    </MotionDiv>
  );
}

export default memo(TradingViewWidget);