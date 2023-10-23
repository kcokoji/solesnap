import { PrismaClient } from "@prisma/client";

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      { level: "warn", emit: "event" },
      { level: "info", emit: "event" },
      { level: "error", emit: "event" },
    ],
  });
prisma.$on("warn", (e) => {
  console.log(e);
});

prisma.$on("info", (e) => {
  console.log(e);
});

prisma.$on("error", (e) => {
  console.log(e);
});
// if (process.env.NODE_ENV === "production") globalThis.prisma = client;

export default prisma;
