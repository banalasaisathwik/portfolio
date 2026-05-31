import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProject } from "../../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-foreground">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Project: {project.title}</h1>
      
      <form action={updateProject} className="space-y-8">
        {/* Hidden ID field so the server action knows which project to update */}
        <input type="hidden" name="id" value={project.id} />

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-zinc-800 dark:text-zinc-300">Project Title</Label>
            <Input id="title" name="title" defaultValue={project.title} required className="bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-zinc-800 dark:text-zinc-300">URL Slug</Label>
            <Input id="slug" name="slug" defaultValue={project.slug} required className="bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription" className="text-zinc-800 dark:text-zinc-300">Short Description</Label>
          <Input id="shortDescription" name="shortDescription" defaultValue={project.shortDescription} required className="bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overview" className="text-zinc-800 dark:text-zinc-300">System Overview</Label>
          <Textarea id="overview" name="overview" defaultValue={project.overview} required className="h-32 bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack" className="text-zinc-800 dark:text-zinc-300">Tech Stack (Comma separated)</Label>
          <Input id="techStack" name="techStack" defaultValue={project.techStack.join(", ")} className="bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="githubUrl" className="text-zinc-800 dark:text-zinc-300">GitHub URL (Optional)</Label>
            <Input id="githubUrl" name="githubUrl" type="url" defaultValue={project.githubUrl || ""} className="bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl" className="text-zinc-800 dark:text-zinc-300">Live URL (Optional)</Label>
            <Input id="liveUrl" name="liveUrl" type="url" defaultValue={project.liveUrl || ""} className="bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
          </div>
        </div>

        <div className="p-6 bg-card dark:bg-zinc-900/50 border border-border dark:border-zinc-800 rounded-xl space-y-6 mt-8">
          <h3 className="font-semibold text-lg border-b border-border dark:border-zinc-800 pb-2">Deep Dive Content (Optional)</h3>
          
          <div className="space-y-2">
            <Label htmlFor="engineeringDecisions" className="text-zinc-800 dark:text-zinc-300">Engineering Decisions</Label>
            <Textarea id="engineeringDecisions" name="engineeringDecisions" defaultValue={project.engineeringDecisions || ""} className="h-32 bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="codeWalkthrough" className="text-zinc-800 dark:text-zinc-300">Code Walkthrough</Label>
            <Textarea id="codeWalkthrough" name="codeWalkthrough" defaultValue={project.codeWalkthrough || ""} className="h-32 bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lessonsLearned" className="text-zinc-800 dark:text-zinc-300">Lessons Learned</Label>
            <Textarea id="lessonsLearned" name="lessonsLearned" defaultValue={project.lessonsLearned || ""} className="h-32 bg-background dark:bg-zinc-900 border-border dark:border-zinc-800" />
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-card dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-lg">
          <input type="checkbox" id="featured" name="featured" defaultChecked={project.featured} className="w-4 h-4 rounded border-zinc-400 dark:border-zinc-700 bg-background dark:bg-zinc-800" />
          <Label htmlFor="featured" className="text-zinc-800 dark:text-zinc-300 cursor-pointer">Feature this project on the Home Page</Label>
        </div>

        <div className="pt-6 border-t border-border dark:border-zinc-800 flex justify-end gap-4">
          <Link href="/admin">
            <Button type="button" variant="ghost" className="text-zinc-700 dark:text-zinc-400 hover:text-foreground dark:hover:text-white">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-foreground text-background hover:bg-foreground/90">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
