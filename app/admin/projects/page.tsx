"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Building2,
  User,
  ExternalLink,
  Github,
} from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const supabase = createClient();

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const togglePublish = async (project: Project) => {
    await supabase
      .from("projects")
      .update({ is_published: !project.is_published })
      .eq("id", project.id);
    fetchProjects();
  };

  const toggleFeatured = async (project: Project) => {
    await supabase
      .from("projects")
      .update({ is_featured: !project.is_featured })
      .eq("id", project.id);
    fetchProjects();
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Projects
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
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
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className={cn(
                "flex items-center gap-4 p-5 bg-card border border-border rounded-2xl transition-all",
                !project.is_published && "opacity-60",
              )}
            >
              {/* Category icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  project.category === "company"
                    ? "bg-steel/10"
                    : "bg-navy/10 dark:bg-amber/10",
                )}
              >
                {project.category === "company" ? (
                  <Building2
                    size={16}
                    className="text-steel dark:text-steel-200"
                  />
                ) : (
                  <User size={16} className="text-navy dark:text-amber" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {project.title}
                  </h3>
                  {project.is_featured && (
                    <Star
                      size={13}
                      className="text-amber fill-amber flex-shrink-0"
                    />
                  )}
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                      project.status === "completed"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : project.status === "in_progress"
                          ? "bg-amber/10 text-amber"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {project.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {project.short_description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {project.tech_stack?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <Github size={14} />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleFeatured(project)}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    project.is_featured
                      ? "text-amber hover:bg-amber/10"
                      : "text-muted-foreground hover:text-amber hover:bg-muted",
                  )}
                  title="Toggle featured"
                >
                  <Star
                    size={15}
                    className={project.is_featured ? "fill-amber" : ""}
                  />
                </button>
                <button
                  onClick={() => togglePublish(project)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  title={project.is_published ? "Unpublish" : "Publish"}
                >
                  {project.is_published ? (
                    <Eye size={15} />
                  ) : (
                    <EyeOff size={15} />
                  )}
                </button>
                <button
                  onClick={() => {
                    setEditing(project);
                    setShowForm(true);
                  }}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <FolderEmpty />
              <p className="mt-4">No projects yet. Add your first project!</p>
            </div>
          )}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <ProjectForm
          project={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditing(null);
            fetchProjects();
          }}
        />
      )}
    </div>
  );
}

function FolderEmpty() {
  return (
    <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center">
      <Plus size={24} className="text-muted-foreground" />
    </div>
  );
}

// ─── PROJECT FORM ────────────────────────────────────────────────────
function ProjectForm({
  project,
  onClose,
  onSave,
}: {
  project: Project | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    short_description: project?.short_description || "",
    description: project?.description || "",
    category: project?.category || "personal",
    status: project?.status || "completed",
    cover_image_url: project?.cover_image_url || "",
    github_url: project?.github_url || "",
    live_url: project?.live_url || "",
    tech_stack: project?.tech_stack?.join(", ") || "",
    highlights: project?.highlights?.join("\n") || "",
    is_featured: project?.is_featured || false,
    is_published: project?.is_published !== false,
    sort_order: project?.sort_order || 0,
  });

  const set = (key: string, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      slug:
        form.slug ||
        form.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
      tech_stack: form.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      highlights: form.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
    };

    if (project) {
      await supabase.from("projects").update(payload).eq("id", project.id);
    } else {
      await supabase.from("projects").insert(payload);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">
            {project ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Title" required>
              <input
                value={form.title}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!project)
                    set(
                      "slug",
                      e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, ""),
                    );
                }}
                className={inputCls}
                placeholder="My Awesome Project"
              />
            </Field>
            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                className={inputCls}
                placeholder="my-awesome-project"
              />
            </Field>
          </div>

          <Field label="Short Description" required>
            <input
              value={form.short_description}
              onChange={(e) => set("short_description", e.target.value)}
              className={inputCls}
              placeholder="A brief project description"
            />
          </Field>

          <Field label="Full Description">
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={`${inputCls} h-24 resize-none`}
              placeholder="Detailed description..."
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                <option value="personal">Personal</option>
                <option value="company">Company</option>
              </select>
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={inputCls}
              >
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
          </div>

          <Field label="Tech Stack (comma-separated)">
            <input
              value={form.tech_stack}
              onChange={(e) => set("tech_stack", e.target.value)}
              className={inputCls}
              placeholder="React, Next.js, TypeScript"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="GitHub URL">
              <input
                value={form.github_url}
                onChange={(e) => set("github_url", e.target.value)}
                className={inputCls}
                placeholder="https://github.com/..."
              />
            </Field>
            <Field label="Live URL">
              <input
                value={form.live_url}
                onChange={(e) => set("live_url", e.target.value)}
                className={inputCls}
                placeholder="https://..."
              />
            </Field>
          </div>

          <Field label="Cover Image URL">
            <input
              value={form.cover_image_url}
              onChange={(e) => set("cover_image_url", e.target.value)}
              className={inputCls}
              placeholder="https://..."
            />
          </Field>

          <Field label="Key Highlights (one per line)">
            <textarea
              value={form.highlights}
              onChange={(e) => set("highlights", e.target.value)}
              className={`${inputCls} h-24 resize-none`}
              placeholder="Feature 1&#10;Feature 2"
            />
          </Field>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => set("is_featured", e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-foreground">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => set("is_published", e.target.checked)}
                className="rounded"
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
            {saving ? "Saving..." : "Save Project"}
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
