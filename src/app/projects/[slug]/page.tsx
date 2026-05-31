import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import { FadeUp } from "@/components/ui/motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
    include: { architectures: true }, 
  });

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pb-24 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="px-6 py-8 max-w-5xl mx-auto">
        <FadeUp>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-400 hover:text-foreground dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </FadeUp>
      </nav>

      {/* Header (Hero) */}
      <header className="px-6 max-w-5xl mx-auto mb-16">
        <FadeUp delay={0.1}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{project.title}</h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-xl text-zinc-700 dark:text-zinc-400 mb-8 leading-relaxed max-w-3xl">
            {project.overview}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap gap-4 items-center">
            
            {/* GitHub Button with Hover Popup */}
            {project.githubUrl && (
              <HoverCard openDelay={50} closeDelay={50}>
                <HoverCardTrigger asChild>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-card dark:bg-zinc-900 hover:bg-muted dark:hover:bg-zinc-800 rounded-full text-sm font-medium transition-colors border border-border dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700">
                    <GithubIcon className="w-4 h-4" /> View Source
                  </a>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" className="w-64 bg-popover dark:bg-zinc-950 border-border dark:border-zinc-800 p-4 shadow-2xl dark:shadow-black rounded-xl animate-in zoom-in-95 duration-100 mt-2">
                  <h4 className="text-sm font-semibold text-popover-foreground dark:text-white flex items-center gap-2 mb-1">
                    <GithubIcon className="w-4 h-4" /> Repository
                  </h4>
                  <p className="text-xs text-zinc-700 dark:text-zinc-400">View the source code, commit history, and technical implementation details on GitHub.</p>
                </HoverCardContent>
              </HoverCard>
            )}

            {/* Live Deployment Button with Hover Popup */}
            {project.liveUrl && (
              <HoverCard openDelay={50} closeDelay={50}>
                <HoverCardTrigger asChild>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background hover:bg-foreground/90 rounded-full text-sm font-medium transition-colors shadow-lg shadow-foreground/10">
                    <ExternalLink className="w-4 h-4" /> Live Deployment
                  </a>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" className="w-64 bg-popover dark:bg-zinc-950 border-border dark:border-zinc-800 p-4 shadow-2xl dark:shadow-black rounded-xl animate-in zoom-in-95 duration-100 mt-2">
                  <h4 className="text-sm font-semibold text-popover-foreground dark:text-white flex items-center gap-2 mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Live Deployment
                  </h4>
                  <p className="text-xs text-zinc-700 dark:text-zinc-400">Interact with the deployed production environment for this system.</p>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </FadeUp>
      </header>

      {/* Horizontal Scroll Architecture Gallery */}
      {project.architectures.length > 0 && (
        <section className="mb-24">
          <FadeUp delay={0.4}>
            <div className="px-6 max-w-5xl mx-auto mb-6">
              <h2 className="text-2xl font-semibold">System Architecture</h2>
            </div>
            
            <div className="flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory hide-scroll-bar">
              <div className="shrink-0 w-[calc((100vw-64rem)/2)] hidden xl:block" />
              
              {project.architectures.map((arch) => (
                <div key={arch.id} className="shrink-0 w-[85vw] md:w-[700px] snap-center rounded-xl bg-card dark:bg-zinc-950 border border-border dark:border-zinc-800 overflow-hidden flex flex-col shadow-2xl">
                  
                  {/* Engineered Image Container with Blueprint Grid */}
                  <div className="relative p-8 flex-grow flex items-center justify-center min-h-[350px] md:min-h-[450px] border-b border-border dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#71717a18_1px,transparent_1px),linear-gradient(to_bottom,#71717a18_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={arch.imageUrl} 
                      alt={arch.title} 
                      className="relative z-10 w-full h-full object-contain drop-shadow-2xl max-h-[400px]" 
                    />
                  </div>
                  
                  <div className="p-6 bg-card dark:bg-zinc-900">
                    <h3 className="text-xl font-bold mb-2">{arch.title}</h3>
                    <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4">{arch.description}</p>
                    
                    {/* Highlighted Video Button with Popup */}
                    {arch.videoUrl && (
                      <HoverCard openDelay={50} closeDelay={50}>
                        <HoverCardTrigger asChild>
                          <a href={arch.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 rounded-full text-sm font-medium transition-all duration-150 border border-blue-500/20 hover:border-blue-500/50">
                            <PlayCircle className="w-4 h-4" /> Watch explanation
                          </a>
                        </HoverCardTrigger>
                        <HoverCardContent side="top" className="w-64 bg-popover dark:bg-zinc-950 border-border dark:border-zinc-800 p-4 shadow-2xl dark:shadow-black rounded-xl animate-in zoom-in-95 duration-100">
                          <div className="space-y-3">
                            <div className="w-full h-24 bg-muted dark:bg-black rounded-lg flex items-center justify-center border border-border dark:border-zinc-800 relative overflow-hidden">
                              <PlayCircle className="w-8 h-8 text-zinc-600 dark:text-zinc-700" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-popover-foreground dark:text-white">Video Walkthrough</h4>
                              <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-1">
                                Watch a detailed explanation of this specific system diagram.
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-6" /> 
            </div>
          </FadeUp>
        </section>
      )}

      {/* Detail Sections Container */}
      <div className="px-6 max-w-3xl mx-auto space-y-20">
        
        {project.engineeringDecisions && (
          <FadeUp>
            <section>
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border dark:border-zinc-900">Engineering Decisions</h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {project.engineeringDecisions}
              </div>
            </section>
          </FadeUp>
        )}

        {project.codeWalkthrough && (
          <FadeUp>
            <section>
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border dark:border-zinc-900">Code Walkthrough</h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {project.codeWalkthrough}
              </div>
            </section>
          </FadeUp>
        )}

        {project.lessonsLearned && (
          <FadeUp>
            <section>
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-border dark:border-zinc-900">Lessons Learned</h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {project.lessonsLearned}
              </div>
            </section>
          </FadeUp>
        )}
      </div>
    </div>
  );
}
