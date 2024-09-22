import prisma from "~/lib/prisma";
import { ICat } from "@/types/cat";
export default defineEventHandler(async (event) => {
  const response: ICat[] = await prisma.cat.findMany({
    include: {
      Adopt: {
        select: {
          fullname: true,
          email: true,
          reason: true,
          telephone: true,
        },
      },
    },
  });

  if (response) {
    return {
      data: {
        status: 200,
        content: response,
        message: "ok",
      },
      error: null,
    };
  } else {
    return {
      data: null,
      error: {
        status: 400,
        message: "error",
      },
    };
  }
});
