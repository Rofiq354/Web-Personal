"use client";

import { ProjectCard } from "@/components/project-card";
import { Project } from "@/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense } from "react";

function getVisualRow(index: number): number {
  return Math.floor(index / 2);
}

export default function ParallaxCard({
  project,
  index,
  scrollYProgress,
  spanTwo,
}: {
  project: Project;
  index: number;
  scrollYProgress: any;
  spanTwo: boolean;
}) {
  const row = getVisualRow(index);

  const cardX = useTransform(
    scrollYProgress,
    [0, 1],
    row % 2 === 0 ? [100, -100] : [-100, 100],
  );

  return (
    <motion.div
      style={{ x: cardX }}
      className={spanTwo ? "lg:col-span-2" : ""}
    >
      <Suspense fallback={<div className="skeleton h-48 rounded-2xl" />}>
        <ProjectCard project={project} index={index} />
      </Suspense>
    </motion.div>
  );
}
