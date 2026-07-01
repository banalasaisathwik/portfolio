CREATE TABLE "Experience" (
  "id" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "period" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Experience_order_idx" ON "Experience"("order");
