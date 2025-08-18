"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { toast } from "sonner";
import { BlogformSchema } from "../../_components/BlogformSchema";
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
const BlogAdd = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(BlogformSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      views: 0,
      image: "",
      state: "",
      author: "",
      category: "",
      tags: [],
    },
  });

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag !== "" && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await clientSideFetch({
        url: "/blogs/blogs/",
        method: "post",
        body: data,
        toast: "skip",
      });
      if (res?.status === 200) {
        toast.success("Blog Created SuccessFully!");
      }
    } catch (error) {}
  };

  return (
    <div className=" mx-auto">
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle className="font-semibold text-2xl">
            Create New Blog Post
          </CardTitle>
          <CardDescription>
            Fill in the details to create a new blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
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
                    </FormControl>
                    <FormDescription>
                      A brief description that will appear in previews and
                      search results
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Write your blog content here..."
                        theme="snow"
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ color: [] }, { background: [] }],
                            [{ align: [] }],
                            ["blockquote", "code-block"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                          ],
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The main content of your blog post with rich text
                      formatting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Views and Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="views"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Views</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Initial view count for the post
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter author name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>The author Name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image URL */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL of the featured image that will be displayed with your
                      post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select post state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Current publication status of the post
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the most relevant category for your post
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyPress}
                            placeholder="Type a tag and press Enter"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addTag}
                          >
                            Add
                          </Button>
                        </div>

                        {/* Display tags */}
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className=" cursor-pointer rounded-full bg-gray-300 p-0.5 hover:text-red-500"
                                >
                                  <X size={8} />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Add relevant tags to help categorize and find your post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full md:w-auto cursor-pointer rounded-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating Post..."
                    : "Create Blog"}
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogAdd;
