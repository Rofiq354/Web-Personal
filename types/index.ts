export interface Profile {
  id: string;
  name: string;
  title: string;
  tagline: string | null;
  bio: string | null;
  bio_extended: string | null;
  email: string | null;
  location: string | null;
  avatar_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  resume_url: string | null;
  open_to_work: boolean;
  hero_badge: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  company_logo_url: string | null;
  company_url: string | null;
  role: string;
  employment_type: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  location: string | null;
  location_type: string;
  description: string | null;
  responsibilities: string[] | null;
  achievements: string[] | null;
  tech_used: string[] | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string | null;
  category: "personal" | "company";
  status: "completed" | "in_progress" | "archived";
  cover_image_url: string | null;
  images: string[] | null;
  github_url: string | null;
  live_url: string | null;
  tech_stack: string[] | null;
  highlights: string[] | null;
  start_date: string | null;
  end_date: string | null;
  is_featured: boolean;
  sort_order: number;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface TechStack {
  id: string;
  name: string;
  category: string;
  icon_url: string | null;
  proficiency: number;
  years_experience: number | null;
  is_primary: boolean;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteConfig {
  id: string;
  key: string;
  value: string | null;
  description: string | null;
  updated_at: string;
}

export type SiteConfigMap = Record<string, string>;
