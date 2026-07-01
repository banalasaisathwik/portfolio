import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.HEARTBEAT_SECRET || process.env.CRON_SECRET;

  if (secret) {
    const authorization = request.headers.get("authorization");

    if (authorization !== `Bearer ${secret}`) {
      return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const startedAt = Date.now();

  await prisma.$queryRaw`SELECT 1`;

  return Response.json({
    ok: true,
    service: "database",
    latencyMs: Date.now() - startedAt,
    checkedAt: new Date().toISOString(),
  });
}
