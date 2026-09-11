"use client";

import Link from "next/link";
import { updateProject } from "../../../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Architecture, Project } from "@/generated/prisma/browser";
import { parseList } from "@/lib/list-fields";

type EditableArchitecture = Pick<Architecture, "videoUrl" | "excalidrawUrl">;
type EditableProject = Project & { architectures: EditableArchitecture[] };

export default function EditProjectForm({
  project,
}: {
  project: EditableProject;
}) {
  const loomVideoUrl =
    project.architectures.find((architecture) => architecture.videoUrl)
      ?.videoUrl ?? "";
  const excalidrawUrl =
    project.architectures.find((architecture) => architecture.excalidrawUrl)
      ?.excalidrawUrl ?? "";

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 text-foreground">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Edit Project
      </h1>

      <form action={updateProject} className="space-y-6">
        <input type="hidden" name="id" value={project.id} />

        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" name="title" defaultValue={project.title} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">Card Description</Label>
          <Input
            id="shortDescription"
            name="shortDescription"
            defaultValue={project.shortDescription}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack</Label>
          <Input
            id="techStack"
            name="techStack"
            defaultValue={parseList(project.techStack).join(", ")}
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
              defaultValue={project.githubUrl || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Demo URL</Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              type="url"
              defaultValue={project.liveUrl || ""}
            />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              defaultChecked={project.featured}
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
                defaultValue={loomVideoUrl}
                placeholder="https://www.loom.com/share/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canvaEmbedUrl">Canva Architecture Embed URL</Label>
              <Input
                id="canvaEmbedUrl"
                name="canvaEmbedUrl"
                type="url"
                defaultValue={project.canvaEmbedUrl || ""}
                placeholder="https://www.canva.com/design/.../view?embed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excalidrawUrl">Architecture Diagram URL (Excalidraw)</Label>
              <Input
                id="excalidrawUrl"
                name="excalidrawUrl"
                type="url"
                defaultValue={excalidrawUrl}
                placeholder="https://excalidraw.com/#json=..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <Link href="/admin">
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
