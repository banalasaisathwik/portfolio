import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { deleteProject } from "./actions";
import { Edit2, Trash2, ExternalLink } from "lucide-react";

export default async function AdminDashboard() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-foreground">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-zinc-700 dark:text-zinc-400 mt-1">Manage your engineering portfolio.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-foreground text-background hover:bg-foreground/90">+ New Project</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <div className="border border-dashed border-border dark:border-zinc-800 rounded-lg p-12 text-center text-zinc-700 dark:text-zinc-500">
            No projects found. Create your first one.
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="bg-card dark:bg-zinc-900 border-border dark:border-zinc-800 text-card-foreground dark:text-white">
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {project.featured && (
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Featured</span>
                    )}
                  </div>
                  <CardDescription className="text-zinc-700 dark:text-zinc-400 mt-1">/{project.slug}</CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="text-zinc-700 dark:text-zinc-400 hover:text-foreground dark:hover:text-white">
                      <ExternalLink className="w-4 h-4 mr-2" /> View
                    </Button>
                  </Link>
                  
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    <Button variant="secondary" size="sm" className="bg-secondary text-secondary-foreground dark:bg-zinc-800 dark:text-white hover:bg-muted dark:hover:bg-zinc-700">
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  </Link>

                  {/* Server Action Delete Button */}
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <Button type="submit" variant="destructive" size="sm" className="bg-red-950/50 text-red-400 hover:bg-red-900/80 border border-red-900/50">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </form>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
