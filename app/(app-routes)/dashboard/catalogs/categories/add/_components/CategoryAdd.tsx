"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CategoryFormSchema,
  CategoryFormData,
} from "@/Types/CategoryTypes/CategoryTypes";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { useQueryClient } from "@tanstack/react-query";

const CategoryAdd = () => {
  const router = useRouter();
  const queryClient=useQueryClient()
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (!data.slug) {
        data.slug = data.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "");
      }

      // Replace with actual API call
      const response = await clientSideFetch({
        url: "/blogs/categories/",
        method: "post",
        body: data,
        toast: "skip",
      });
      if (response?.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["category"] });
        toast.success("Category created successfully");
        router.push("/dashboard/catalogs/categories");
      } else {
        toast.error(`${response?.data?.type}`, {
          description: `${response?.data.errors[0].detail}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col space-y-4 p-4">
      <div className="flex items-center px-3 justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Category</h2>
          <p className="text-muted-foreground">Create a new content category</p>
        </div>
        <Button
          className="rounded-full"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Enter the details for the new category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the category as it will appear to users
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter slug or leave empty to generate automatically"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The URL-friendly version of the name. Leave blank to
                      generate automatically.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button className="rounded-full" type="submit">
                  Create Category
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryAdd;
