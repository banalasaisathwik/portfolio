"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Maximize2,
  Menu,
  Play,
  Presentation,
  Sparkles,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { LinkedinIcon } from "@/components/ui/linkedin-icon";
import { cn } from "@/lib/utils";

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
    description: string;
    imageUrl: string;
    videoUrl: string | null;
    excalidrawUrl: string | null;
  }[];
};

type SinglePagePortfolioProps = {
  projects: Project[];
  profile: Profile;
  experiences: Experience[];
};

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

const fallbackSkills = [
  "RAG",
  "Agentic AI",
  "Distributed Systems",
  "Backend",
  "Observability",
];
const resumeUrl =
  "https://drive.google.com/file/d/1Bkht48cJ5eVZtWqgo8gVzfRM7tqGswT_/view?usp=drive_link";
const fallbackExperiences = [
  {
    id: "fallback-ai-engineer",
    role: "AI Engineer",
    company: "Company Name",
    period: "Jan 2024 - Present",
    summary:
      "Building AI-powered systems, agentic workflows, and scalable backend services for production use cases.",
    highlights: ["RAG systems", "Backend APIs", "Observability"],
  },
  {
    id: "fallback-backend-engineer",
    role: "Backend Engineer",
    company: "Company Name",
    period: "Previous Role",
    summary:
      "Designed reliable service layers, data models, and integrations for high-throughput product workflows.",
    highlights: ["PostgreSQL", "Distributed systems", "TypeScript"],
  },
];

