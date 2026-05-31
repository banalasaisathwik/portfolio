"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const overview = formData.get("overview") as string;
  
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw ? techStackRaw.split(",").map(t => t.trim()) : [];

  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const featured = formData.get("featured") === "on"; 

  await prisma.project.create({
    data: {
      title,
      slug,
      shortDescription,
      overview,
      techStack,
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      featured,
    },
  });
  

  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin");
}

// Append this below your existing createProject and createArchitecture functions

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const overview = formData.get("overview") as string;
  const engineeringDecisions = formData.get("engineeringDecisions") as string;
  const codeWalkthrough = formData.get("codeWalkthrough") as string;
  const lessonsLearned = formData.get("lessonsLearned") as string;
  
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw ? techStackRaw.split(",").map(t => t.trim()) : [];

  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  const featured = formData.get("featured") === "on";

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      shortDescription,
      overview,
      engineeringDecisions: engineeringDecisions || null,
      codeWalkthrough: codeWalkthrough || null,
      lessonsLearned: lessonsLearned || null,
      techStack,
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      featured,
    },
  });

  revalidatePath("/");
  revalidatePath(`/projects/${slug}`);
  redirect("/admin");
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;

  // 1. Delete associated architectures first to prevent foreign key crashes
  await prisma.architecture.deleteMany({
    where: { projectId: id }
  });

  // 2. Delete the project
  await prisma.project.delete({
    where: { id }
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  
  const skillsRaw = formData.get("skills") as string;
  const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()) : [];

  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;
  const xUrl = formData.get("xUrl") as string;
  const youtube = formData.get("youtube") as string;
  const email = formData.get("email") as string;

  // We use upsert so it creates the row if it doesn't exist, or updates it if it does
  const existingProfile = await prisma.profile.findFirst();
  
  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: { name, headline, bio, skills, github, linkedin, xUrl, youtube, email }
    });
  } else {
    await prisma.profile.create({
      data: { name, headline, bio, skills, github, linkedin, xUrl, youtube, email }
    });
  }

  revalidatePath("/", "layout");
}