"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { TechStack } from "@/types";
import { cn, groupBy } from "@/lib/utils";

const CATEGORIES = [
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "DevOps",
  "Tools",
  "Design",
];

export default function AdminTechStackPage() {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TechStack | null>(null);
  const supabase = createClient();

  const fetchTech = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("tech_stack")
      .select("*")
      .order("category")
      .order("sort_order");
    setTechStack(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTech();
  }, []);

  const togglePublish = async (tech: TechStack) => {
    await supabase
      .from("tech_stack")
      .update({ is_published: !tech.is_published })
      .eq("id", tech.id);
    fetchTech();
  };

  const deleteTech = async (id: string) => {
    if (!confirm("Delete this tech?")) return;
    await supabase.from("tech_stack").delete().eq("id", id);
    fetchTech();
  };

  const grouped = groupBy(techStack, "category");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Tech Stack
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your skills and technologies
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
          Add Tech
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-16 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(grouped)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="font-semibold text-muted-foreground mb-3 text-sm uppercase tracking-wider">
                  {category}
                </h2>
                <div className="space-y-2">
                  {grouped[category].map((tech) => (
                    <div
                      key={tech.id}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 bg-card border border-border rounded-xl transition-all",
                        !tech.is_published && "opacity-60",
                      )}
                    >
                      {/* Name + primary */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          {tech.name}
                        </span>
                        {tech.is_primary && (
                          <Star
                            size={12}
                            className="text-amber fill-amber flex-shrink-0"
                          />
                        )}
                      </div>

                      {/* Proficiency bar */}
                      <div className="hidden sm:flex items-center gap-2 w-32">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber rounded-full"
                            style={{ width: `${tech.proficiency}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">
                          {tech.proficiency}%
                        </span>
                      </div>

                      {/* Years */}
                      {tech.years_experience && (
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {tech.years_experience}yr
                        </span>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => togglePublish(tech)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        >
                          {tech.is_published ? (
                            <Eye size={14} />
                          ) : (
                            <EyeOff size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setEditing(tech);
                            setShowForm(true);
                          }}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => deleteTech(tech.id)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {techStack.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No tech stack entries yet.</p>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <TechForm
          tech={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={() => {
            setShowForm(false);
            setEditing(null);
            fetchTech();
          }}
        />
      )}
    </div>
  );
}

function TechForm({
  tech,
  onClose,
  onSave,
}: {
  tech: TechStack | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: tech?.name || "",
    category: tech?.category || "Frontend",
    icon_url: tech?.icon_url || "",
    proficiency: tech?.proficiency || 80,
    years_experience: tech?.years_experience || "",
    is_primary: tech?.is_primary || false,
    sort_order: tech?.sort_order || 0,
    is_published: tech?.is_published !== false,
  });

  const set = (key: string, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      years_experience: form.years_experience || null,
    };
    if (tech) {
      await supabase.from("tech_stack").update(payload).eq("id", tech.id);
    } else {
      await supabase.from("tech_stack").insert(payload);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">
            {tech ? "Edit Tech" : "New Tech"}
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
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Name <span className="text-amber">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
                placeholder="React"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Proficiency: {form.proficiency}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.proficiency}
              onChange={(e) => set("proficiency", parseInt(e.target.value))}
              className="w-full accent-amber"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Years Experience
              </label>
              <input
                type="number"
                step="0.5"
                value={form.years_experience}
                onChange={(e) => set("years_experience", e.target.value)}
                className={inputCls}
                placeholder="2.5"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Sort Order
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => set("sort_order", parseInt(e.target.value))}
                className={inputCls}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Icon URL
            </label>
            <input
              value={form.icon_url}
              onChange={(e) => set("icon_url", e.target.value)}
              className={inputCls}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_primary}
                onChange={(e) => set("is_primary", e.target.checked)}
              />
              <span className="text-sm text-foreground">Primary skill</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => set("is_published", e.target.checked)}
              />
              <span className="text-sm text-foreground">Published</span>
            </label>
          </div>
        </div>

        <div className="border-t border-border px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-amber text-navy text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 transition-all";
