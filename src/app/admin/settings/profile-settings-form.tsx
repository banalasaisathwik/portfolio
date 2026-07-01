"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Profile = {
  name: string;
  headline: string;
  bio: string;
  skills: string[];
  github: string | null;
  linkedin: string | null;
  xUrl: string | null;
  youtube: string | null;
  email: string | null;
};

type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

type ProfileSettingsFormProps = {
  action: (formData: FormData) => void;
  profile: Profile;
  experiences: Experience[];
};

export default function ProfileSettingsForm({
  action,
  profile,
  experiences,
}: ProfileSettingsFormProps) {
  const [items, setItems] = useState<Experience[]>(
    experiences.length > 0 ? experiences : [createEmptyExperience()],
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">Global Site Settings</h1>

      <form action={action} className="space-y-8">
        <div className="space-y-6 rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Personal Identity</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="name" defaultValue={profile.name} required />
            </div>
            <div className="space-y-2">
              <Label>Headline / Job Title</Label>
              <Input
                name="headline"
                defaultValue={profile.headline}
                required
                placeholder="e.g. AI Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Main Bio</Label>
            <Textarea
              name="bio"
              defaultValue={profile.bio}
              className="h-24"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Core Skills</Label>
            <Input name="skills" defaultValue={profile.skills.join(", ")} />
            <p className="text-xs text-muted-foreground">
              Separate each skill with a comma.
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Socials</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input name="github" type="url" defaultValue={profile.github || ""} />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input
                name="linkedin"
                type="url"
                defaultValue={profile.linkedin || ""}
              />
            </div>
            <div className="space-y-2">
              <Label>X / Twitter URL</Label>
              <Input name="xUrl" type="url" defaultValue={profile.xUrl || ""} />
            </div>
            <div className="space-y-2">
              <Label>YouTube URL</Label>
              <Input
                name="youtube"
                type="url"
                defaultValue={profile.youtube || ""}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input name="email" type="email" defaultValue={profile.email || ""} />
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Experience</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setItems([...items, createEmptyExperience()])}
            >
              <Plus className="mr-2 size-4" />
              Add Experience
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="rounded-lg border bg-background p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium">Experience {index + 1}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      setItems(items.filter((experience) => experience.id !== item.id))
                    }
                    aria-label="Remove experience"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input name="experience_role" defaultValue={item.role} />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input name="experience_company" defaultValue={item.company} />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Input
                      name="experience_period"
                      defaultValue={item.period}
                      placeholder="Jan 2024 - Present"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Highlights</Label>
                    <Input
                      name="experience_highlights"
                      defaultValue={item.highlights.join(", ")}
                      placeholder="RAG, Backend APIs, Observability"
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label>Summary</Label>
                  <Textarea
                    name="experience_summary"
                    defaultValue={item.summary}
                    className="h-24"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Global Settings</Button>
        </div>
      </form>
    </div>
  );
}

function createEmptyExperience(): Experience {
  return {
    id: crypto.randomUUID(),
    role: "",
    company: "",
    period: "",
    summary: "",
    highlights: [],
  };
}
