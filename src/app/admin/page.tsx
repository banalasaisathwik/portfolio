import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRoundPen } from "lucide-react";
import { ProjectList } from "./project-list";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-foreground">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-zinc-700 dark:text-zinc-400 mt-1">Manage your engineering portfolio.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/settings">
            <Button variant="outline">
              <UserRoundPen className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </Link>
          <Link href="/admin/projects/new">
            <Button className="bg-foreground text-background hover:bg-foreground/90">+ New Project</Button>
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="border border-dashed border-border dark:border-zinc-800 rounded-lg p-12 text-center text-zinc-700 dark:text-zinc-500">
          No projects found. Create your first one.
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  );
}
