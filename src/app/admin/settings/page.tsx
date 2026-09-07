import prisma from "@/lib/prisma";
import { parseList } from "@/lib/list-fields";
import { updateProfile } from "../actions";
import ProfileSettingsForm from "./profile-settings-form";

export const dynamic = "force-dynamic";

export default async function ProfileSettingsPage() {
  const [profile, experiences] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <ProfileSettingsForm
      action={updateProfile}
      profile={
        profile
          ? {
              ...profile,
              skills: parseList(profile.skills),
            }
          : {
              name: "B. Sai Sathwik",
              headline: "Software Developer",
              bio: "",
              skills: ["Next.js", "WebRTC", "PyTorch"],
              github: "",
              linkedin: "",
              xUrl: "",
              youtube: "",
              email: "",
            }
      }
      experiences={experiences.map((experience) => ({
        ...experience,
        highlights: parseList(experience.highlights),
      }))}
    />
  );
}
