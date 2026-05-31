"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";

// Helper function to handle local file uploads
async function processArchitectures(formData: FormData) {
  const archTitles = formData.getAll("arch_title") as string[];
  const archDescriptions = formData.getAll("arch_description") as string[];
  const archVideoUrls = formData.getAll("arch_videoUrl") as string[];
  const archFiles = formData.getAll("arch_file") as File[];
  const archExistingUrls = formData.getAll("arch_existingUrl") as string[];

  const architectures = [];

  for (let i = 0; i < archTitles.length; i++) {
    let imageUrl = archExistingUrls[i] || "";
    const file = archFiles[i];

    // If a new file was uploaded, save it to the public folder
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      // Clean the filename to prevent URL issues
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`;
      const filePath = path.join(process.cwd(), "public/diagrams", fileName);
      
      await writeFile(filePath, buffer);
      imageUrl = `/diagrams/${fileName}`;
    }

    if (imageUrl && archTitles[i]) {
      architectures.push({
        title: archTitles[i],
        description: archDescriptions[i] || "",
        videoUrl: archVideoUrls[i] || null,
        imageUrl: imageUrl,
      });
    }
  }

  return architectures;
}

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

  // Process the uploaded SVGs
  const parsedArchitectures = await processArchitectures(formData);

  await prisma.project.update({
    where: { id },
    data: {
      title, slug, shortDescription, overview,
      engineeringDecisions: engineeringDecisions || null,
      codeWalkthrough: codeWalkthrough || null,
      lessonsLearned: lessonsLearned || null,
      techStack, githubUrl: githubUrl || null, liveUrl: liveUrl || null, featured,
      
      // Wipe old diagrams and replace with the newly submitted ones
      architectures: {
        deleteMany: {},
        create: parsedArchitectures,
      }
    },
  });

  revalidatePath("/");
  revalidatePath(`/projects/${slug}`);
  redirect("/admin");
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
  const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()) : [];
  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;
  const xUrl = formData.get("xUrl") as string;
  const youtube = formData.get("youtube") as string;
  const email = formData.get("email") as string;

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

// Ensure createProject is also updated so new projects can have SVGs later
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

  const parsedArchitectures = await processArchitectures(formData);

  await prisma.project.create({
    data: {
      title, slug, shortDescription, overview, techStack,
      githubUrl: githubUrl || null, liveUrl: liveUrl || null, featured,
      architectures: { create: parsedArchitectures }
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin");
}