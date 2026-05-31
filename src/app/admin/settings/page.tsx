import prisma from "@/lib/prisma";
import { updateProfile } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function ProfileSettingsPage() {
  const profile = await prisma.profile.findFirst() || {
    name: "B. Sai Sathwik",
    headline: "Software Developer",
    bio: "",
    skills: ["Next.js", "WebRTC", "PyTorch"],
    github: "", linkedin: "", xUrl: "", youtube: "", email: ""
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Global Site Settings</h1>
      
      <form action={updateProfile} className="space-y-8">
        
        <div className="p-6 bg-card border rounded-xl space-y-6">
          <h2 className="text-xl font-semibold">Personal Identity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="name" defaultValue={profile.name} required />
            </div>
            <div className="space-y-2">
              <Label>Headline / Job Title</Label>
              <Input name="headline" defaultValue={profile.headline} required placeholder="e.g. AI Engineer" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Main Bio</Label>
            <Textarea name="bio" defaultValue={profile.bio} className="h-24" required />
          </div>

          <div className="space-y-2">
            <Label>Core Skills (Comma separated)</Label>
            <Input name="skills" defaultValue={profile.skills.join(", ")} />
          </div>
        </div>

        <div className="p-6 bg-card border rounded-xl space-y-6">
          <h2 className="text-xl font-semibold">Social Links (For Floating Dock)</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input name="github" type="url" defaultValue={profile.github || ""} />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn URL</Label>
              <Input name="linkedin" type="url" defaultValue={profile.linkedin || ""} />
            </div>
            <div className="space-y-2">
              <Label>X (Twitter) URL</Label>
              <Input name="xUrl" type="url" defaultValue={profile.xUrl || ""} />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input name="email" type="email" defaultValue={profile.email || ""} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Global Settings</Button>
        </div>
      </form>
    </div>
  );
}