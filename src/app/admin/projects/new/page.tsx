"use client";

import { createProject } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Create New Project</h1>
      
      <form action={createProject} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" required placeholder="Real-Time Video App" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input id="slug" name="slug" required placeholder="real-time-video-app" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description (Max 150 chars)</Label>
          <Input id="shortDescription" name="shortDescription" required placeholder="A brief summary..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overview">System Overview</Label>
          <Textarea id="overview" name="overview" required className="h-32" placeholder="Detailed explanation of the project..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack (Comma separated)</Label>
          <Input id="techStack" name="techStack" placeholder="Next.js, WebRTC, Mediasoup, Prisma" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
            <Input id="githubUrl" name="githubUrl" type="url" placeholder="https://github.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Deployment URL (Optional)</Label>
            <Input id="liveUrl" name="liveUrl" type="url" placeholder="https://..." />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="featured" name="featured" className="w-4 h-4 rounded border-gray-300" />
          <Label htmlFor="featured">Feature this project on the Home Page</Label>
        </div>

        <div className="pt-6 border-t border-border flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
          <Button type="submit">Save Project</Button>
        </div>
      </form>
    </div>
  );
}