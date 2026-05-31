"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const premiumEase = [0.22, 1, 0.36, 1] as const;

// For sections that drift into place as you scroll down
export function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: premiumEase,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// For grids/lists to animate one after the other rapidly
export function StaggerContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.04 },
        },
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: premiumEase },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
