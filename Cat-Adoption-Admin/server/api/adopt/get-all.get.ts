import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const response = await prisma.adopt.findMany({
    where: {
      actived: true,
    },
    include: {
      cat: {
        select: {
          id: true,
          image: true,
          description: true,
          name: true,
          isAdopted: true,
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
