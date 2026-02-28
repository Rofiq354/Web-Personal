"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { SiteConfig } from "@/types";

export default function AdminSettingsPage() {
  const [configs, setConfigs] = useState<SiteConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("site_config")
      .select("*")
      .order("key")
      .then(({ data }) => {
        setConfigs(data || []);
        setLoading(false);
      });
  }, []);

  const setValue = (key: string, value: string) => {
    setConfigs((cs) => cs.map((c) => (c.key === key ? { ...c, value } : c)));
  };

  const handleSave = async () => {
    setSaving(true);
    await Promise.all(
      configs.map((c) =>
        supabase.from("site_config").update({ value: c.value }).eq("id", c.id),
      ),
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="p-8 space-y-3 max-w-2xl">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton h-14 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Site Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Customize text content throughout the site
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber text-navy rounded-xl text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          <Save size={15} />
          {saved ? "Saved!" : saving ? "Saving..." : "Save All"}
        </button>
      </div>

      <div className="max-w-2xl space-y-4">
        {configs.map((config) => (
          <div
            key={config.id}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground block mb-1">
                  {config.key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
                {config.description && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {config.description}
                  </p>
                )}
                <input
                  value={config.value || ""}
                  onChange={(e) => setValue(config.key, e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber/50 transition-all"
                />
              </div>
            </div>
          </div>
        ))}

        {configs.length === 0 && (
          <p className="text-muted-foreground text-center py-10">
            No settings found. Make sure to run the database schema first.
          </p>
        )}
      </div>
    </div>
  );
}
