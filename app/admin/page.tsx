import { createClient } from "@/utils/supabase/server";
import { FolderOpen, Briefcase, Cpu, User, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const supabase = await createClient();
  const [
    { count: projectsCount },
    { count: experienceCount },
    { count: techCount },
    { data: profile },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("work_experience")
      .select("*", { count: "exact", head: true }),
    supabase.from("tech_stack").select("*", { count: "exact", head: true }),
    supabase.from("profile").select("name, title").single(),
  ]);
  return { projectsCount, experienceCount, techCount, profile };
}

export default async function AdminDashboard() {
  const { projectsCount, experienceCount, techCount, profile } =
    await getStats();

  const stats = [
    {
      label: "Projects",
      value: projectsCount || 0,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-blue-500",
    },
    {
      label: "Experience",
      value: experienceCount || 0,
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-green-500",
    },
    {
      label: "Tech Stack",
      value: techCount || 0,
      icon: Cpu,
      href: "/admin/techstack",
      color: "text-amber",
    },
  ];

  const quickLinks = [
    {
      label: "Edit Profile",
      href: "/admin/profile",
      icon: User,
      description: "Update your bio, avatar, and social links",
    },
    {
      label: "Manage Projects",
      href: "/admin/projects",
      icon: FolderOpen,
      description: "Add, edit, or remove portfolio projects",
    },
    {
      label: "Work Experience",
      href: "/admin/experience",
      icon: Briefcase,
      description: "Update your career history",
    },
    {
      label: "Tech Stack",
      href: "/admin/techstack",
      icon: Cpu,
      description: "Manage your skills and technologies",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome back{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}!
          👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your portfolio content from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-card border border-border rounded-2xl p-6 hover:border-amber/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className={stat.color} />
              <ArrowRight
                size={14}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-amber/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                <link.icon size={18} className="text-amber" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground group-hover:text-amber transition-colors">
                  {link.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {link.description}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
