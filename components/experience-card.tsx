"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import { formatDateRange, calculateDuration } from "@/lib/utils";
import type { WorkExperience } from "@/types";

interface ExperienceCardProps {
  experience: WorkExperience;
  index?: number;
  expanded?: boolean;
}

export function ExperienceCard({
  experience: exp,
  index = 0,
  expanded = false,
}: ExperienceCardProps) {
  const duration = calculateDuration(exp.start_date, exp.end_date);
  const dateRange = formatDateRange(
    exp.start_date,
    exp.end_date,
    exp.is_current,
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-2xl p-6 hover:border-amber/50 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Logo or initial */}
        <div className="shrink-0">
          {exp.company_logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={exp.company_logo_url}
              alt={exp.company}
              className="w-12 h-12 rounded-xl object-cover border border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-navy/20 to-steel/20 dark:from-navy/60 dark:to-steel/40 flex items-center justify-center border border-border">
              <span className="font-display text-lg font-bold text-foreground">
                {exp.company.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-amber transition-colors">
                {exp.role}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                {exp.company_url ? (
                  <a
                    href={exp.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {exp.company}
                  </span>
                )}
                <span className="text-muted-foreground/40">•</span>
                <span className="text-xs text-muted-foreground">
                  {exp.employment_type}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
              <Calendar size={12} />
              <span>{dateRange}</span>
              <span className="px-1.5 py-0.5 bg-muted rounded text-muted-foreground">
                {duration}
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {exp.location && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={11} />
                {exp.location}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Briefcase size={11} />
              {exp.location_type}
            </span>
            {exp.is_current && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Current
              </span>
            )}
          </div>

          {/* Description */}
          {exp.description && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {exp.description}
            </p>
          )}

          {/* Responsibilities (expanded mode) */}
          {expanded &&
            exp.responsibilities &&
            exp.responsibilities.length > 0 && (
              <ul className="space-y-1 mb-3">
                {exp.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-amber mt-1.5 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

          {/* Tech used */}
          {exp.tech_used && exp.tech_used.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {exp.tech_used.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-muted text-muted-foreground rounded-md text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
