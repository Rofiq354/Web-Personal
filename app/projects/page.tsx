import { Suspense } from "react";
import { ProjectsContent } from "@/components/projects-content";
import { PageLoaderInline } from "@/components/page-loader";
import type { Project } from "@/types";
import { createClient } from "@/utils/supabase/server";

async function getProjects() {
    const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  return (data || []) as Project[];
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const personalProjects = projects.filter((p) => p.category === "personal");
  const companyProjects = projects.filter((p) => p.category === "company");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-amber text-sm font-mono uppercase tracking-widest mb-2">
          Work
        </p>
        <h1 className="font-display text-5xl font-bold text-foreground mb-4">
          Projects
        </h1>
        <p className="text-muted-foreground max-w-xl">
          A collection of things I've built — from personal experiments to
          professional products.
        </p>
      </div>

      <Suspense fallback={<PageLoaderInline />}>
        <ProjectsContent
          personalProjects={personalProjects}
          companyProjects={companyProjects}
        />
      </Suspense>
    </div>
  );
}
