import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  const id = Number.parseInt(getRouterParam(event, "id") as string);
  const response = await prisma.$transaction([
    prisma.adopt.deleteMany({
      where: {
        catID: id,
      },
    }),
    prisma.cat.delete({
      where: { id: id },
    }),
  ]);

  if (response[1].id) {
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
