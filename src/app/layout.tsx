import { ThemeProvider } from "@/components/theme-provider";
import { FloatingDock } from "@/components/ui/floating-dock";
import prisma from "@/lib/prisma";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch the first profile (since there is only one of you)
  const profile = await prisma.profile.findFirst();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          
          {/* Inject the floating dock globally */}
          <FloatingDock profile={profile} />
        </ThemeProvider>
      </body>
    </html>
  );
}