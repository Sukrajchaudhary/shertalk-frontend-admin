"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { clientSideFetch } from "@/utils/clientsideFetch/clientSideFetch";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SkeletonLoader from "./SkeletonLoader";
const getBlogs = async () => {
  try {
    const response = await clientSideFetch({
      url: "/blogs/blogs/",
      method: "get",
      toast: "skip",
    });

    if (response?.status === 200 && response?.data?.results) {
      return response.data.results; // Extract the `results` array
    } else {
      return []; // Return empty array if no results
    }
  } catch (error) {
    return []; // Return empty array on error
  }
};

const BlogIndex = () => {
  const router = useRouter();
  const handleAddBlog = () => {
    router.push("/dashboard/blog/add");
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
    <div>
      {/* Add Blog Button */}
      <div className="flex justify-end px-5 mb-4">
        <Button className="cursor-pointer rounded-4xl" onClick={handleAddBlog}>
          <PlusCircle size={18} />
          Add Blog
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((blog: any) => (
            <TableRow key={blog.id}>
              <TableCell>
                <img
                  src={blog.image || "/default-image.jpg"} 
                  alt={blog.title}
                  className="w-24 h-14 object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell className="max-w-xs truncate text-ellipsis overflow-hidden line-clamp-2">
                {blog.description}
              </TableCell>
              <TableCell>{blog.state}</TableCell>
              <TableCell>{new Date(blog.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{blog.category?.name || "No Category"}</TableCell>
              <TableCell>
                {blog.tags?.map((tag: any) => (
                  <span key={tag.id} className="block">
                    {tag.name}
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogIndex;
