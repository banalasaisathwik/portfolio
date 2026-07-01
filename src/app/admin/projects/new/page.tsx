"use client";

import { createProject } from "../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Create Project
      </h1>

      <form action={createProject} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="Perpetual Futures Trading Backend"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Card Description</Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            required
            placeholder="Short project summary shown on the portfolio"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input
            id="techStack"
            name="techStack"
            placeholder="Node.js, TypeScript, PostgreSQL, Redis"
          />
          <p className="text-xs text-muted-foreground">
            Separate each technology with a comma.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              type="url"
              placeholder="https://github.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Demo URL</Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              type="url"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              className="size-4 rounded border-gray-300"
            />
            <Label htmlFor="featured">Feature this project</Label>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loomVideoUrl">Loom Video URL</Label>
              <Input
                id="loomVideoUrl"
                name="loomVideoUrl"
                type="url"
                placeholder="https://www.loom.com/share/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canvaEmbedUrl">Canva Architecture Embed URL</Label>
              <Input
                id="canvaEmbedUrl"
                name="canvaEmbedUrl"
                type="url"
                placeholder="https://www.canva.com/design/.../view?embed"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit">Save Project</Button>
        </div>
      </form>
    </div>
  );
}
