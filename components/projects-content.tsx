"use client";

import { useState } from "react";
import { Building2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types";

interface ProjectsContentProps {
  personalProjects: Project[];
  companyProjects: Project[];
}

type Tab = "all" | "personal" | "company";

export function ProjectsContent({
  personalProjects,
  companyProjects,
}: ProjectsContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const allProjects = [...personalProjects, ...companyProjects].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const tabs = [
    { id: "all" as Tab, label: "All", count: allProjects.length },
    {
      id: "personal" as Tab,
      label: "Personal",
      count: personalProjects.length,
      icon: User,
    },
    {
      id: "company" as Tab,
      label: "Company",
      count: companyProjects.length,
      icon: Building2,
    },
  ];

  const visibleProjects =
    activeTab === "all"
      ? allProjects
      : activeTab === "personal"
        ? personalProjects
        : companyProjects;

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 p-1 bg-muted rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.icon && <tab.icon size={14} />}
            {tab.label}
            <span
              className={cn(
                "px-1.5 py-0.5 rounded-md text-xs hidden sm:inline-block",
                activeTab === tab.id
                  ? "bg-amber/20 text-amber"
                  : "bg-muted-foreground/10 text-muted-foreground",
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {visibleProjects.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>No projects found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
