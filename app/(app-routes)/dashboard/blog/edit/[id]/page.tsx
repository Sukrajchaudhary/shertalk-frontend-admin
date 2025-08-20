"use client";

import React from "react";
import { PageHeader } from "@/components/page-header";
import BlogEdit from "../../_components/BlogEdit";

const EditBlogPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <PageHeader
        title="Edit Blog"
        description="Update an existing blog post"
      />
      <BlogEdit blogId={params.id} />
    </div>
  );
};

export default EditBlogPage;