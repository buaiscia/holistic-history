// import { User } from "@prisma/client";
import { prisma } from "~/db.server";

export function getTimePeriodListItems() {
  return prisma.timePeriod.findMany({
    // where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}
