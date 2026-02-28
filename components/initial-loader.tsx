"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem("portfolio_loaded");
    if (visited) {
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("portfolio_loaded", "true");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (hasLoaded) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-99 flex items-center justify-center bg-background"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Animated logo/icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-accent/30"
              />
              {/* Inner box */}
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-2xl shadow-accent/20">
                <span className="font-display text-2xl font-bold text-foreground">
                  P
                </span>
              </div>
            </motion.div>

            {/* Loading bars */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-end gap-1.5 h-8"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-accent rounded-full"
                  animate={{
                    scaleY: [0.4, 1, 0.4],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.12,
                  }}
                  style={{ height: "24px", transformOrigin: "bottom" }}
                />
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-foreground/60 text-sm font-mono tracking-widest uppercase"
            >
              Loading...
            </motion.p>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-secondary/40 rounded-tl-lg" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
