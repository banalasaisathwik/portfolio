-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Architecture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "excalidrawUrl" TEXT,
    "videoUrl" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Architecture_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Architecture" ("createdAt", "description", "excalidrawUrl", "id", "imageUrl", "projectId", "title", "updatedAt", "videoUrl") SELECT "createdAt", "description", "excalidrawUrl", "id", "imageUrl", "projectId", "title", "updatedAt", "videoUrl" FROM "Architecture";
DROP TABLE "Architecture";
ALTER TABLE "new_Architecture" RENAME TO "Architecture";
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Article" ("content", "createdAt", "excerpt", "id", "published", "slug", "title", "updatedAt") SELECT "content", "createdAt", "excerpt", "id", "published", "slug", "title", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
CREATE TABLE "new_Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Experience" ("company", "createdAt", "highlights", "id", "order", "period", "role", "summary", "updatedAt") SELECT "company", "createdAt", "highlights", "id", "order", "period", "role", "summary", "updatedAt" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
CREATE INDEX "Experience_order_idx" ON "Experience"("order");
CREATE TABLE "new_Profile" (
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" ("bio", "email", "github", "headline", "id", "linkedin", "name", "skills", "updatedAt", "xUrl", "youtube") SELECT "bio", "email", "github", "headline", "id", "linkedin", "name", "skills", "updatedAt", "xUrl", "youtube" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE TABLE "new_Project" (
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
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("canvaEmbedUrl", "codeWalkthrough", "coverImage", "createdAt", "engineeringDecisions", "featured", "githubUrl", "id", "lessonsLearned", "liveUrl", "overview", "shortDescription", "showArchitecture", "showArchitectureVideo", "showCanvaEmbed", "showCodeWalkthrough", "showEngineeringDecisions", "showLessonsLearned", "showOverview", "slug", "techStack", "title", "updatedAt") SELECT "canvaEmbedUrl", "codeWalkthrough", "coverImage", "createdAt", "engineeringDecisions", "featured", "githubUrl", "id", "lessonsLearned", "liveUrl", "overview", "shortDescription", "showArchitecture", "showArchitectureVideo", "showCanvaEmbed", "showCodeWalkthrough", "showEngineeringDecisions", "showLessonsLearned", "showOverview", "slug", "techStack", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE INDEX "Project_order_idx" ON "Project"("order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
