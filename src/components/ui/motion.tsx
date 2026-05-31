"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// For sections that slide up as you scroll down
export function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        type: "spring",
        stiffness: 250, // Higher stiffness = faster snap
        damping: 25,
        delay: delay,
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
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.05 }, // Super fast 50ms stagger
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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}