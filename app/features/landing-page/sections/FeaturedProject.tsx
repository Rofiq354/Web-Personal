"use client";

import { Project, SiteConfigMap } from "@/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import ParallaxCard from "../components/ProjectCardParalax";

export default function FeaturedProjectSection({
  configMap,
  featuredProjects,
}: {
  configMap: SiteConfigMap;
  featuredProjects: Project[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden bg-muted/30"
    >
      {/* Background paralax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-linear-to-br from-primary/20 via-transparent to-steel/30"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity: headerOpacity }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="bg-primary inline-block mb-2 px-2">
              <p className="text-primary-foreground text-sm font-mono uppercase tracking-widest">
                Selected Work
              </p>
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground">
              {configMap.projects_title || "Featured Projects"}
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A curated selection of production-grade projects focused on
              performance, accessibility, and scalable architecture.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => {
            const isFirst = i === 0;
            const isLast = i === featuredProjects.length - 1;
            const spanTwo = isFirst || isLast;

            return (
              <ParallaxCard
                key={project.id}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
                spanTwo={spanTwo}
              />
            );
          })}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
