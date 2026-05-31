"use client";

import { useState } from "react";
import { updateProject } from "../../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";

export default function EditProjectForm({ project }: { project: any }) {
  // State to manage dynamic diagram blocks
  const [architectures, setArchitectures] = useState<any[]>(project.architectures || []);

  const addArchitecture = () => {
    setArchitectures([...architectures, { id: Date.now().toString(), title: "", description: "", videoUrl: "", imageUrl: "" }]);
  };

  const removeArchitecture = (index: number) => {
    setArchitectures(architectures.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-foreground">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Project: {project.title}</h1>
      
      <form action={updateProject} className="space-y-8">
        <input type="hidden" name="id" value={project.id} />

        {/* --- Standard Project Details --- */}
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

        {/* --- Dynamic Architecture SVG Section --- */}
        <div className="p-6 bg-card dark:bg-zinc-900/30 border border-border dark:border-zinc-800 rounded-xl space-y-6 mt-8">
          <div className="flex items-center justify-between border-b border-border dark:border-zinc-800 pb-4">
            <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-300">Architecture Diagrams</h3>
            <Button type="button" variant="outline" onClick={addArchitecture} size="sm" className="border-dashed border-zinc-500">
              <Plus className="w-4 h-4 mr-2" /> Add Diagram
            </Button>
          </div>

          {architectures.map((arch, index) => (
            <div key={arch.id} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-background dark:bg-zinc-950 relative space-y-4">
              <button type="button" onClick={() => removeArchitecture(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-4 pr-8">
                <div className="space-y-2">
                  <Label className="text-zinc-800 dark:text-zinc-300">Diagram Title</Label>
                  <Input name="arch_title" defaultValue={arch.title} required className="bg-background dark:bg-zinc-900" />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-800 dark:text-zinc-300">Video Walkthrough URL (Optional)</Label>
                  <Input name="arch_videoUrl" type="url" defaultValue={arch.videoUrl || ""} className="bg-background dark:bg-zinc-900" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-800 dark:text-zinc-300">Description</Label>
                <Textarea name="arch_description" defaultValue={arch.description} className="h-20 bg-background dark:bg-zinc-900" />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-800 dark:text-zinc-300">Upload SVG / Image File</Label>
                {/* Hidden input keeps the existing image if no new file is selected */}
                <input type="hidden" name="arch_existingUrl" value={arch.imageUrl || ""} />
                
                <div className="flex items-center gap-4">
                  {arch.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={arch.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded border border-zinc-800 bg-white" />
                  )}
                  <Input type="file" name="arch_file" accept="image/*" className="bg-background dark:bg-zinc-900 text-zinc-500" />
                </div>
                <p className="text-xs text-zinc-500 mt-1">If you upload a new file, it will replace the current diagram.</p>
              </div>
            </div>
          ))}
          {architectures.length === 0 && (
            <p className="text-sm text-zinc-500 text-center py-4">No architecture diagrams added yet.</p>
          )}
        </div>

        {/* --- Deep Dive Content --- */}
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