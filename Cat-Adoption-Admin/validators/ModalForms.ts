import { z } from "zod";

export type CatSchemaTypes = z.infer<typeof CatSchema>;

export const CatSchema = z.object({
  name: z.string().min(3, { message: "name must contain at least 3 letters" }),
  description: z
    .string()
    .min(3, { message: "name must contain at least 3 letters" }),
});
