import type { User, Node, Tag, TimePeriod } from "@prisma/client";

import { prisma } from "~/db.server";

export function getNode({
  id,
  userId,
}: Pick<Node, "id"> & {
  userId: User["id"];
}) {
  return prisma.node.findFirst({
    select: { id: true, body: true, title: true, tags: true },
    where: { id, userId },
  });
}

export function getNodeListItems({ userId }: { userId: User["id"] }) {
  return prisma.node.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createNode({
  body,
  title,
  tags,
  timePeriodId,
  userId,
}: Pick<Node, "body" | "title"> & {
  tags: Pick<Tag, "name">[];
  timePeriodId: string;
  userId: User["id"];
}) {
  const existingTags = await prisma.tag.findMany({
    where: {
      name: {
        in: tags.map((tag) => tag.name),
      },
    },
  });

  const newTags = tags.filter(
    (tag) => !existingTags.some((existingTag) => existingTag.name === tag.name)
  );

  if (newTags.length > 0) {
    newTags.forEach(async (tag) => {
      await prisma.tag.create({ data: tag });
    });
  }

  const tagIds = [...existingTags, ...newTags].map((tag) => ({
    name: tag.name,
  }));

  return prisma.node.create({
    data: {
      title,
      body,
      tags: {
        connect: tagIds.map((tag) => ({
          name: tag.name,
        })),
      },
      timePeriods: {
        connect: {
          id: Number(timePeriodId),
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteNode({
  id,
  userId,
}: Pick<Node, "id"> & { userId: User["id"] }) {
  return prisma.node.deleteMany({
    where: { id, userId },
  });
}
