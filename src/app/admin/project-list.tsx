"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Edit2, Trash2, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { deleteProject, updateProjectOrder } from "./actions";

type Project = {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  order: number;
};

export function ProjectList({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <div className="grid gap-8">
      <ProjectGroup title="Featured" projects={featured} />
      <ProjectGroup title="Other projects" projects={other} />
    </div>
  );
}

function ProjectGroup({
  title,
  projects,
}: {
  title: string;
  projects: Project[];
}) {
  const [items, setItems] = useState(projects);
  const [isPending, startTransition] = useTransition();

  if (items.length === 0) return null;

  function move(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[index],
    ];
    setItems(reordered);

    const updates = reordered.map((project, i) => ({ id: project.id, order: i }));
    startTransition(() => {
      updateProjectOrder(updates);
    });
  }

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      <div className="grid gap-4">
        {items.map((project, index) => (
          <Card
            key={project.id}
            className="bg-card dark:bg-zinc-900 border-border dark:border-zinc-800 text-card-foreground dark:text-white"
          >
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <button
                    type="button"
                    disabled={index === 0 || isPending}
                    onClick={() => move(index, -1)}
                    aria-label="Move up"
                    className="rounded p-0.5 text-zinc-500 hover:text-foreground disabled:opacity-30 dark:hover:text-white"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={index === items.length - 1 || isPending}
                    onClick={() => move(index, 1)}
                    aria-label="Move down"
                    className="rounded p-0.5 text-zinc-500 hover:text-foreground disabled:opacity-30 dark:hover:text-white"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {project.featured && (
                      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-zinc-700 dark:text-zinc-400 mt-1">
                    /{project.slug}
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/projects/${project.id}`} target="_blank">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-700 dark:text-zinc-400 hover:text-foreground dark:hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> View
                  </Button>
                </Link>

                <Link href={`/admin/projects/${project.id}/edit`}>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-secondary text-secondary-foreground dark:bg-zinc-800 dark:text-white hover:bg-muted dark:hover:bg-zinc-700"
                  >
                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                  </Button>
                </Link>

                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    className="bg-red-950/50 text-red-400 hover:bg-red-900/80 border border-red-900/50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </form>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
