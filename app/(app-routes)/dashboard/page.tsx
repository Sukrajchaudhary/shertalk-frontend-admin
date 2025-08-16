import getDashboardIndexData from "@/utils/server/getDashboard";
import Dasboardindex from "./Dasboard-index";
export default async function DashboardPage() {
  const dashboardIndex = await getDashboardIndexData();
  return (
      //@ts-ignore

    <Dasboardindex dashboardIndex={dashboardIndex} />
  );
}
