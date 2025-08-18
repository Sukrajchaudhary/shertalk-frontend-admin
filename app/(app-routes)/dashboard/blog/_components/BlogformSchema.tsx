import { z } from "zod";
export const BlogformSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  views: z.coerce.number().min(0, 'Views must be a non-negative integer'),
  image: z.string().url('Must be a valid URL'),
  state: z.string().min(1, 'Please select a state'),
  author: z.string().min(3, 'Autho name is required'),
  category: z.string().min(1, 'Please select a category'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
});
