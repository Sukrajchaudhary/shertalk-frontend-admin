"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { createFormDataFromObject } from "@/utils/uploadHelpers";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { toast } from "sonner";
import { BlogformSchema } from "./BlogformSchema";
import ReactSelect from "@/components/react-select";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface ReactQuillProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: "snow" | "bubble";
  modules?: { [key: string]: any };
}

const ReactQuill: React.FC<ReactQuillProps> = ({
  value,
  onChange,
  placeholder = "",
  theme = "snow",
  modules = {},
}) => {
  return (
    <div className="border rounded-md">
      <div className="bg-gray-50 border-b p-2 text-xs text-gray-500">
        Rich Text Editor (ReactQuill simulation)
      </div>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
        className="w-full p-3 border-0 resize-none focus:outline-none"
        style={{ minHeight: "200px" }}
      />
    </div>
  );
};

// Zod schema for form validation
type FormData = z.infer<typeof BlogformSchema>;

interface BlogEditProps {
  blogId: string;
}

const BlogEdit: React.FC<BlogEditProps> = ({ blogId }) => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(BlogformSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      views: 0,
      image: "",
      state: "",
      author: undefined,
      category: undefined,
      tags: [],
    },
  });

  // Fetch blog data
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      try {
        const response = await clientSideFetch({
          url: `/blogs/blogs/${blogId}/`,
          method: "get",
          toast: "skip",
        });

        if (response?.status === 200) {
          return response.data;
        } else {
          toast.error("Failed to fetch blog data");
          return null;
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("An error occurred while fetching the blog data");
        return null;
      }
    },
  });

  // Set form values when blog data is loaded
  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title || "",
        description: blog.description || "",
        content: blog.content || "",
        views: blog.views || 0,
        image: blog.image || "",
        state: blog.state || "",
        author: blog.author?.toString() || undefined,
        category: blog.category?.id?.toString() || undefined,
        tags: blog.tags?.map((tag: any) => tag.id.toString()) || [],
      });
    }
  }, [blog, form]);

  const onSubmit = async (data: FormData) => {
    try {
      // Prepare blog data with proper type conversions
      const blogData = {
        title: data.title,
        description: data.description,
        content: data.content,
        views: Number(data.views),
        image: data.image, // This will be handled by FormData if it's a File
        state: data.state,
        author: Number(data.author),
        category: Number(data.category),
        tags: Array.isArray(data.tags) ? data.tags.map(Number) : [],
      };
      
      // Check if image is a File object and use FormData
      if (data.image instanceof File) {
        const formData = createFormDataFromObject(blogData);
        const res = await clientSideFetch({
          url: `/blogs/blogs/${blogId}/`,
          method: "put",
          body: formData,
          toast: "skip",
        });
        
        if (res?.status === 200) {
          toast.success("Blog Updated Successfully!");
          router.push("/dashboard/blog");
        } else {
          console.error("Blog update failed:", res?.data);
          toast.error("Failed to update blog. Please check the form data.");
        }
      } else {
        // Use regular JSON for URL-based images
        const res = await clientSideFetch({
          url: `/blogs/blogs/${blogId}/`,
          method: "put",
          body: blogData,
          toast: "skip",
        });
        
        if (res?.status === 200) {
          toast.success("Blog Updated Successfully!");
          router.push("/dashboard/blog");
        } else {
          console.error("Blog update failed:", res?.data);
          toast.error("Failed to update blog. Please check the form data.");
        }
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("An error occurred while updating the blog.");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading blog data...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-gray-50 min-h-screen">
      <Card className="rounded-sm bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-semibold text-2xl">
            Edit Blog Post
          </CardTitle>
          <CardDescription>
            Update the details of your blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input className="h-11 shadow-none" placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormDescription>
                      The main title of your blog post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description with ReactQuill */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <div className="bg-white rounded-md">
                        <ReactQuill
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write a brief description of your blog post..."
                          theme="snow"
                          modules={{
                            toolbar: [
                              ["bold", "italic", "underline"],
                              ["link"],
                              [{ list: "ordered" }, { list: "bullet" }],
                              ["clean"],
                            ],
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      A brief description that will appear in previews and
                      search results (max 200 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content with ReactQuill */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <div className="bg-white rounded-md">
                        <ReactQuill
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your blog content here..."
                          theme="snow"
                          modules={{
                            toolbar: [
                              ["bold", "italic", "underline", "strike"],
                              ["blockquote", "code-block"],
                              [{ header: 1 }, { header: 2 }],
                              [{ list: "ordered" }, { list: "bullet" }],
                              [{ script: "sub" }, { script: "super" }],
                              [{ indent: "-1" }, { indent: "+1" }],
                              [{ direction: "rtl" }],
                              [{ size: ["small", false, "large", "huge"] }],
                              [{ header: [1, 2, 3, 4, 5, 6, false] }],
                              [{ color: [] }, { background: [] }],
                              [{ font: [] }],
                              [{ align: [] }],
                              ["clean"],
                              ["link", "image", "video"],
                            ],
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The main content of your blog post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Views */}
              <FormField
                control={form.control}
                name="views"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Views</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-11 shadow-none"
                        placeholder="Enter view count"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Number of views for this post</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <ReactSelect
                        name="author"
                        url="/users/users/"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select an author"
                        isClearable
                      />
                    </FormControl>
                    <FormDescription>The author of this blog post</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload and Post State in same row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Featured Image */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                          maxSize={5 * 1024 * 1024} // 5MB
                          accept={{
                            'image/jpeg': [],
                            'image/png': [],
                            'image/webp': [],
                          }}
                          showPreview
                          previewSize={24}
                          className="h-40"
                          onError={(error) => toast.error(error)}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload a featured image for your blog post (max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Post State */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post State</FormLabel>
                      <FormControl>
                        <ReactSelect
                          name="state"
                          url=""
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select post state"
                        />
                      </FormControl>
                      <FormDescription>
                        The current state of this blog post
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Category and Tags in same row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <ReactSelect
                          name="category"
                          url="/blogs/categories/"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select a category"
                          isClearable
                        />
                      </FormControl>
                      <FormDescription>
                        The category this blog post belongs to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <ReactSelect
                          name="tags"
                          url="/blogs/tags/"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select tags"
                          isMulti
                        />
                      </FormControl>
                      <FormDescription>
                        Tags related to this blog post
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  Update Blog Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEdit;