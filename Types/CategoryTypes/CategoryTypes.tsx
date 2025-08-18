import { z } from "zod";

export const CategoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof CategoryFormSchema>;

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}