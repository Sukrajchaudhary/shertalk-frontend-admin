"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const BlogIndex = () => {
  const router = useRouter();

  const handleAddBlog = () => {
    router.push("/dashboard/blog/add");
  };

  const blogs = [
    {
      id: "BLOG001",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=60&fit=crop&crop=center",
      title: "Top 10 Stocks to Watch This Quarter",
      description:
        "Comprehensive analysis of high-potential stocks for Q3 2024 with detailed market insights and expert recommendations.",
      status: "Published",
      publishDate: "2024-03-15",
    },
    {
      id: "BLOG002",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop&crop=center",
      title: "Cryptocurrency Market Trends",
      description:
        "Latest trends in cryptocurrency markets including Bitcoin, Ethereum analysis and emerging altcoins to consider.",
      status: "Draft",
      publishDate: "2024-03-20",
    },
    {
      id: "BLOG003",
      image:
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=100&h=60&fit=crop&crop=center",
      title: "Federal Reserve Rate Impact",
      description:
        "How recent Federal Reserve decisions affect stock markets and investment strategies for retail investors.",
      status: "Published",
      publishDate: "2024-03-12",
    },
    {
      id: "BLOG004",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=60&fit=crop&crop=center",
      title: "Tech Sector Analysis 2024",
      description:
        "Deep dive into technology stocks performance, upcoming IPOs, and major tech companies quarterly results.",
      status: "Published",
      publishDate: "2024-03-18",
    },
    {
      id: "BLOG005",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=100&h=60&fit=crop&crop=center",
      title: "Dividend Investing Strategies",
      description:
        "Complete guide to dividend investing including high-yield stocks and building passive income portfolios.",
      status: "Scheduled",
      publishDate: "2024-03-25",
    },
    {
      id: "BLOG006",
      image:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=100&h=60&fit=crop&crop=center",
      title: "Market Volatility Guide",
      description:
        "Understanding market volatility patterns and strategies to protect your investment portfolio during uncertain times.",
      status: "Draft",
      publishDate: "2024-03-22",
    },
    {
      id: "BLOG007",
      image:
        "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=100&h=60&fit=crop&crop=center",
      title: "ESG Investing Opportunities",
      description:
        "Environmental, Social, and Governance investing trends with top ESG-rated companies and sustainable funds.",
      status: "Published",
      publishDate: "2024-03-10",
    },
  ];

  return (
    <div>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-24 h-14 object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell className="max-w-xs truncate text-ellipsis overflow-hidden line-clamp-2">
                {blog.description}
              </TableCell>
              <TableCell>{blog.status}</TableCell>
              <TableCell>{blog.publishDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogIndex;
