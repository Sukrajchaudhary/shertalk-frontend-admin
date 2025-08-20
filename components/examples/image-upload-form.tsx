"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { createFormDataFromObject, formDataToObject } from "@/utils/uploadHelpers";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";

// Define form schema with Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.instanceof(File, { message: "Image is required" }).nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export function ImageUploadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Create FormData from the form values
      const formData = createFormDataFromObject(values);
      
      // Log the FormData for debugging
      console.log("Form data to be sent:", formDataToObject(formData));
      
      // Example API call with FormData
      // Replace with your actual API endpoint
      const response = await clientSideFetch({
        url: "/api/upload",
        method: "post",
        body: formData,
        toast: "skip",
      });
      
      if (response?.status === 200) {
        toast.success("Image uploaded successfully!");
        form.reset();
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred while uploading the image");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Upload Image</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormDescription>
                  A title for your image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormDescription>
                  A brief description of your image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                    maxSize={2} // 2MB max size
                    onError={(error) => toast.error(error)}
                  />
                </FormControl>
                <FormDescription>
                  Upload an image (JPEG, PNG, GIF, WebP)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Upload Image"}
          </Button>
        </form>
      </Form>
    </div>
  );
}