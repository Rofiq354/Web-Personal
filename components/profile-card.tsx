"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Profile, TechStack } from "@/types";

export default function ProfileCard({
  profile,
  techStack,
}: {
  profile: Profile | null;
  techStack: TechStack[];
}) {
  const [time, setTime] = useState(0);

  const [dimensions, setDimensions] = useState({
    radiusX: 225,
    radiusY: 60,
    ringW: 450,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Ukuran Mobile (sm ke bawah)
        setDimensions({
          radiusX: 140, // Lebih kecil buat HP
          radiusY: 40,
          ringW: 280,
        });
      } else {
        // Ukuran Desktop
        setDimensions({
          radiusX: 225,
          radiusY: 60,
          ringW: 450,
        });
      }
    };

    handleResize(); // Jalankan saat mount
    window.addEventListener("resize", handleResize);

    // Loop animasi tetap sama
    let frame = requestAnimationFrame(function update() {
      setTime((t) => t + 0.005);
      frame = requestAnimationFrame(update);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-60 h-60 sm:w-150 sm:h-150">
      <motion.div
        animate={{ y: [0, -10, 0] }} // Efek melayang pelan
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-48 h-48 sm:w-80 sm:h-80 rounded-full border-8 border-primary/20 p-2 shadow-2xl overflow-hidden"
      >
        <Image
          src={profile?.avatar_url || "/default.png"}
          alt="Profile"
          priority
          fill
          className="object-cover rounded-full p-2"
          sizes="(max-width: 768px) 176px, 288px"
        />
      </motion.div>

      <div
        className="absolute border-2 border-border rounded-[100%] rotate-15 pointer-events-none"
        style={{ width: dimensions.ringW, height: dimensions.radiusY * 2 }}
      />

      {techStack.map((tech, index) => {
        const angle = (index / techStack.length) * Math.PI * 2 + time;

        // Gunakan nilai dari state dimensions
        const baseX = Math.cos(angle) * dimensions.radiusX;
        const baseY = Math.sin(angle) * dimensions.radiusY;

        const theta = (15 * Math.PI) / 180;
        const rotatedX = baseX * Math.cos(theta) - baseY * Math.sin(theta);
        const rotatedY = baseX * Math.sin(theta) + baseY * Math.cos(theta);

        const isFront = Math.sin(angle) > 0;

        return (
          <div
            key={tech.name}
            className="absolute flex flex-col items-center ..."
            style={{
              transform: `translate(${rotatedX}px, ${rotatedY}px) scale(${isFront ? 1 : 0.6})`,
              zIndex: isFront ? 20 : 5,
              opacity: isFront ? 1 : 0.4,
            }}
          >
            <div className="p-2 bg-card/10 backdrop-blur-md rounded-xl border border/20 shadow-lg group hover:border transition-colors">
              <img
                src={`${tech.icon_url}?w=32&h=32`}
                alt={tech.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </div>
            <span className="text-[10px] font-medium text-foreground/70">
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function GridSection() {
  const [blocks, setBlocks] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  const calculateGrid = useCallback(() => {
    const columns = Math.ceil(window.innerWidth / 40);
    const rows = Math.ceil(window.innerHeight / 40);
    setBlocks(columns * rows);
  }, []);

  useEffect(() => {
    setMounted(true);
    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, [calculateGrid]);

  if (!mounted) return <div className="absolute inset-0" />;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--color-primary), transparent 85%) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--color-primary), transparent 85%) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, 40px)",
          gridAutoRows: "40px",
        }}
      >
        {[...Array(blocks)].map((_, i) => (
          <div
            key={i}
            className="w-full h-full border border-transparent transition-colors duration-1000 hover:bg-primary/20 hover:duration-0"
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, var(--background) 100%)",
          opacity: 0.8,
        }}
      />
    </div>
  );
}
