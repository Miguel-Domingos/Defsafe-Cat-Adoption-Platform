import { z } from "zod";

export type AuthSchemaTypes = z.infer<typeof AuthSchema>;

export const AuthSchema = z.object({
  email: z.string().email({ message: "email inválido" }),
  password: z
    .string()
    .min(8, { message: "senha deve conter pelo menos 8 caracteres" }),
});
