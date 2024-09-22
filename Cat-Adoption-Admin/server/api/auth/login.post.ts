import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const supabase = await serverSupabaseClient(event);

  const response = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });

  let data;
  if (response.data.user && response.data.session) {
    data = {
      session: {
        access_token: response.data.session.access_token,
        expires_at: response.data.session.expires_at || 0,
        token_type: response.data.session.token_type,
      },

      user: {
        id: response.data.user.id,
        email: response.data.user.email || "",
        role: response.data.user.role || "",
      },
    };
    return {
      data: {
        ...data,
      },
      error: null,
    };
  } else {
    let error = {
      name: response.error?.name,
      status: response.error?.status || 400,
      code: response.error?.code || "",
      message: response.error?.message,
      cause: response.error?.cause,
      stack: response.error?.stack || "",
    };
    return {
      data: null,
      error: {
        ...error,
      },
    };
  }
});
