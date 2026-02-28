"use client";

import Link from "next/link";
import {
  ExternalLink,
  Github,
  Building2,
  User,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "default" | "compact";
}

const STATUS_COLORS = {
  completed: "bg-green-500/10 text-green-600 dark:text-green-400",
  in_progress: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  archived: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
};

const STATUS_LABELS = {
  completed: "Completed",
  in_progress: "In Progress",
  archived: "Archived",
};

export function ProjectCard({
  project,
  index = 0,
  variant = "default",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-amber/50 transition-all duration-300 hover:shadow-lg hover:shadow-navy/5 dark:hover:shadow-amber/5",
        variant === "compact" && "p-5",
      )}
    >
      {/* Cover image */}
      {variant !== "compact" && project.cover_image_url && (
        <div className="relative h-48 overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={project.cover_image_url || "/placeholder-image.jpg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.is_featured}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent" />
        </div>
      )}

      {/* Placeholder if no image */}
      {variant !== "compact" && !project.cover_image_url && (
        <div className="h-48 bg-gradient-to-br from-navy/10 to-steel/10 dark:from-navy/40 dark:to-steel/30 flex items-center justify-center">
          <div className="text-4xl font-display font-bold text-foreground/10">
            {project.title.charAt(0)}
          </div>
        </div>
      )}

      <div className={cn("p-5", variant === "compact" && "p-0")}>
        {/* Category + Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Category badge */}
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                project.category === "company"
                  ? "bg-steel/10 text-steel dark:text-steel-200"
                  : "bg-navy/10 text-navy dark:bg-amber/10 dark:text-amber",
              )}
            >
              {project.category === "company" ? (
                <>
                  <Building2 size={10} /> Company
                </>
              ) : (
                <>
                  <User size={10} /> Personal
                </>
              )}
            </span>

            <span
              className={cn(
                "text-xs px-2.5 py-1 rounded-full font-medium",
                STATUS_COLORS[project.status],
              )}
            >
              {STATUS_LABELS[project.status]}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-amber transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.short_description}
        </p>

        {/* Tech stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech_stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-muted text-muted-foreground rounded-md text-xs font-mono"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 5 && (
              <span className="px-2 py-0.5 text-muted-foreground text-xs">
                +{project.tech_stack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-border">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-amber transition-colors"
            >
              <ExternalLink size={13} />
              Live Preview
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          {!project.live_url && !project.github_url && (
            <span className="text-xs text-muted-foreground italic">
              Private project
            </span>
          )}
          {/* Hover arrow */}
          <ArrowUpRight
            size={14}
            className="ml-auto text-muted-foreground/0 group-hover:text-amber group-hover:text-muted-foreground/60 transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
}
