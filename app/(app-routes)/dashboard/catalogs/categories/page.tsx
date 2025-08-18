import { serverSideFetchWithAuth } from "@/utils/serversideFetch/serverSideFetchWithAuth";
import CategoryIndex from "./_components/CategoryIndex";
export default async function CategoriesPage() {
  const res = await serverSideFetchWithAuth({
    url: "/blogs/categories/",
    method: "get",
  });
  let category = [];
  if (res.status === 200) {
    category = res.data.results || [];
  }
  return <CategoryIndex category={category} />;
}
