import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, ExternalLink, PlayCircle } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
// Import our new animation wrappers
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion"; 

export default async function HomePage() {
  const allProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      architectures: { select: { videoUrl: true } },
    },
  });

  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 4);
  const archiveProjects = allProjects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* 1. Profile Section */}
      <section className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-zinc-500 font-semibold tracking-widest uppercase text-sm mb-4">
            Software Developer
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Hi, I'm <br /> B. Sai Sathwik.
          </h1>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed">
            I build high-performance applications and real-time systems. I thrive
            in high-intensity environments, tackling complex engineering
            challenges from transport layer mechanics to deep learning
            architectures.
          </p>
        </FadeUp>
      </section>

      {/* 2. Skills Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto border-t border-zinc-900">
        <FadeUp>
          <h3 className="text-xl font-semibold mb-6 text-white">Core Technologies</h3>
          <div className="flex flex-wrap gap-2.5">
            {['Next.js', 'WebRTC', 'Mediasoup', 'PyTorch', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'].map((skill, i) => (
              // Inline motion for snappy bubble entrance
              <span
                key={skill}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors duration-150 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* 3. Featured Systems */}
      {featuredProjects.length > 0 && (
        <section className="py-12 px-6 max-w-5xl mx-auto border-t border-zinc-900">
          <FadeUp>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-white">Featured Systems</h3>
            </div>
          </FadeUp>

          {/* Stagger Container wraps the grid */}
          <StaggerContainer>
            {featuredProjects.map((project) => {
              const hasVideo = project.architectures.some((arch) => arch.videoUrl !== null);

              return (
                <StaggerItem key={project.id}>
                  {/* Reduced transition duration to 150ms for instant hover response */}
                  <div className="group relative flex flex-col h-full rounded-xl bg-zinc-900 border border-zinc-800 p-6 hover:bg-zinc-800/80 hover:border-zinc-600 transition-all duration-150 ease-out shadow-lg hover:shadow-2xl hover:shadow-black/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-150">
                        <Link href={`/projects/${project.slug}`} className="before:absolute before:inset-0 z-10">
                          {project.title}
                        </Link>
                      </h4>

                      <div className="flex gap-4 text-zinc-500 relative z-20">
                        {project.githubUrl && (
                          <HoverCard openDelay={50} closeDelay={50}>
                            <HoverCardTrigger asChild>
                              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all duration-150">
                                <GithubIcon className="w-5 h-5" />
                              </a>
                            </HoverCardTrigger>
                            <HoverCardContent side="top" className="w-64 bg-zinc-950 border-zinc-800 p-4 shadow-2xl shadow-black rounded-xl animate-in zoom-in-95 duration-100">
                              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-1">
                                <GithubIcon className="w-4 h-4" /> Repository
                              </h4>
                              <p className="text-xs text-zinc-400">View source code on GitHub.</p>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                        {/* Repeat fast transition patterns for Live Link and Video... */}
                        {project.liveUrl && (
                          <HoverCard openDelay={50} closeDelay={50}>
                            <HoverCardTrigger asChild>
                              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all duration-150">
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            </HoverCardTrigger>
                            <HoverCardContent side="top" className="w-64 bg-zinc-950 border-zinc-800 p-4 shadow-2xl shadow-black rounded-xl animate-in zoom-in-95 duration-100">
                              <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-1">
                                <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span></span> Live Deployment
                              </h4>
                              <p className="text-xs text-zinc-400">Interact with the deployed system.</p>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                        {hasVideo && (
                          <HoverCard openDelay={50} closeDelay={50}>
                            <HoverCardTrigger asChild>
                              <Link href={`/projects/${project.slug}`} className="cursor-pointer text-zinc-300 hover:text-white hover:scale-110 transition-all duration-150">
                                <PlayCircle className="w-5 h-5" />
                              </Link>
                            </HoverCardTrigger>
                            <HoverCardContent side="top" className="w-64 bg-zinc-950 border-zinc-800 p-4 shadow-2xl shadow-black rounded-xl animate-in zoom-in-95 duration-100">
                              <h4 className="text-sm font-semibold text-white mb-1">Architecture Breakdown</h4>
                              <p className="text-xs text-zinc-400">Contains video explanation. Click to open.</p>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto relative z-20">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs font-mono text-zinc-500 bg-black px-2 py-1 rounded-md border border-zinc-800/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      {/* 4. System Archive */}
      {archiveProjects.length > 0 && (
        <section className="py-12 px-6 max-w-5xl mx-auto border-t border-zinc-900">
          <FadeUp>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-white">System Archive</h3>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex flex-col max-h-[500px] overflow-y-auto hide-scroll-bar pr-2">
              {archiveProjects.map((project) => {
                const hasVideo = project.architectures.some((arch) => arch.videoUrl !== null);
                return (
                  <div 
                    key={project.id} 
                    className="group relative flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-zinc-900 hover:bg-zinc-900 transition-colors duration-150 px-4 -mx-4 rounded-lg"
                  >
                    <div className="mb-4 md:mb-0 max-w-xl pr-4">
                      <h4 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors duration-150">
                        <Link href={`/projects/${project.slug}`} className="before:absolute before:inset-0 z-10">
                          {project.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-zinc-500 line-clamp-2 mt-1">
                        {project.shortDescription}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-6 relative z-20">
                      {/* Compact Hover Icons */}
                      <div className="flex gap-4 text-zinc-500">
                        {project.githubUrl && (
                          <HoverCard openDelay={50} closeDelay={50}>
                            <HoverCardTrigger asChild>
                              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all duration-150"><GithubIcon className="w-4 h-4" /></a>
                            </HoverCardTrigger>
                            <HoverCardContent side="top" className="w-64 bg-zinc-950 border-zinc-800 p-3 shadow-xl rounded-xl animate-in zoom-in-95 duration-100"><p className="text-xs text-zinc-300">View source code on GitHub.</p></HoverCardContent>
                          </HoverCard>
                        )}
                        {project.liveUrl && (
                          <HoverCard openDelay={50} closeDelay={50}>
                            <HoverCardTrigger asChild>
                              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all duration-150"><ExternalLink className="w-4 h-4" /></a>
                            </HoverCardTrigger>
                            <HoverCardContent side="top" className="w-64 bg-zinc-950 border-zinc-800 p-3 shadow-xl rounded-xl animate-in zoom-in-95 duration-100"><p className="text-xs text-zinc-300">Interact with deployed system.</p></HoverCardContent>
                          </HoverCard>
                        )}
                        {hasVideo && (
                          <HoverCard openDelay={50} closeDelay={50}>
                            <HoverCardTrigger asChild>
                              <Link href={`/projects/${project.slug}`} className="cursor-pointer text-zinc-300 hover:text-white hover:scale-110 transition-all duration-150"><PlayCircle className="w-4 h-4" /></Link>
                            </HoverCardTrigger>
                            <HoverCardContent side="top" className="w-64 bg-zinc-950 border-zinc-800 p-3 shadow-xl rounded-xl animate-in zoom-in-95 duration-100"><p className="text-xs text-zinc-300">Contains architecture video.</p></HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                      
                      <div className="hidden md:flex gap-2">
                        {project.techStack.slice(0, 2).map((tech) => (
                          <span key={tech} className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 border border-zinc-800 bg-zinc-900/50 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-700 group-hover:text-white transition-colors duration-150 group-hover:translate-x-1 z-20 relative pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        </section>
      )}

      {/* 5. Collaborate Section */}
      <section className="py-24 px-6 border-t border-zinc-900 text-center">
        <FadeUp>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Let's build something.</h3>
            <p className="text-lg text-zinc-400 mb-8">
              Always open to discussing deep tech, real-time web architecture, and highly scalable systems.
            </p>
            <a href="mailto:your.email@example.com" className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 active:scale-95 transition-transform duration-150 relative z-20">
              Open to Collaborate
            </a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}