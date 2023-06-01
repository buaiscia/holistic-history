import { prisma } from "~/db.server";

export function getTimePeriodListItems() {
  return prisma.timePeriod.findMany({
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}
