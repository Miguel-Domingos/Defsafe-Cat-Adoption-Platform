import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  const id = Number.parseInt(getRouterParam(event, "id") as string);
  const body = await readBody(event);
  const response = await prisma.$transaction([
    prisma.adopt.update({
      where: {
        id: id,
      },
      data: {
        actived: false,
      },
    }),

    prisma.cat.update({
      where: {
        id: body.catID,
      },
      data: {
        isAdopted: true,
      },
    }),

    prisma.adopt.deleteMany({
      where: {
        actived: true,
        catID: body.catID,
      },
    }),
  ]);

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
