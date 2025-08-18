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
import { TagFormSchema, TagFormData } from "@/Types/TagTypes/TagTypes";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { useQueryClient } from "@tanstack/react-query";

const TagAdd = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<TagFormData>({
    resolver: zodResolver(TagFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (data: TagFormData) => {
    try {
      if (!data.slug) {
        data.slug = data.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "");
      }

      const res = await clientSideFetch({
        url: "/blogs/tags/",
        method: "post",
        body: data,
        toast: "skip",
      });
      if (res?.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        toast.success("Tag created successfully");
        router.push("/dashboard/catalogs/tags");
      } else {
        toast.error(`${res?.data?.type}`, {
          description: `${res?.data.errors[0].detail}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add Tag</h2>
          <p className="text-muted-foreground">Create a new content tag</p>
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
          <CardTitle>Tag Details</CardTitle>
          <CardDescription>Enter the details for the new tag</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tag name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the tag as it will appear to users
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
                  Create Tag
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TagAdd;
