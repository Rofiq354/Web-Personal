import { Suspense } from "react";
import { ExperienceCard } from "@/components/experience-card";
import { PageLoaderInline } from "@/components/page-loader";
import type { WorkExperience } from "@/types";
import { createClient } from "@/utils/supabase/server";

async function getExperience() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("work_experience")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  return (data || []) as WorkExperience[];
}

export default async function ExperiencePage() {
  const experiences = await getExperience();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-amber text-sm font-mono uppercase tracking-widest mb-2">
          Career
        </p>
        <h1 className="font-display text-5xl font-bold text-foreground mb-4">
          Experience
        </h1>
        <p className="text-muted-foreground max-w-xl">
          My professional journey and the companies I've had the privilege to
          work with.
        </p>
      </div>

      <Suspense fallback={<PageLoaderInline />}>
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-8 bottom-8 w-px bg-border hidden sm:block" />

          <div className="space-y-6">
            {experiences.length === 0 ? (
              <p className="text-center text-muted-foreground py-20">
                No experience entries yet.
              </p>
            ) : (
              experiences.map((exp, i) => (
                <div key={exp.id} className="relative sm:pl-14">
                  {/* Timeline dot */}
                  <div className="absolute left-3 top-7 w-5 h-5 rounded-full border-2 border-amber bg-background hidden sm:flex items-center justify-center">
                    <div
                      className={`w-2 h-2 rounded-full ${exp.is_current ? "bg-amber animate-pulse" : "bg-muted-foreground"}`}
                    />
                  </div>
                  <ExperienceCard experience={exp} index={i} expanded={true} />
                </div>
              ))
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
