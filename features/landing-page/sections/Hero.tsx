import { Profile, SiteConfigMap, TechStack } from "@/types";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ProfileCard, { GridSection } from "../components/ProfileCard";

export default function HeroSection({
  profile,
  configMap,
  primaryTech,
}: {
  profile: Profile | null;
  configMap: SiteConfigMap;
  primaryTech: TechStack[];
}) {
  return (
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
  );
}
