CREATE TABLE "Project" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "overview" TEXT NOT NULL,
  "engineeringDecisions" TEXT,
  "codeWalkthrough" TEXT,
  "lessonsLearned" TEXT,
  "githubUrl" TEXT,
  "liveUrl" TEXT,
  "canvaEmbedUrl" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "showOverview" BOOLEAN NOT NULL DEFAULT true,
  "showCanvaEmbed" BOOLEAN NOT NULL DEFAULT true,
  "showArchitecture" BOOLEAN NOT NULL DEFAULT true,
  "showArchitectureVideo" BOOLEAN NOT NULL DEFAULT true,
  "showEngineeringDecisions" BOOLEAN NOT NULL DEFAULT true,
  "showCodeWalkthrough" BOOLEAN NOT NULL DEFAULT true,
  "showLessonsLearned" BOOLEAN NOT NULL DEFAULT true,
  "coverImage" TEXT,
  "techStack" TEXT NOT NULL DEFAULT '[]',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

CREATE TABLE "Architecture" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "excalidrawUrl" TEXT,
  "videoUrl" TEXT,
  "projectId" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Architecture_projectId_fkey"
    FOREIGN KEY ("projectId") REFERENCES "Project" ("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "Article" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

CREATE TABLE "Profile" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT 'B. Sai Sathwik',
  "headline" TEXT NOT NULL DEFAULT 'Software Developer',
  "bio" TEXT NOT NULL,
  "skills" TEXT NOT NULL DEFAULT '[]',
  "github" TEXT,
  "linkedin" TEXT,
  "xUrl" TEXT,
  "youtube" TEXT,
  "email" TEXT,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Experience" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "role" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "period" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "highlights" TEXT NOT NULL DEFAULT '[]',
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "Experience_order_idx" ON "Experience"("order");
