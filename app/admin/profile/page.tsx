"use client";

import { useState, useEffect } from "react";
import { Save, User } from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { Profile } from "@/types";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("profile")
      .select("*")
      .single()
      .then(({ data }) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  const set = (key: keyof Profile, value: unknown) => {
    setProfile((p) => (p ? { ...p, [key]: value } : p));
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);

    const { data, error } = await supabase
      .from("profile")
      .update(profile)
      .eq("id", profile.id)
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="space-y-4 max-w-2xl">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-14 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Update your personal information
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber text-navy rounded-xl text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          <Save size={15} />
          {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {profile && (
        <div className="max-w-2xl space-y-8">
          {/* Avatar preview */}
          <div className="flex items-center gap-5">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-20 h-20 rounded-2xl object-cover border border-border"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy to-steel flex items-center justify-center">
                <User size={28} className="text-cream" />
              </div>
            )}
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">
                Avatar URL
              </label>
              <input
                value={profile.avatar_url || ""}
                onChange={(e) => set("avatar_url", e.target.value)}
                className={`${inputCls} mt-1.5`}
                placeholder="https://..."
              />
            </div>
          </div>

          <Section title="Basic Info">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input
                  value={profile.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Title">
                <input
                  value={profile.title}
                  onChange={(e) => set("title", e.target.value)}
                  className={inputCls}
                  placeholder="Full Stack Developer"
                />
              </Field>
              <Field label="Tagline">
                <input
                  value={profile.tagline || ""}
                  onChange={(e) => set("tagline", e.target.value)}
                  className={inputCls}
                  placeholder="A short catchy tagline"
                />
              </Field>
              <Field label="Location">
                <input
                  value={profile.location || ""}
                  onChange={(e) => set("location", e.target.value)}
                  className={inputCls}
                  placeholder="Jakarta, Indonesia"
                />
              </Field>
            </div>
          </Section>

          <Section title="Bio">
            <Field label="Short Bio">
              <textarea
                value={profile.bio || ""}
                onChange={(e) => set("bio", e.target.value)}
                className={`${inputCls} h-24 resize-none`}
                placeholder="A short intro about yourself..."
              />
            </Field>
            <Field label="Extended Bio">
              <textarea
                value={profile.bio_extended || ""}
                onChange={(e) => set("bio_extended", e.target.value)}
                className={`${inputCls} h-32 resize-none`}
                placeholder="More details about your background, interests, etc."
              />
            </Field>
          </Section>

          <Section title="Contact & Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email">
                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Resume URL">
                <input
                  value={profile.resume_url || ""}
                  onChange={(e) => set("resume_url", e.target.value)}
                  className={inputCls}
                  placeholder="https://drive.google.com/..."
                />
              </Field>
              <Field label="GitHub URL">
                <input
                  value={profile.github_url || ""}
                  onChange={(e) => set("github_url", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="LinkedIn URL">
                <input
                  value={profile.linkedin_url || ""}
                  onChange={(e) => set("linkedin_url", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Twitter/X URL">
                <input
                  value={profile.twitter_url || ""}
                  onChange={(e) => set("twitter_url", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          </Section>

          <Section title="Status">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.open_to_work}
                  onChange={(e) => set("open_to_work", e.target.checked)}
                />
                <span className="text-sm text-foreground">Open to work</span>
              </label>
            </div>
            {profile.open_to_work && (
              <Field label="Hero Badge Text" className="mt-3">
                <input
                  value={profile.hero_badge || ""}
                  onChange={(e) => set("hero_badge", e.target.value)}
                  className={inputCls}
                  placeholder="Open to Work"
                />
              </Field>
            )}
          </Section>

          {/* Bottom save button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-amber text-navy rounded-xl text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-semibold text-foreground mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className || ""}`}>
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-amber ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 transition-all";
