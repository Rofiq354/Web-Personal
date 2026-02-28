"use client";

import { TechBadge } from "@/components/tech-badge";
import { SiteConfigMap, TechStack } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function MarqueeRow({
  items,
  direction = "left",
  duration = 20,
}: {
  items: TechStack[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-3 w-max whitespace-nowrap"
        style={{ willChange: "transform" }}
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* 2x duplikat untuk seamless */}
        {[...items, ...items].map((tech, i) => (
          <div key={`${direction}-${i}`} className="shrink-0">
            <TechBadge tech={tech} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackSection({
  primaryTech,
  configMap,
}: {
  primaryTech: TechStack[];
  configMap: SiteConfigMap;
}) {
  if (primaryTech.length === 0) return null;

  return (
    <section className="section relative overflow-hidden bg-muted/30">
      {/* Radial glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="bg-primary inline-block mb-3 px-2">
            <p className="text-primary-foreground text-sm font-mono uppercase tracking-widest">
              Tools
            </p>
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground">
            {configMap.techstack_title || "Tech Stack"}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Technologies I work with daily to build fast, scalable, and
            maintainable products.
          </p>
        </motion.div>

        {/* Baris 1 — kanan ke kiri */}
        <div className="mb-4">
          <MarqueeRow items={primaryTech} direction="left" duration={20} />
        </div>

        {/* Baris 2 — kiri ke kanan */}
        <MarqueeRow items={primaryTech} direction="right" duration={25} />

        {/* Link */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/techstack"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            View full tech stack
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
