import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ProjectCard } from "@/components/project-card";
import { ExperienceCard } from "@/components/experience-card";
import { TechBadge } from "@/components/tech-badge";
import type {
  Profile,
  Project,
  WorkExperience,
  TechStack,
  SiteConfigMap,
} from "@/types";
import { createClient } from "@/utils/supabase/server";
import ProfileCard, { GridSection } from "@/components/profile-card";

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
      <section className="relative min-h-[calc(100vh-64px)] flex items-center">
        <GridSection />
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-150 h-150 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-secondary/5 blur-3xl" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(#1A3263 1px, transparent 1px), linear-gradient(90deg, #1A3263 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl order-2 lg:order-1">
              {/* Badge */}
              {profile?.open_to_work && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/10 rounded-full text-primary text-sm font-medium mb-8 animate-fade-in">
                  <Sparkles size={14} />
                  {profile.hero_badge || "Available for Work"}
                </div>
              )}

              {/* Name */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-up">
                {profile?.name?.split(" ").map((word, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                    {i === 0 ? (
                      <span>{word}</span>
                    ) : (
                      <span className="text-primary"> {word}</span>
                    )}
                  </span>
                )) || "Your Name"}
              </h1>

              {/* Title */}
              <p
                className="text-xl sm:text-2xl text-muted-foreground font-medium mb-4 animate-fade-up"
                style={{ animationDelay: "0.15s" }}
              >
                {profile?.title || "Full Stack Developer"}
              </p>

              {/* Tagline & Bio */}
              {profile?.tagline && (
                <p
                  className="text-lg text-muted-foreground mb-4 animate-fade-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  {profile.tagline}
                </p>
              )}

              {profile?.bio && (
                <p
                  className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed animate-fade-up"
                  style={{ animationDelay: "0.25s" }}
                >
                  {profile.bio}
                </p>
              )}

              {/* Location */}
              {profile?.location && (
                <div
                  className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 animate-fade-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <MapPin size={14} className="text-primary" />
                  {profile.location}
                </div>
              )}

              {/* CTAs */}
              <div
                className="flex flex-wrap items-center gap-4 animate-fade-up"
                style={{ animationDelay: "0.35s" }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-cream dark:bg-amber dark:text-navy rounded-xl font-semibold hover:opacity-90 transition-all hover:gap-3 shadow-lg shadow-navy/20 dark:shadow-amber/20"
                >
                  {configMap.hero_cta_primary || "View My Work"}
                  <ArrowRight size={18} />
                </Link>

                {profile?.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all"
                  >
                    <Download size={16} />
                    {configMap.hero_cta_secondary || "Download CV"}
                  </a>
                )}
              </div>

              {/* Social links */}
              <div
                className="flex items-center gap-4 mt-8 animate-fade-up"
                style={{ animationDelay: "0.4s" }}
              >
                {profile?.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
              <ProfileCard profile={profile} techStack={primaryTech} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="section bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-amber text-sm font-mono uppercase tracking-widest mb-2">
                  Selected Work
                </p>
                <h2 className="font-display text-4xl font-bold text-foreground">
                  {configMap.projects_title || "Featured Projects"}
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredProjects.map((project, i) => (
                <Suspense
                  key={project.id}
                  fallback={<div className="skeleton h-48 rounded-2xl" />}
                >
                  <ProjectCard project={project} index={i} />
                </Suspense>
              ))}
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
      )}

      {/* ─── EXPERIENCE ─────────────────────────────────────────── */}
      {recentExperience.length > 0 && (
        <section className="relative section">
          <GridSection />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-amber text-sm font-mono uppercase tracking-widest mb-2">
                  Career
                </p>
                <h2 className="font-display text-4xl font-bold text-foreground">
                  {configMap.experience_title || "Work Experience"}
                </h2>
              </div>
              <Link
                href="/experience"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Full history
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {recentExperience.map((exp, i) => (
                <Suspense
                  key={exp.id}
                  fallback={<div className="skeleton h-32 rounded-2xl" />}
                >
                  <ExperienceCard experience={exp} index={i} />
                </Suspense>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── TECH STACK ─────────────────────────────────────────── */}
      {primaryTech.length > 0 && (
        <section className="section bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-amber text-sm font-mono uppercase tracking-widest mb-2">
              Tools
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground mb-12">
              {configMap.techstack_title || "Tech Stack"}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {primaryTech.map((tech) => (
                <TechBadge key={tech.id} tech={tech} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/techstack"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View full tech stack
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
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
                  href={`mailto:${profile.email}`}
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
