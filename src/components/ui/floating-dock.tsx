"use client";

import Link from "next/link";
import { Home, Mail, Sun, Moon } from "lucide-react";
import { GithubIcon } from "./github-icon";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { LinkedinIcon } from "./linkedin-icon";

type DockProfile = {
  github?: string | null;
  linkedin?: string | null;
  xUrl?: string | null;
  email?: string | null;
};

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Custom X (Twitter) Icon since Lucide removed brand icons
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export function FloatingDock({ profile }: { profile: DockProfile | null }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ y: 28, opacity: 0, scale: 0.96 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.8 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 px-4 py-3 rounded-full bg-white/75 dark:bg-black/70 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_70px_rgba(0,0,0,0.55)] transition-colors duration-500">
        
        <Link href="/" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
          <Home className="w-5 h-5" />
        </Link>

        <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-800 mx-2" />

        {profile?.github && (
          <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
            <GithubIcon className="w-5 h-5" />
          </a>
        )}
        
        {profile?.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
           <LinkedinIcon className="w-5 h-5" />
          </a>
        )}

        {profile?.xUrl && (
          <a href={profile.xUrl} target="_blank" rel="noreferrer" className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
            <XIcon className="w-4 h-4" />
          </a>
        )}

        {profile?.email && (
          <a href={`mailto:${profile.email}`} className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95">
            <Mail className="w-5 h-5" />
          </a>
        )}

        <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-800 mx-2" />

        <button 
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95"
          aria-label="Toggle theme"
        >
          <motion.span
            key={resolvedTheme}
            initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="block"
          >
            {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.span>
        </button>

      </div>
    </motion.div>
  );
}
