import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await prisma.adopt.create({
    data: {
      id: body.id,
      email: body.email,
      fullname: body.name,
      telephone: body.telephone,
      reason: body.reason,
      catID: body.catID,
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
