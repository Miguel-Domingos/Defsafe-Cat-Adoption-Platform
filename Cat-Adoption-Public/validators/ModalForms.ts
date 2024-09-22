import { z } from "zod";

export type CatSchemaTypes = z.infer<typeof CatSchema>;

export const CatSchema = z.object({
  name: z.string().min(3, { message: "name must contain at least 3 letters" }),
  description: z
    .string()
    .min(3, { message: "name must contain at least 3 letters" }),
});

export type AdoptSchemaTypes = z.infer<typeof AdoptSchema>;

export const AdoptSchema = z.object({
  name: z.string().min(3, { message: "name must contain at least 3 letters" }),
  email: z.string().email({ message: "invalid email" }),
  telephone: z.string().min(8, { message: "invalid number" }),
  reason: z
    .string()
    .min(10, { message: "reasons must contain at least 10 characters" }),
});
