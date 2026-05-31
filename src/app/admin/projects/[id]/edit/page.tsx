import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProjectForm from "./edit-form";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
    include: { architectures: true } // Fetch the diagrams from the DB
  });

  if (!project) notFound();

  return <EditProjectForm project={project} />;
}