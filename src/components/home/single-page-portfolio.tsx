"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Download, ExternalLink, FileText, Mail, Play, Printer, Video } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import styles from "./single-page-portfolio.module.css";

type Profile = {
  name: string;
  headline: string;
  bio: string;
  skills: string[];
  github: string | null;
  linkedin: string | null;
  xUrl: string | null;
  youtube: string | null;
  email: string | null;
} | null;

type Project = {
  id: string;
  title: string;
  shortDescription: string;
  overview: string;
  githubUrl: string | null;
  liveUrl: string | null;
  canvaEmbedUrl: string | null;
  featured: boolean;
  showCanvaEmbed: boolean;
  showArchitecture: boolean;
  showArchitectureVideo: boolean;
  techStack: string[];
  architectures: {
    id: string;
    title: string;
    videoUrl: string | null;
    excalidrawUrl: string | null;
  }[];
};

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

type SinglePagePortfolioProps = {
  projects: Project[];
  profile: Profile;
  experiences: Experience[];
};

const resumeUrl =
  "https://drive.google.com/file/d/1Bkht48cJ5eVZtWqgo8gVzfRM7tqGswT_/view?usp=drive_link";

export function SinglePagePortfolio({ projects, profile, experiences }: SinglePagePortfolioProps) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pageRef.current || !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = pageRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(styles.pending);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top > window.innerHeight) {
        section.classList.add(styles.pending);
      }
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const name = profile?.name || "Sai Sathwik Banala";
  const headline = profile?.headline || "AI Engineer";
  const bio = profile?.bio ||
    "AI Engineer focused on building AI-powered systems, agentic workflows, and scalable backend infrastructure.";
  const positioning = bio.match(/^[^.!?]+[.!?]?/)?.[0] || headline;
  const aboutText = bio.slice(positioning.length).trim() || bio;
  const skills = profile?.skills ?? [];
  const email = profile?.email?.trim();

  return (
    <div className={styles.canvas}>
    <main ref={pageRef} className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.gridArt} aria-hidden="true">
          <i className={styles.gridDot} /><i className={styles.gridDot} /><i className={styles.gridDot} />
        </div>
        <span className={styles.signature} aria-hidden="true">SB</span>
        <div className={styles.heroCopy}>
          <p className={styles.overline}>portfolio / {headline}</p>
          <h1>Hi, I&apos;m {name}</h1>
          <p className={styles.subtitle}>{positioning}</p>
          <div className={styles.socialLinks} aria-label="Contact and social links">
            {profile?.github && <IconLink href={profile.github} label="GitHub" icon={<GithubIcon />} />}
            {profile?.linkedin && <IconLink href={profile.linkedin} label="LinkedIn" icon={<LinkedinIcon />} />}
            {profile?.xUrl && <IconLink href={profile.xUrl} label="X" icon={<span className={styles.xIcon} aria-hidden="true" />} />}
            {profile?.youtube && <IconLink href={profile.youtube} label="YouTube" icon={<Video />} />}
            {email && <IconLink href={`mailto:${email}`} label="Email" icon={<Mail />} />}
            <IconLink href={resumeUrl} label="Résumé" icon={<Download />} />
          </div>
        </div>
      </header>

      <section id="about" className={styles.section} data-reveal aria-labelledby="about-title">
        <SectionTitle id="about-title">About</SectionTitle>
        <p className={styles.aboutText}>{aboutText}</p>
      </section>

      {experiences.length > 0 && (
        <section id="experience" className={styles.section} data-reveal aria-labelledby="experience-title">
          <SectionTitle id="experience-title">Experience</SectionTitle>
          <div className={styles.timeline}>
            {experiences.map((experience) => (
              <article className={styles.timelineEntry} key={experience.id}>
                <div className={styles.timelineDate}>{experience.period}</div>
                <div className={styles.timelineBody}>
                  <h3>{experience.company}</h3>
                  <p className={styles.role}>{experience.role}</p>
                  {experience.summary && <p className={styles.entryDescription}>{experience.summary}</p>}
                  {experience.highlights.length > 0 && (
                    <ul className={styles.highlights} aria-label={`${experience.company} highlights`}>
                      {experience.highlights.map((highlight, index) => <li key={`${index}-${highlight}`}>{highlight}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section id="skills" className={styles.section} data-reveal aria-labelledby="skills-title">
          <SectionTitle id="skills-title">Skills</SectionTitle>
          <ul className={styles.skills} aria-label="Technical skills">
            {skills.map((skill, index) => <li key={`${index}-${skill}`}>{skill}</li>)}
          </ul>
        </section>
      )}

      {projects.length > 0 && (
        <section id="projects" className={`${styles.section} ${styles.projects}`} data-reveal aria-labelledby="projects-title">
          <SectionTitle id="projects-title">Selected projects</SectionTitle>
          {projects.map((project, index) => <ProjectEntry key={project.id} project={project} number={index + 1} />)}
        </section>
      )}

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} {name}</span>
        <button type="button" className={styles.printButton} onClick={() => window.print()}>
          <Printer aria-hidden="true" /> Print résumé
        </button>
      </footer>
    </main>
    </div>
  );
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id} className={styles.sectionTitle}>{children}</h2>;
}

function IconLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  const external = !href.startsWith("mailto:");
  return (
    <a className={styles.iconLink} href={href} target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}>{icon}<span>{label}</span></a>
  );
}

function ProjectEntry({ project, number }: { project: Project; number: number }) {
  const firstArchitecture = project.architectures[0];
  // The previous nonfeatured cards showed these links independently of embed visibility.
  const videoLinks = project.featured
    ? project.showArchitectureVideo ? project.architectures.filter((item) => item.videoUrl).slice(0, 1) : []
    : firstArchitecture?.videoUrl ? [firstArchitecture] : [];
  const architectureLinks = !project.featured && firstArchitecture?.excalidrawUrl
    ? [firstArchitecture] : [];
  const deckUrl = project.canvaEmbedUrl && (!project.featured || project.showCanvaEmbed)
    ? getCanvaEmbedUrl(project.canvaEmbedUrl) : null;

  return (
    <article className={styles.project}>
      <span className={styles.projectNumber} aria-hidden="true">{String(number).padStart(2, "0")}</span>
      <div className={styles.projectBody}>
        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>
        {project.overview && project.overview.trim() !== project.shortDescription.trim() && <p>{project.overview}</p>}
        {project.techStack.length > 0 && (
          <ul className={styles.projectTech} aria-label={`${project.title} technologies`}>
            {project.techStack.map((tech, index) => <li key={`${index}-${tech}`}>{tech}</li>)}
          </ul>
        )}
        <div className={styles.projectLinks}>
          {project.githubUrl && <ProjectLink href={project.githubUrl} label="Code" icon={<GithubIcon />} />}
          {project.liveUrl && <ProjectLink href={project.liveUrl} label="Live" icon={<ExternalLink />} />}
          {videoLinks.map((item) => <ProjectLink key={item.id} href={item.videoUrl!}
            label={videoLinks.length > 1 ? `Demo video: ${item.title}` : "Live Demo Video"} icon={<Play />} />)}
          {deckUrl && <ProjectLink href={deckUrl} label="Explanation" icon={<FileText />} />}
          {architectureLinks.map((item) => <ProjectLink key={item.id} href={item.excalidrawUrl!}
            label={architectureLinks.length > 1 ? `Architecture: ${item.title}` : "Architecture"} icon={<ExternalLink />} />)}
          <a className={styles.projectLink} href={`/projects/${project.id}`}>Details <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  );
}

function ProjectLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return <a className={styles.projectLink} href={href} target="_blank" rel="noopener noreferrer">{icon}{label}</a>;
}

function getCanvaEmbedUrl(url: string) {
  if (url.includes("canva.com") && !url.includes("embed")) {
    return url.includes("?") ? `${url}&embed` : `${url}?embed`;
  }
  return url;
}
