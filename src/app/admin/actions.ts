"use server";

import prisma from "@/lib/prisma";
import { stringifyList } from "@/lib/list-fields";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function createArchitectureFromLoom(formData: FormData, projectTitle: string) {
  const loomVideoUrl = (formData.get("loomVideoUrl") as string | null)?.trim();

  if (!loomVideoUrl) return [];

  return [
    {
      title: `${projectTitle} demo walkthrough`,
      description: "Loom demo walkthrough for the featured project.",
      videoUrl: loomVideoUrl,
      imageUrl: "/window.svg",
    },
  ];
}

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw
    ? techStackRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const githubUrl = (formData.get("githubUrl") as string | null)?.trim();
  const liveUrl = (formData.get("liveUrl") as string | null)?.trim();
  const canvaEmbedUrl = (formData.get("canvaEmbedUrl") as string | null)?.trim();
  const featured = formData.get("featured") === "on";

  const parsedArchitectures = createArchitectureFromLoom(formData, title);

  await prisma.project.update({
    where: { id },
    data: {
      title,
      shortDescription,
      overview: shortDescription,
      techStack: stringifyList(techStack),
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      canvaEmbedUrl: canvaEmbedUrl || null, featured,
      showCanvaEmbed: featured && Boolean(canvaEmbedUrl),
      showArchitecture: featured,
      showArchitectureVideo: featured && parsedArchitectures.length > 0,
      architectures: {
        deleteMany: {},
        create: parsedArchitectures,
      }
    },
  });

  revalidatePath("/");
  revalidatePath(`/projects/${id}`);
  redirect("/admin");
}

export async function updateProjectOrder(
  updates: { id: string; order: number }[],
) {
  await prisma.$transaction(
    updates.map(({ id, order }) =>
      prisma.project.update({ where: { id }, data: { order } }),
    ),
  );

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.architecture.deleteMany({ where: { projectId: id } });
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const skillsRaw = formData.get("skills") as string;
  const skills = skillsRaw
    ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;
  const xUrl = formData.get("xUrl") as string;
  const youtube = formData.get("youtube") as string;
  const email = formData.get("email") as string;
  const experienceRoles = formData.getAll("experience_role") as string[];
  const experienceCompanies = formData.getAll("experience_company") as string[];
  const experiencePeriods = formData.getAll("experience_period") as string[];
  const experienceSummaries = formData.getAll("experience_summary") as string[];
  const experienceHighlights = formData.getAll("experience_highlights") as string[];
  const experiences = experienceRoles
    .map((role, index) => ({
      role: role.trim(),
      company: experienceCompanies[index]?.trim() || "",
      period: experiencePeriods[index]?.trim() || "",
      summary: experienceSummaries[index]?.trim() || "",
      highlights: stringifyList(experienceHighlights[index]
        ? experienceHighlights[index].split(",").map((item) => item.trim()).filter(Boolean)
        : []),
      order: index,
    }))
    .filter((experience) => experience.role && experience.company);

  const existingProfile = await prisma.profile.findFirst();
  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: { name, headline, bio, skills: stringifyList(skills), github, linkedin, xUrl, youtube, email }
    });
  } else {
    await prisma.profile.create({
      data: { name, headline, bio, skills: stringifyList(skills), github, linkedin, xUrl, youtube, email }
    });
  }

  await prisma.experience.deleteMany({});
  if (experiences.length > 0) {
    await prisma.experience.createMany({
      data: experiences,
    });
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  redirect("/admin");
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw
    ? techStackRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const githubUrl = (formData.get("githubUrl") as string | null)?.trim();
  const liveUrl = (formData.get("liveUrl") as string | null)?.trim();
  const canvaEmbedUrl = (formData.get("canvaEmbedUrl") as string | null)?.trim();
  const featured = formData.get("featured") === "on"; 

  const parsedArchitectures = createArchitectureFromLoom(formData, title);

  const projectCount = await prisma.project.count({ where: { featured } });

  await prisma.project.create({
    data: {
      title,
      slug: slugify(title),
      shortDescription,
      overview: shortDescription,
      techStack: stringifyList(techStack),
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      canvaEmbedUrl: canvaEmbedUrl || null, featured,
      order: projectCount,
      showCanvaEmbed: featured && Boolean(canvaEmbedUrl),
      showArchitecture: featured,
      showArchitectureVideo: featured && parsedArchitectures.length > 0,
      architectures: { create: parsedArchitectures }
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
