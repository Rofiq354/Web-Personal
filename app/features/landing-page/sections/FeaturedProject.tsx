"use client";

import { ProjectCard } from "@/components/project-card";
import { Project, SiteConfigMap } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import CircuitBackground from "../components/CircuitBackground";

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function FeaturedProjectSection({
  configMap,
  featuredProjects,
}: {
  configMap: SiteConfigMap;
  featuredProjects: Project[];
}) {
  return (
    <section className="section relative overflow-hidden bg-muted/30">
      <CircuitBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
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
              <motion.div
                key={project.id}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={spanTwo ? "lg:col-span-2" : ""}
              >
                <Suspense
                  fallback={<div className="skeleton h-48 rounded-2xl" />}
                >
                  <ProjectCard project={project} index={i} />
                </Suspense>
              </motion.div>
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
