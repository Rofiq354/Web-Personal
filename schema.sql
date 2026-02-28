-- ============================================
-- PORTFOLIO DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable RLS
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- ============================================
-- TABLE: profile
-- ============================================
CREATE TABLE profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  bio TEXT,
  bio_extended TEXT,
  email TEXT,
  location TEXT,
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  resume_url TEXT,
  open_to_work BOOLEAN DEFAULT false,
  hero_badge TEXT DEFAULT 'Available for Work',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: work_experience
-- ============================================
CREATE TABLE work_experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  company_logo_url TEXT,
  company_url TEXT,
  role TEXT NOT NULL,
  employment_type TEXT DEFAULT 'Full-time', -- Full-time, Part-time, Freelance, Contract
  start_date DATE NOT NULL,
  end_date DATE, -- NULL = present
  is_current BOOLEAN DEFAULT false,
  location TEXT,
  location_type TEXT DEFAULT 'On-site', -- On-site, Remote, Hybrid
  description TEXT,
  responsibilities TEXT[], -- Array of responsibilities
  achievements TEXT[], -- Array of achievements
  tech_used TEXT[], -- Technologies used
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: projects
-- ============================================
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'personal', -- 'personal' | 'company'
  status TEXT DEFAULT 'completed', -- 'completed' | 'in_progress' | 'archived'
  cover_image_url TEXT,
  images TEXT[], -- Additional images
  github_url TEXT,
  live_url TEXT,
  tech_stack TEXT[],
  highlights TEXT[], -- Key features / highlights
  start_date DATE,
  end_date DATE,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: tech_stack
-- ============================================
CREATE TABLE tech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Frontend', 'Backend', 'Mobile', 'Database', 'DevOps', 'Tools', 'Design'
  icon_url TEXT,
  proficiency INT DEFAULT 80, -- 0-100
  years_experience NUMERIC(3,1),
  is_primary BOOLEAN DEFAULT false, -- Highlight as main skill
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: site_config
-- Stores general site settings (key-value)
-- ============================================
CREATE TABLE site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRIGGERS: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER work_experience_updated_at BEFORE UPDATE ON work_experience FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
CREATE TRIGGER tech_stack_updated_at BEFORE UPDATE ON tech_stack FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read published experience" ON work_experience FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read published tech" ON tech_stack FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_config" ON site_config FOR SELECT USING (true);

-- Authenticated admin can do everything
CREATE POLICY "Admin full access profile" ON profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access experience" ON work_experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access tech" ON tech_stack FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access config" ON site_config FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SEED DATA (sample data to get started)
-- ============================================
INSERT INTO profile (name, title, tagline, bio, email, location, github_url, linkedin_url, open_to_work, hero_badge)
VALUES (
  'Your Name',
  'Full Stack Developer',
  'Building digital experiences that matter.',
  'I am a passionate developer with experience in building modern web applications. I love clean code, good design, and solving complex problems.',
  'hello@yourname.dev',
  'Jakarta, Indonesia',
  'https://github.com/yourusername',
  'https://linkedin.com/in/yourusername',
  true,
  'Open to Work'
);

INSERT INTO site_config (key, value, description) VALUES
  ('hero_cta_primary', 'View My Work', 'Primary CTA button text'),
  ('hero_cta_secondary', 'Download CV', 'Secondary CTA button text'),
  ('projects_title', 'Selected Work', 'Projects section title'),
  ('experience_title', 'Work Experience', 'Experience section title'),
  ('techstack_title', 'Tech Stack', 'Tech stack section title'),
  ('footer_tagline', 'Building things with care & craft.', 'Footer tagline'),
  ('meta_title', 'Your Name — Developer', 'SEO meta title'),
  ('meta_description', 'Full Stack Developer based in Jakarta', 'SEO meta description');

INSERT INTO tech_stack (name, category, proficiency, years_experience, is_primary, sort_order) VALUES
  ('Next.js', 'Frontend', 95, 3, true, 1),
  ('TypeScript', 'Frontend', 90, 3, true, 2),
  ('React', 'Frontend', 95, 4, true, 3),
  ('Tailwind CSS', 'Frontend', 90, 3, true, 4),
  ('Node.js', 'Backend', 85, 3, true, 5),
  ('PostgreSQL', 'Database', 80, 2, false, 6),
  ('Supabase', 'Database', 85, 2, true, 7),
  ('Docker', 'DevOps', 70, 2, false, 8),
  ('Git', 'Tools', 95, 5, false, 9),
  ('Figma', 'Design', 75, 2, false, 10);

INSERT INTO work_experience (company, role, employment_type, start_date, end_date, is_current, location, location_type, description, responsibilities, tech_used, sort_order) VALUES
  ('Tech Company', 'Senior Frontend Developer', 'Full-time', '2023-01-01', NULL, true, 'Jakarta', 'Hybrid',
   'Leading frontend development for core product features.',
   ARRAY['Lead frontend architecture and development', 'Mentor junior developers', 'Collaborate with design team'],
   ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind'],
   1),
  ('Startup Inc', 'Frontend Developer', 'Full-time', '2021-06-01', '2022-12-31', false, 'Jakarta', 'Remote',
   'Built and maintained multiple client-facing web applications.',
   ARRAY['Developed responsive web interfaces', 'Integrated REST APIs', 'Improved performance metrics'],
   ARRAY['React', 'Vue.js', 'JavaScript', 'CSS'],
   2);

INSERT INTO projects (title, slug, short_description, category, status, tech_stack, github_url, live_url, is_featured, sort_order) VALUES
  ('Portfolio CMS', 'portfolio-cms', 'A dynamic portfolio with built-in CMS for easy content management', 'personal', 'completed',
   ARRAY['Next.js', 'Supabase', 'Tailwind', 'TypeScript'], 'https://github.com/yourusername/portfolio', 'https://yourname.dev', true, 1),
  ('Company Dashboard', 'company-dashboard', 'Internal analytics dashboard for real-time business insights', 'company', 'completed',
   ARRAY['React', 'Node.js', 'PostgreSQL', 'Chart.js'], NULL, NULL, true, 2),
  ('E-commerce Platform', 'ecommerce-platform', 'Full-stack e-commerce solution with payment integration', 'personal', 'completed',
   ARRAY['Next.js', 'Stripe', 'Supabase', 'TypeScript'], 'https://github.com/yourusername/ecommerce', 'https://shop.example.com', false, 3);
