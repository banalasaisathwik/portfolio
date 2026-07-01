import { SinglePagePortfolio } from "@/components/home/single-page-portfolio";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, profile, experiences] = await Promise.all([
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        architectures: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            videoUrl: true,
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
      projects={projects}
      profile={profile}
      experiences={experiences}
    />
  );
}
