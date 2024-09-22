import { serverSupabaseClient } from "#supabase/server";

import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const body = await readBody(event);
  const id = Number.parseInt(getRouterParam(event, "id") as string);

  let imageURL = "";

  if (body.image.includes("http")) {
    imageURL = body.image;
  } else {
    imageURL = await supabase.storage.from("avatars").getPublicUrl(body.image)
      .data.publicUrl;
  }

  const response = await prisma.cat.update({
    where: { id: id },
    data: {
      image: imageURL,
      name: body.name,
      description: body.description,
    },
  });

  if (response.id) {
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
