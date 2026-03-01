"use client";

import { motion } from "framer-motion";
import { Profile } from "@/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaHeart, FaLinkedin } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { MdAttachEmail, MdEmail } from "react-icons/md";
import { FaThreads } from "react-icons/fa6";

const fadeUp = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function FooterMotion({
  profile,
  footerTagline,
}: {
  profile: Profile | null;
  footerTagline: string;
}) {
  const currentYear = new Date().getFullYear();
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Tech Stack", href: "/techstack" },
    { label: "About", href: "/about" },
  ];

  const socialLinks = [
    profile?.github_url && {
      icon: FaGithub,
      href: profile.github_url,
      label: "GitHub",
    },
    profile?.linkedin_url && {
      icon: FaLinkedin,
      href: profile.linkedin_url,
      label: "LinkedIn",
    },
    profile?.twitter_url && {
      icon: FaThreads,
      href: profile.twitter_url,
      label: "Twitter",
    },
  ].filter(Boolean) as {
    icon: React.ComponentType<{ size: number }>;
    href: string;
    label: string;
  }[];
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0 }}
            className="space-y-4"
          >
            <Link
              href="/"
              className="font-display text-xl font-bold text-foreground hover:text-amber transition-colors"
            >
              <span className="text-amber">{"<"}</span>
              {profile?.name || "Portfolio"}
              <span className="text-amber">{" />"}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {footerTagline}
            </p>
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Get in Touch
            </h3>
            {profile?.email && (
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <MdAttachEmail size={14} className="text-amber" />
                {profile.email}
                <ExternalLink
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            )}
            {profile?.location && (
              <p className="text-sm text-muted-foreground">
                <ImLocation2 size={14} className="text-amber inline-block" />{" "}
                {profile.location}
              </p>
            )}
            {profile?.open_to_work && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-medium border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to work
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {currentYear} {profile?.name || "Portfolio"}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with
            <span className="text-amber">
              <FaHeart />
            </span>
            using Next.js & Supabase
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
