"use client";
import React from "react";
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
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export interface category {
  id: number;
  name: string;
  slug: string;
}
const CategoryIndex = ({ category }: { category: category[] }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await clientSideFetch({
        url: "/blogs/categories/",
        method: "get",
        toast: "skip",
      });
      return response?.data?.results || [];
    },
    initialData: category,
  });
  const handleDelete = async (slug: string | number) => {
    try {
      await clientSideFetch({
        url: `/blogs/categories/${slug}/`,
        method: "delete",
        toast: "skip",
      });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-1 flex-col space-y-4 p-4 px-8">
      <div className="flex items-center  justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Manage your content categories
          </p>
        </div>
        <Button
          className="rounded-full"
          onClick={() => router.push("/dashboard/catalogs/categories/add")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <Card>
        <CardHeader className="px-2">
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            A list of all categories in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-base">Name</TableHead>
                <TableHead className="font-semibold text-base">Slug</TableHead>
                <TableHead className="font-semibold text-base">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((category: any) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/dashboard/catalogs/categories/edit/${category.id}`
                          )
                        }
                        className="cursor-pointer h-6 w-6 rounded-full p-0.5"
                      >
                        <Pencil className="h-3 w-3" />{" "}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(category.slug)}
                        className="cursor-pointer h-6 w-6 rounded-full p-0.5"
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

export default CategoryIndex;
