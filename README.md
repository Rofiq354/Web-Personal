# 🎨 Personal Portfolio — Next.js + Supabase

A modern, minimalist personal portfolio with a built-in CMS admin panel. All content is managed through the admin dashboard and stored in Supabase PostgreSQL.

## ✨ Features

- **Dynamic Content** — All content (profile, projects, experience, tech stack) loaded from Supabase
- **Admin CMS Panel** — Add, edit, delete content without touching code
- **Dark Mode** — Smooth light/dark theme switching with `next-themes`
- **Initial Loader** — Animated intro screen on first visit (session-based)
- **Page Transitions** — Consistent loading states using Next.js Suspense
- **Responsive** — Mobile-first design, works on all screen sizes
- **Projects Split** — Separate views for Personal and Company projects
- **GitHub & Live Links** — Project cards link to GitHub or live preview

## 🎨 Color Palette

| Name    | Hex       | Usage                          |
|---------|-----------|--------------------------------|
| Navy    | `#1A3263` | Primary, headings, dark bg     |
| Steel   | `#547792` | Secondary, muted elements      |
| Amber   | `#FAB95B` | Accent, CTAs, highlights       |
| Cream   | `#E8E2DB` | Background (light), text (dark)|

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the entire contents of `schema.sql`
3. Go to **Settings > API** and copy your Project URL and Anon key

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home / Landing page
│   ├── about/page.tsx        # About me page
│   ├── projects/page.tsx     # Projects (Personal + Company tabs)
│   ├── experience/page.tsx   # Work experience timeline
│   ├── techstack/page.tsx    # Tech stack by category
│   └── admin/
│       ├── page.tsx          # Admin dashboard
│       ├── profile/          # Edit profile info
│       ├── projects/         # Manage projects (CRUD)
│       ├── experience/       # Manage work experience (CRUD)
│       ├── techstack/        # Manage tech stack (CRUD)
│       └── settings/         # Site-wide text settings
├── components/
│   ├── navbar.tsx            # Navigation bar with dark mode toggle
│   ├── footer.tsx            # Site footer (server component)
│   ├── initial-loader.tsx    # First-visit animated loader
│   ├── page-loader.tsx       # Page transition loader
│   ├── project-card.tsx      # Project display card
│   ├── experience-card.tsx   # Work experience card
│   └── tech-badge.tsx        # Technology badge
├── lib/
│   ├── supabase.ts           # Supabase client setup
│   └── utils.ts              # Utility functions
└── schema.sql                # Database schema + seed data
```

## 🔐 Admin Access

Navigate to `/admin` to access the CMS dashboard.

> **Note:** Currently using public Supabase client with RLS policies. For production, consider adding Supabase Auth to protect the `/admin` route.

### Adding Supabase Auth (recommended for production)

1. Enable Email Auth in Supabase Dashboard > Authentication
2. Create an admin user
3. Add middleware to protect `/admin` routes
4. Use `createServerComponentClient` with session checking

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + custom palette
- **Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Fonts**: Playfair Display + Sora + JetBrains Mono
- **Theme**: next-themes (system + manual toggle)

## 📝 Customization

### Updating Colors

Edit `tailwind.config.ts` — the color palette is fully configured there.

### Adding New Sections

1. Create a new table in Supabase
2. Add types to `types/index.ts`
3. Create the page component in `app/`
4. Add admin CRUD page in `app/admin/`
5. Add nav link to `components/navbar.tsx`

### Deployment

Deploy to Vercel:
```bash
npm run build
# or connect your repo to Vercel for automatic deploys
```

Add your env variables in Vercel's dashboard.