export function SinglePagePortfolio({
  projects,
  profile,
  experiences,
}: SinglePagePortfolioProps) {
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    [projects],
  );
  const otherProjects = useMemo(
    () => projects.filter((project) => !project.featured),
    [projects],
  );
  const [selectedProjectId, setSelectedProjectId] = useState(
    featuredProjects[0]?.id,
  );

  const selectedProject =
    featuredProjects.find((project) => project.id === selectedProjectId) ??
    featuredProjects[0];

  const name = profile?.name ?? "Sai Sathwik Banala";
  const initials = getInitials(name);
  const headline = profile?.headline ?? "AI Engineer";
  const bio =
    profile?.bio ??
    "AI Engineer focused on building AI-powered systems, agentic workflows, and scalable backend infrastructure.";
  const skills = profile?.skills?.length ? profile.skills : fallbackSkills;
  const email = profile?.email ?? "hello@example.com";
  const experienceItems =
    experiences.length > 0 ? experiences : fallbackExperiences;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfbfd] text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(126,87,255,0.13),transparent_28rem),radial-gradient(circle_at_80%_8%,rgba(14,165,233,0.09),transparent_24rem)]" />
      <TopNav name={name} initials={initials} />

      <section
        id="home"
        className="mx-auto flex w-full max-w-[720px] flex-col px-5 pb-4 pt-24 sm:px-8 md:max-w-[1180px] md:pb-8 lg:pt-32"
      >
        <div id="about" className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge
            variant="secondary"
            className="h-8 gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 text-slate-800 shadow-sm"
          >
            <span className="size-2 rounded-full bg-violet-400" />
            {headline}
          </Badge>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.02em] text-slate-950 sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <br />
            {name}.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
              >
                <Sparkles className="size-3.5 text-violet-500" />
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-xl px-5">
              <a href="#projects">
                Explore Projects
                <ArrowUpRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-slate-200 bg-white px-5 text-slate-950 shadow-sm hover:bg-slate-50"
            >
              <a href={resumeUrl} target="_blank" rel="noreferrer">
                View Resume
                <Download className="ml-2 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto w-full max-w-[720px] px-5 py-4 sm:px-8 md:max-w-[1180px] md:py-8">
        {featuredProjects.length > 0 && selectedProject ? (
          <div className="grid gap-3 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-2xl border border-slate-200 bg-white/86 p-3 shadow-sm backdrop-blur md:p-4">
              <div className="mb-5 flex items-center gap-3">
                <BriefcaseBusiness className="size-5 text-slate-700" />
                <div>
                  <h2 className="text-lg font-semibold">Projects</h2>
                  <p className="text-xs text-slate-500">
                    Select a featured project to explore in detail
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {featuredProjects.map((project, index) => {
                  const isSelected = selectedProject.id === project.id;

                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedProjectId(project.id)}
                      className={cn(
                        "group w-full rounded-xl border p-3 text-left transition duration-300 md:p-4",
                        isSelected
                          ? "border-violet-400 bg-violet-50/70 shadow-[0_18px_45px_rgba(124,58,237,0.12)]"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
                      )}
                    >
                      <div className="flex gap-3">
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                            isSelected
                              ? "bg-violet-600 text-white"
                              : "bg-violet-50 text-violet-600",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-base font-semibold leading-tight text-slate-950 md:text-lg">
                              {project.title}
                            </h3>
                            <ChevronRight className="mt-1 size-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5" />
                          </div>
                          <p
                            className={cn(
                              "mt-2 line-clamp-2 text-sm leading-6 text-slate-600 md:mt-3 md:line-clamp-3",
                              isSelected ? "block" : "hidden lg:block",
                            )}
                          >
                            {project.shortDescription}
                          </p>
                          <div
                            className={cn(
                              "mt-3 flex flex-wrap gap-2 md:mt-4",
                              isSelected ? "flex" : "hidden lg:flex",
                            )}
                          >
                            {project.techStack.slice(0, 4).map((tech) => (
                              <SmallTech key={tech} label={tech} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <FeaturedProjectPanel project={selectedProject} />
          </div>
        ) : null}

        {otherProjects.length > 0 ? (
          <div className={cn(featuredProjects.length > 0 && "mt-10")}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-violet-600">
                  More Projects
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                  Project cards
                </h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <SimpleProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <ExperienceSection experiences={experienceItems} />

      <section id="skills" className="mx-auto hidden w-full max-w-[720px] px-5 py-4 sm:px-8 md:block md:max-w-[1180px] md:py-8">
        <div className="rounded-2xl border border-slate-200 bg-white/82 p-6 shadow-sm">
          <p className="text-sm font-semibold text-violet-600">Skills</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[720px] px-5 py-4 sm:px-8 md:max-w-[1180px] md:py-8">
        <ContactCard
          email={email}
          github={profile?.github}
          linkedin={profile?.linkedin}
          xUrl={profile?.xUrl}
          youtube={profile?.youtube}
        />
      </section>

      <footer className="mx-auto w-full max-w-[720px] px-5 pb-6 text-center text-xs text-slate-500 sm:px-8 md:hidden">
        © 2024 {name}. All rights reserved.
      </footer>
    </main>
  );
}

function TopNav({ name, initials }: { name: string; initials: string }) {
  const links = ["Home", "Projects", "Experience", "Skills", "About", "Contact"];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-0 md:top-4 md:px-4">
      <nav className="mx-auto flex h-[68px] max-w-[720px] items-center justify-between rounded-none border-b border-slate-200 bg-white/90 px-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl md:h-16 md:max-w-[1120px] md:rounded-2xl md:border md:bg-white/86 md:px-4">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
            {initials}
          </span>
          <span className="truncate text-base font-semibold text-slate-950">
            {name}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              {link}
            </a>
          ))}
        </div>

        <Button asChild className="hidden h-11 rounded-xl bg-slate-950 px-4 text-white md:inline-flex">
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            View Resume
            <Download className="ml-2 size-4" />
          </a>
        </Button>
        <button
          type="button"
          aria-label="Open navigation"
          className="inline-flex size-10 items-center justify-center rounded-lg text-slate-950 transition hover:bg-slate-100 md:hidden"
        >
          <Menu className="size-7" />
        </button>
      </nav>
    </header>
  );
}

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[720px] px-5 py-4 sm:px-8 md:max-w-[1180px] md:py-8"
    >
      <div className="rounded-2xl border border-slate-200 bg-white/86 p-5 shadow-sm backdrop-blur md:p-7">
        <div className="mb-6 flex items-center gap-3">
          <BriefcaseBusiness className="size-5 text-slate-700" />
          <div>
            <p className="text-sm font-semibold text-violet-600">
              Experience
            </p>
            {/* <h2 className="text-2xl font-semibold tracking-tight">
              Work experience
            </h2> */}
          </div>
        </div>

        <div className="space-y-4">
          {experiences.map((experience) => (
            <article
              key={`${experience.role}-${experience.period}`}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md md:p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-serif text-xl font-semibold leading-tight text-slate-950">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {experience.company}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                  {experience.period}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {experience.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.highlights.map((highlight) => (
                  <SmallTech key={highlight} label={highlight} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectPanel({ project }: { project: Project }) {
  const architecture = project.architectures.find((item) => item.videoUrl);
  const loomEmbedUrl = project.showArchitectureVideo
    ? getVideoEmbedUrl(architecture?.videoUrl)
    : null;
  const canvaEmbedUrl =
    project.showCanvaEmbed && project.canvaEmbedUrl
      ? getCanvaEmbedUrl(project.canvaEmbedUrl)
      : null;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/86 p-3 shadow-sm backdrop-blur md:p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="size-2 rounded-full bg-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.14)]" />
            Project Deep Dive
          </div>
          <h2 className="font-serif text-2xl font-semibold text-slate-950">
            {project.title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap">
          {project.liveUrl ? (
            <Button asChild variant="outline" className="h-10 rounded-xl bg-white px-3">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Demo
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button asChild variant="outline" className="h-10 rounded-xl bg-white px-3">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <GithubIcon className="mr-2 size-4" />
                GitHub
              </a>
            </Button>
          ) : null}
          {canvaEmbedUrl ? (
            <Button asChild variant="outline" className="h-10 rounded-xl bg-white px-3">
              <a href={canvaEmbedUrl} target="_blank" rel="noreferrer">
                <FileText className="mr-2 size-4" />
                View Deck
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {loomEmbedUrl ? (
          <EmbedFrame
            title="Demo Walkthrough"
            icon={Play}
            src={loomEmbedUrl}
            fallbackTitle="Loom walkthrough"
          />
        ) : null}

        {canvaEmbedUrl ? (
          <EmbedFrame
            title="Architecture Deck (Canva)"
            icon={Presentation}
            src={canvaEmbedUrl}
            fallbackTitle="Canva architecture deck"
          />
        ) : null}

        {!loomEmbedUrl && !canvaEmbedUrl ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
            This featured project is ready for Loom and Canva embeds once URLs
            are added.
          </div>
        ) : null}
      </div>
    </article>
  );
}

function EmbedFrame({
  title,
  icon: Icon,
  src,
  fallbackTitle,
}: {
  title: string;
  icon: typeof Play;
  src: string;
  fallbackTitle: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Icon className="size-4 text-slate-600" />
          {title}
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${fallbackTitle}`}
          className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <Maximize2 className="size-4" />
        </a>
      </div>
      <div className="aspect-video bg-slate-100">
        <iframe
          src={src}
          title={fallbackTitle}
          className="size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function SimpleProjectCard({ project }: { project: Project }) {
  // NOTE: a project can have multiple `architectures` entries (e.g. one per
  // subsystem), but this compact card only has room for a single link, so we
  // surface the first entry's Excalidraw canvas and demo video. If projects
  // start using more than one architecture diagram each, this card should
  // either show one link per entry or link out to the project detail page's
  // architecture gallery instead of picking `[0]` here.
  const architectureUrl = project.architectures[0]?.excalidrawUrl ?? null;
  const demoVideoUrl = project.architectures[0]?.videoUrl ?? null;
  const explanationUrl = project.canvaEmbedUrl
    ? getCanvaEmbedUrl(project.canvaEmbedUrl)
    : null;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/86 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="font-serif text-xl font-semibold leading-tight text-slate-950">
        {project.title}
      </h3>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
        {project.shortDescription}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <SmallTech key={tech} label={tech} />
        ))}
      </div>
      {project.githubUrl ||
      project.liveUrl ||
      demoVideoUrl ||
      explanationUrl ||
      architectureUrl ? (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          {project.githubUrl ? (
            <Button asChild variant="outline" size="sm" className="h-8 rounded-lg bg-white px-2.5 text-xs">
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                <GithubIcon className="mr-1.5 size-3.5" />
                Code
              </a>
            </Button>
          ) : null}
          {project.liveUrl ? (
            <Button asChild variant="outline" size="sm" className="h-8 rounded-lg bg-white px-2.5 text-xs">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live
                <ExternalLink className="ml-1.5 size-3.5" />
              </a>
            </Button>
          ) : null}
          {demoVideoUrl ? (
            <Button asChild variant="outline" size="sm" className="h-8 rounded-lg bg-white px-2.5 text-xs">
              <a href={demoVideoUrl} target="_blank" rel="noreferrer">
                <Play className="mr-1.5 size-3.5" />
                Live Demo Video
              </a>
            </Button>
          ) : null}
          {explanationUrl ? (
            <Button asChild variant="outline" size="sm" className="h-8 rounded-lg bg-white px-2.5 text-xs">
              <a href={explanationUrl} target="_blank" rel="noreferrer">
                <FileText className="mr-1.5 size-3.5" />
                Explanation
              </a>
            </Button>
          ) : null}
          {architectureUrl ? (
            <Button asChild variant="outline" size="sm" className="h-8 rounded-lg bg-white px-2.5 text-xs">
              <a href={architectureUrl} target="_blank" rel="noreferrer">
                <Workflow className="mr-1.5 size-3.5" />
                Architecture
              </a>
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function ContactCard({
  email,
  github,
  linkedin,
  xUrl,
  youtube,
}: {
  email: string;
  github?: string | null;
  linkedin?: string | null;
  xUrl?: string | null;
  youtube?: string | null;
}) {
  return (
    <div id="contact" className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5 shadow-sm md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-12 items-center justify-center rounded-full border border-violet-200 bg-white text-slate-950 shadow-sm">
          <Mail className="size-5" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold">
            Let&apos;s build something impactful.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Open to full-time opportunities and exciting collaborations.
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Button asChild variant="outline" className="h-11 rounded-xl bg-white">
          <a href={`mailto:${email}`}>
            <Mail className="mr-2 size-4" />
            Email Me
          </a>
        </Button>
        {linkedin ? (
          <Button asChild variant="outline" className="h-11 rounded-xl bg-white">
            <a href={linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon className="mr-2 size-4" />
              LinkedIn
            </a>
          </Button>
        ) : null}
        {github ? (
          <Button asChild variant="outline" className="h-11 rounded-xl bg-white">
            <a href={github} target="_blank" rel="noreferrer">
              <GithubIcon className="mr-2 size-4" />
              GitHub
            </a>
          </Button>
        ) : null}
        {xUrl ? (
          <Button asChild variant="outline" className="h-11 rounded-xl bg-white">
            <a href={xUrl} target="_blank" rel="noreferrer">
              X
            </a>
          </Button>
        ) : null}
        {youtube ? (
          <Button asChild variant="outline" className="h-11 rounded-xl bg-white">
            <a href={youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
          </Button>
        ) : null}
        <Button asChild className="h-11 rounded-xl bg-slate-950 text-white">
          <a href={`mailto:${email}`}>
            Say Hello
            <ArrowUpRight className="ml-2 size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}

function SmallTech({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
      {label}
    </span>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getVideoEmbedUrl(url?: string | null) {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("loom.com")) {
      const shareMatch = parsedUrl.pathname.match(/\/share\/([^/?]+)/);
      const embedMatch = parsedUrl.pathname.match(/\/embed\/([^/?]+)/);
      const videoId = shareMatch?.[1] ?? embedMatch?.[1];
      return videoId ? `https://www.loom.com/embed/${videoId}` : url;
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }

    return url;
  } catch {
    return url;
  }
}

function getCanvaEmbedUrl(url: string) {
  if (url.includes("canva.com") && !url.includes("embed")) {
    return url.includes("?") ? `${url}&embed` : `${url}?embed`;
  }

  return url;
}
