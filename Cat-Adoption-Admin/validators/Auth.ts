import { z } from "zod";

export type AuthSchemaTypes = z.infer<typeof AuthSchema>;

export const AuthSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "password must contain at least 8 characters" }),
});
