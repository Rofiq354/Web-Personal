import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExperienceCard } from "@/components/experience-card";
import type {
  Profile,
  Project,
  WorkExperience,
  TechStack,
  SiteConfigMap,
} from "@/types";
import { createClient } from "@/utils/supabase/server";
import { GridSection } from "@/app/features/landing-page/components/ProfileCard";
import HeroSection from "./features/landing-page/sections/Hero";
import FeaturedProjectSection from "./features/landing-page/sections/FeaturedProject";
import TechStackSection from "./features/landing-page/sections/TechStack";
import ExperienceSection from "./features/landing-page/sections/Experience";

async function getHomeData() {
  const supabase = await createClient();
  const [
    { data: profile },
    { data: featuredProjects },
    { data: recentExperience },
    { data: primaryTech },
    { data: configs },
  ] = await Promise.all([
    supabase.from("profile").select("*").single(),
    supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("sort_order")
      .limit(4),
    supabase
      .from("work_experience")
      .select("*")
      .eq("is_published", true)
      .order("sort_order")
      .limit(3),
    supabase
      .from("tech_stack")
      .select("*")
      .eq("is_published", true)
      .eq("is_primary", true)
      .order("proficiency", { ascending: false }),
    supabase.from("site_config").select("*"),
  ]);

  const configMap: SiteConfigMap = Object.fromEntries(
    (configs || []).map((c) => [c.key, c.value || ""]),
  );

  return {
    profile: profile as Profile | null,
    featuredProjects: (featuredProjects || []) as Project[],
    recentExperience: (recentExperience || []) as WorkExperience[],
    primaryTech: (primaryTech || []) as TechStack[],
    configMap,
  };
}

export default async function HomePage() {
  const {
    profile,
    featuredProjects,
    recentExperience,
    primaryTech,
    configMap,
  } = await getHomeData();

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <HeroSection
        profile={profile}
        configMap={configMap}
        primaryTech={primaryTech}
      />

      {/* ─── FEATURED PROJECTS ─────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <FeaturedProjectSection
          configMap={configMap}
          featuredProjects={featuredProjects}
        />
      )}

      {/* ─── EXPERIENCE ─────────────────────────────────────────── */}
      {recentExperience.length > 0 && (
        <ExperienceSection configMap={configMap} recentExperience={recentExperience} />
      )}

      {/* ─── TECH STACK ─────────────────────────────────────────── */}
      {primaryTech.length > 0 && (
        <TechStackSection primaryTech={primaryTech} configMap={configMap} />
      )}

      {/* ─── CTA ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-navy dark:bg-card border border-border overflow-hidden">
            {/* BG glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-steel/10 blur-3xl" />

            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-4">
                Let's work together
              </h2>
              <p className="text-cream/70 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              {profile?.email && (
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-amber text-navy rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-amber/30"
                >
                  Say Hello
                  <ArrowRight size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
