import * as z from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .max(20, { message: "Name can contain at max 20 character(s)" })
    .trim(),
  email: z.string().email().nonempty(),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must contain at least 6 character(s)",
    }),
});
