import { serverSideFetchWithAuth } from "@/utils/serversideFetch/serverSideFetchWithAuth";
import TagIndex from "./_components/TagIndex";

export default async function TagsPage() {
  const res = await serverSideFetchWithAuth({
    url: "/blogs/tags/",
    method: "get",
  });
  let tags = [];
  if (res.status === 200) {
    tags = res.data.results || [];
  }
  return <TagIndex tagsList={tags} />;
}
