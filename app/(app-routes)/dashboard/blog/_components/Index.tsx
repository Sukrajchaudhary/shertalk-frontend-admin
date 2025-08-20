"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BlogResults } from "@/Types/BlogsTypes/BlogTypes";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import SkeletonLoader from "./SkeletonLoader";
const getBlogs = async () => {
  try {
    const response = await clientSideFetch({
      url: "/blogs/blogs/",
      method: "get",
      toast: "skip",
    });

    if (response?.status === 200 && response?.data?.results) {
      return response.data.results;
        } else {
      return []
    }
  } catch (error) {
    return [];
  }
};

const BlogIndex = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const handleAddBlog = () => {
    router.push("/dashboard/blog/add");
  };
  
  const handleEditBlog = (id: number) => {
    router.push(`/dashboard/blog/edit/${id}`);
  };
  
  const handleDeleteBlog = async (id: number) => {
    try {
      const response = await clientSideFetch({
        url: `/blogs/blogs/${id}/`,
        method: "delete",
        toast: "skip",
      });
      
      if (response?.status === 204) {
        toast.success("Blog deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog");
      console.error("Delete blog error:", error);
    }
  };
  
  const { data, isLoading} = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnMount: false,
  });
  if (isLoading) {
    return <SkeletonLoader/>;
  }
  return (
    <div className="">
      <div className="flex justify-end mb-4">
        <Button className="cursor-pointer rounded-4xl" onClick={handleAddBlog}>
          <PlusCircle size={18} />
          Add Blog
        </Button>
      </div>
      <div className="bg-white rounded-md shadow-sm overflow-x-auto max-w-[1230px]">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-[100px] p-4">Image</TableHead>
              <TableHead className="p-4">Title</TableHead>
              <TableHead className="p-4">Description</TableHead>
              <TableHead className="p-4">Status</TableHead>
              <TableHead className="p-4">Publish Date</TableHead>
              <TableHead className="p-4">Category</TableHead>
              <TableHead className="p-4">Tags</TableHead>
              <TableHead className="text-right p-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

        <TableBody>
          {data.map((blog: BlogResults) => (
            <TableRow key={blog.id} className="hover:bg-gray-50 border-b last:border-0">
              <TableCell >
                <img
                  src={blog.image?.trim() || "/placeholder.jpg"} 
                  alt={blog.title}
                  className="w-24 h-20  rounded-md shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.jpg";
                  }}
                />
              </TableCell>
              <TableCell className="font-medium p-4">{blog.title}</TableCell>
              <TableCell className="max-w-xs p-4">
                <div className="line-clamp-2 text-sm text-gray-700">
                  {blog.description}
                </div>
              </TableCell>
              <TableCell className="p-4">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "capitalize",
                    blog.state === "published" && "bg-green-100 text-green-800 hover:bg-green-100",
                    blog.state === "draft" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
                    blog.state === "archived" && "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  )}
                >
                  {blog.state}
                </Badge>
              </TableCell>
              <TableCell className="p-4">{new Date(blog.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="p-4">{blog.category?.name || "No Category"}</TableCell>
              <TableCell className="p-4">
                <div className="flex flex-wrap gap-1">
                  {blog.tags && blog.tags.length > 0 ? (
                    blog.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No tags</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right flex space-x-0.5 align-middle p-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEditBlog(blog.id)}
                  title="Edit blog"
                  className="cursor-pointer rounded-full p-.5"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 rounded-full hover:text-red-600 cursor-pointer"
                      title="Delete blog"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the blog
                        &quot;{blog.title}&quot; and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default BlogIndex;
