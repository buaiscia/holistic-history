import { PrismaClient } from "../node_modules/.prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const tag1 = await prisma.tag.create({
    data: {
      name: "Gravettian",
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: "Venus figurines",
    },
  });

  await prisma.node.create({
    data: {
      title: "Gravettian",
      body: "Gravettian culture was a European Upper Paleolithic culture, that succeeded the Aurignacian culture, around 33,000 years BP. It is archaeologically the last European culture many consider unified, and had mostly disappeared by c. 22,000 BP, close to the Last Glacial Maximum, although some elements lasted until c. 17,000 BP. At this point, it was replaced abruptly by the Solutrean culture.",
      userId: user.id,
      tags: {
        connect: [
          {
            name: tag1.name,
          },
          {
            name: tag2.name,
          },
        ],
      },
    },
  });

  await prisma.node.create({
    data: {
      title: "Venus figurines",
      body: "Venus figurines are a type of statuette from the Upper Palaeolithic, mostly found in Europe, but with finds as far east as Irkutsk Oblast, Siberia, and as far west as Iberia, suggesting that they were carried by humans as they migrated across Eurasia. Most of them date from the Gravettian period (26,000–21,000 years ago), but examples exist as early as the Venus of Hohle Fels, which dates back at least 35,000 years to the Aurignacian, and as late as the Venus of Monruz, from about 11,000 years ago in the Magdalenian.",
      userId: user.id,
      tags: {
        connect: [
          {
            name: tag1.name,
          },
          {
            name: tag2.name,
          },
        ],
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
