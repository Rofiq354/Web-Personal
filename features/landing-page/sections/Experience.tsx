"use client";

import Link from "next/link";
import { GridSection } from "../components/ProfileCard";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { ExperienceCard } from "@/components/experience-card";
import { SiteConfigMap, WorkExperience } from "@/types";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function ExperienceSection({
  configMap,
  recentExperience,
}: {
  configMap: SiteConfigMap;
  recentExperience: WorkExperience[];
}) {
  return (
    <section className="relative section">
      <GridSection />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="bg-primary inline-block mb-2 px-2">
              <p className="text-primary-foreground text-sm font-mono uppercase tracking-widest">
                Career
              </p>
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground">
              {configMap.experience_title || "Work Experience"}
            </h2>
          </div>
          <Link
            href="/experience"
            className="hidden sm:inline-flex items-center z-1 gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Full history
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards — stagger per item */}
        <div className="space-y-4">
          {recentExperience.map((exp, i) => (
            <motion.div
              key={exp.id}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Suspense
                fallback={<div className="skeleton h-32 rounded-2xl" />}
              >
                <ExperienceCard experience={exp} index={i} />
              </Suspense>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
