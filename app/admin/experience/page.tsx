"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Calendar,
} from "lucide-react";
// import { createClient } from "@/lib/supabase";
import type { WorkExperience } from "@/types";
import { cn, formatDateRange } from "@/lib/utils";
import { createClient } from "@/lib/supabase";

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<WorkExperience | null>(null);
  const supabase = createClient();

  const fetchExperiences = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("work_experience")
      .select("*")
      .order("sort_order");
    setExperiences(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const togglePublish = async (exp: WorkExperience) => {
    await supabase
      .from("work_experience")
      .update({ is_published: !exp.is_published })
      .eq("id", exp.id);
    fetchExperiences();
  };

  const deleteExperience = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    await supabase.from("work_experience").delete().eq("id", id);
    fetchExperiences();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Work Experience
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your career history
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber text-navy rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-28 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={cn(
                "flex items-center gap-4 p-5 bg-card border border-border rounded-2xl transition-all",
                !exp.is_published && "opacity-60",
              )}
            >
              {/* Logo or initial */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy/20 to-steel/20 dark:from-navy/60 dark:to-steel/40 flex items-center justify-center flex-shrink-0 border border-border">
                <span className="font-display text-lg font-bold text-foreground">
                  {exp.company.charAt(0)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {exp.role}
                  </h3>
                  {exp.is_current && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {exp.company} · {exp.employment_type}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={11} />
                    {formatDateRange(
                      exp.start_date,
                      exp.end_date,
                      exp.is_current,
                    )}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={11} />
                      {exp.location} · {exp.location_type}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => togglePublish(exp)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  title={exp.is_published ? "Unpublish" : "Publish"}
                >
                  {exp.is_published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => {
                    setEditing(exp);
                    setShowForm(true);
                  }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No experience entries yet. Add your first one!</p>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <ExperienceForm
          experience={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditing(null);
            fetchExperiences();
          }}
        />
      )}
    </div>
  );
}

// ─── EXPERIENCE FORM ────────────────────────────────────────────────
function ExperienceForm({
  experience,
  onClose,
  onSave,
}: {
  experience: WorkExperience | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    company: experience?.company || "",
    company_logo_url: experience?.company_logo_url || "",
    company_url: experience?.company_url || "",
    role: experience?.role || "",
    employment_type: experience?.employment_type || "Full-time",
    start_date: experience?.start_date?.slice(0, 10) || "",
    end_date: experience?.end_date?.slice(0, 10) || "",
    is_current: experience?.is_current || false,
    location: experience?.location || "",
    location_type: experience?.location_type || "On-site",
    description: experience?.description || "",
    responsibilities: experience?.responsibilities?.join("\n") || "",
    achievements: experience?.achievements?.join("\n") || "",
    tech_used: experience?.tech_used?.join(", ") || "",
    sort_order: experience?.sort_order || 0,
    is_published: experience?.is_published !== false,
  });

  const set = (key: string, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      end_date: form.is_current ? null : form.end_date || null,
      responsibilities: form.responsibilities
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      achievements: form.achievements
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean),
      tech_used: form.tech_used
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (experience) {
      await supabase
        .from("work_experience")
        .update(payload)
        .eq("id", experience.id);
    } else {
      await supabase.from("work_experience").insert(payload);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">
            {experience ? "Edit Experience" : "New Experience"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company" required>
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                className={inputCls}
                placeholder="Company Name"
              />
            </Field>
            <Field label="Role" required>
              <input
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                className={inputCls}
                placeholder="Senior Developer"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Employment Type">
              <select
                value={form.employment_type}
                onChange={(e) => set("employment_type", e.target.value)}
                className={inputCls}
              >
                {[
                  "Full-time",
                  "Part-time",
                  "Freelance",
                  "Contract",
                  "Internship",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Location Type">
              <select
                value={form.location_type}
                onChange={(e) => set("location_type", e.target.value)}
                className={inputCls}
              >
                {["On-site", "Remote", "Hybrid"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Location">
            <input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              className={inputCls}
              placeholder="Jakarta, Indonesia"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date" required>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => set("start_date", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="End Date">
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => set("end_date", e.target.value)}
                className={inputCls}
                disabled={form.is_current}
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_current}
              onChange={(e) => set("is_current", e.target.checked)}
            />
            <span className="text-sm text-foreground">
              Currently working here
            </span>
          </label>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`${inputCls} h-24 resize-none`}
            />
          </Field>

          <Field label="Responsibilities (one per line)">
            <textarea
              value={form.responsibilities}
              onChange={(e) => set("responsibilities", e.target.value)}
              className={`${inputCls} h-28 resize-none`}
              placeholder="Led development of...&#10;Collaborated with..."
            />
          </Field>

          <Field label="Tech Used (comma-separated)">
            <input
              value={form.tech_used}
              onChange={(e) => set("tech_used", e.target.value)}
              className={inputCls}
              placeholder="React, TypeScript, Node.js"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Company Logo URL">
              <input
                value={form.company_logo_url}
                onChange={(e) => set("company_logo_url", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Company URL">
              <input
                value={form.company_url}
                onChange={(e) => set("company_url", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => set("is_published", e.target.checked)}
              />
              <span className="text-sm text-foreground">Published</span>
            </label>
            <Field label="Sort Order" className="flex-1">
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => set("sort_order", parseInt(e.target.value))}
                className={inputCls}
              />
            </Field>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-amber text-navy text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Experience"}
          </button>
        </div>
      </div>
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
    <div className={cn("space-y-1.5", className)}>
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
