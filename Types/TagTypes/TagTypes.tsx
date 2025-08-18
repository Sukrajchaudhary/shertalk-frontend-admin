import { z } from "zod";

export const TagFormSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  slug: z.string().optional(),
});

export type TagFormData = z.infer<typeof TagFormSchema>;

export interface TagType {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}