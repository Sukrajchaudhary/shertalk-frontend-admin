import getAllUsers from "@/utils/server/getAllUsers";
import RootLayout from "./RootLayout";
import getDashboardIndexData from "@/utils/server/getDashboard";
export default async function page() {
  const userList = await getAllUsers();
  const userCounts=await getDashboardIndexData()
  return (
    <>
      <RootLayout userList={userList} userCounts={userCounts}/>
    </>
  );
}
