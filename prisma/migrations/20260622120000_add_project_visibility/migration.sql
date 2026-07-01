-- Keep existing project content intact while allowing individual sections to be hidden.
ALTER TABLE "Project"
ADD COLUMN "showOverview" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "showArchitecture" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "showArchitectureVideo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "showEngineeringDecisions" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "showCodeWalkthrough" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "showLessonsLearned" BOOLEAN NOT NULL DEFAULT true;
