"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "../types/types";
import ProjectCard from "./ProjectCard";

interface ProjectCardListProps {
  projects: Project[];
}

// Container variants for the parent <ul>
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      // Stagger the appearance of each child <li>
      staggerChildren: 0.1,
      // Optional initial delay before the first child animates in
      delayChildren: 0.5,
    },
  },
};

// Child variants for each <li>
const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const ProjectCardList = ({ projects }: ProjectCardListProps) => {
  const ref = useRef(null);
  // This Framer Motion hook returns true once the ref is in view
  // { once: true } => triggers only once
  const isInView = useInView(ref, { once: true });

  return (
    <motion.ul
      ref={ref}
      className="space-y-6"
      // Tie in our container variants
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {projects.map((project, index) => (
        <motion.li key={index} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default ProjectCardList;
