import { prisma } from "~/db.server";

export function getGeographicalAreaListItems() {
  return prisma.geographicalArea.findMany({
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getModernCountryListItems() {
  return prisma.modernCountryArea.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}
