import { Suspense } from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  MapPin,
} from "lucide-react";
import { PageLoaderInline } from "@/components/page-loader";
import type { Profile } from "@/types";
import { createClient } from "@/utils/supabase/server";

async function getProfile() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").single();
  return data as Profile | null;
}

export default async function AboutPage() {
  const profile = await getProfile();

  const socialLinks = [
    profile?.github_url && {
      icon: Github,
      href: profile.github_url,
      label: "GitHub",
    },
    profile?.linkedin_url && {
      icon: Linkedin,
      href: profile.linkedin_url,
      label: "LinkedIn",
    },
    profile?.twitter_url && {
      icon: Twitter,
      href: profile.twitter_url,
      label: "Twitter",
    },
    profile?.email && {
      icon: Mail,
      href: `mailto:${profile.email}`,
      label: "Email",
    },
  ].filter(Boolean) as {
    icon: React.ComponentType<{ size: number }>;
    href: string;
    label: string;
  }[];

  return (
    <Suspense fallback={<PageLoaderInline />}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-amber text-sm font-mono uppercase tracking-widest mb-2">
            About me
          </p>
          <h1 className="font-display text-5xl font-bold text-foreground mb-4">
            Hello! 👋
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Avatar & info */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start gap-5">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-40 h-40 rounded-2xl object-cover border-4 border-border shadow-xl"
              />
            ) : (
              <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-navy to-steel dark:from-navy/80 dark:to-steel/60 flex items-center justify-center border-4 border-border shadow-xl">
                <span className="font-display text-5xl font-bold text-cream">
                  {profile?.name?.charAt(0) || "P"}
                </span>
              </div>
            )}

            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-foreground">
                {profile?.name}
              </h2>
              <p className="text-muted-foreground text-sm">{profile?.title}</p>
              {profile?.location && (
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <MapPin size={13} className="text-amber" />
                  {profile.location}
                </p>
              )}
            </div>

            {/* Status */}
            {profile?.open_to_work && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to work
              </div>
            )}

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-1.5 px-3 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-amber/50 transition-all"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            )}

            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber text-navy rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
              >
                <Download size={14} />
                Download CV
              </a>
            )}
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-6">
            {profile?.bio && (
              <p className="text-base text-foreground leading-relaxed">
                {profile.bio}
              </p>
            )}
            {profile?.bio_extended && (
              <p className="text-base text-muted-foreground leading-relaxed">
                {profile.bio_extended}
              </p>
            )}

            {!profile?.bio && !profile?.bio_extended && (
              <p className="text-muted-foreground italic">
                No bio written yet. Update your profile in the admin panel.
              </p>
            )}

            {/* Quick links */}
            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-muted/70 transition-colors"
              >
                View my projects →
              </Link>
              <Link
                href="/experience"
                className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-muted/70 transition-colors"
              >
                Work history →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
