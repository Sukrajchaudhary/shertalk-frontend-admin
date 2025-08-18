"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
export interface TagsTypes {
  id: number;
  name: string;
  slug: string;
}
const TagIndex = ({ tagsList }: { tagsList: TagsTypes[] }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const getTags = await clientSideFetch({
        url: "/blogs/tags/",
        toast: "skip",
        method: "get",
      });
      if (getTags?.status === 200) {
        return getTags?.data.results || [];
      }
    },
    initialData: tagsList,
  });
  const handleDelete = async (slug: string | number) => {
    try {
      await clientSideFetch({
        url: `/blogs/tags/${slug}/`,
        method: "delete",
        toast: "skip",
      });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tags</h2>
          <p className="text-muted-foreground">Manage your content tags</p>
        </div>
        <Button
          className="rounded-full"
          onClick={() => router.push("/dashboard/catalogs/tags/add")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tags</CardTitle>
          <CardDescription>A list of all tags in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-base">Name</TableHead>
                <TableHead className="font-semibold text-base">Slug</TableHead>
                {/* <TableHead>Created At</TableHead> */}
                <TableHead className="font-semibold text-base">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((tag: any) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell>{tag.slug}</TableCell>
                  {/* <TableCell>
                    {new Date(tag.createdAt).toLocaleDateString()}
                  </TableCell> */}
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(`/dashboard/catalogs/tags/edit/${tag.id}`)
                        }
                        className="cursor-pointer rounded-full flex justify-center items-center h-6 w-6 p-0"
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(tag.slug)}
                        className="cursor-pointer rounded-full flex justify-center items-center h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />{" "}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TagIndex;
