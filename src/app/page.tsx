import { SinglePagePortfolio } from "@/components/home/single-page-portfolio";
import { parseList } from "@/lib/list-fields";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, profile, experiences] = await Promise.all([
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
      include: {
        architectures: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            videoUrl: true,
            excalidrawUrl: true,
          },
        },
      },
    }),
    prisma.profile.findFirst(),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <SinglePagePortfolio
      projects={projects.map((project) => ({
        ...project,
        techStack: parseList(project.techStack),
      }))}
      profile={
        profile
          ? {
              ...profile,
              skills: parseList(profile.skills),
            }
          : null
      }
      experiences={experiences.map((experience) => ({
        ...experience,
        highlights: parseList(experience.highlights),
      }))}
    />
  );
}
