import { z } from "zod";

export const BlogformSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  content: z.string().min(1, "Content is required").trim(),
  views: z.coerce
    .number()
    .min(0, "Views must be a non-negative integer")
    .refine((val) => !isNaN(val), {
      message: "Views must be a valid number",
    }),
  image: z.union([
    z.instanceof(File, { message: "Image must be a valid file" }),
    z.string().url("Must be a valid URL")
  ]),
  state: z.string().min(1, "Please select a state"),
  author: z.number().min(1, "Author ID is required"),
  category: z.number().min(1, "Please select a category"),
  tags: z.array(z.number()).min(1, "At least one tag is required"),
});
