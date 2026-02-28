import { Suspense } from "react";
import { TechBadge } from "@/components/tech-badge";
import { PageLoaderInline } from "@/components/page-loader";
import { groupBy } from "@/lib/utils";
import type { TechStack } from "@/types";
import { createClient } from "@/utils/supabase/server";

async function getTechStack() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tech_stack")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  return (data || []) as TechStack[];
}

export default async function TechStackPage() {
  const techStack = await getTechStack();
  const grouped = groupBy(techStack, "category");
  const categories = Object.keys(grouped).sort();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <p className="text-amber text-sm font-mono uppercase tracking-widest mb-2">
          Skills
        </p>
        <h1 className="font-display text-5xl font-bold text-foreground mb-4">
          Tech Stack
        </h1>
        <p className="text-muted-foreground max-w-xl">
          The tools, languages, and frameworks I use to bring ideas to life.
        </p>
      </div>

      <Suspense fallback={<PageLoaderInline />}>
        {categories.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            No tech stack entries yet.
          </p>
        ) : (
          <div className="space-y-10">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
                  {category}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {grouped[category].map((tech) => (
                    <TechBadge
                      key={tech.id}
                      tech={tech}
                      showProficiency={true}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}
