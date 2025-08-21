import { serverSideFetchWithAuth } from "@/utils/serversideFetch/serverSideFetchWithAuth";
import RootLayouts from "./components/RootLayouts";

export default async function ShowPortflio() {
 const response =await serverSideFetchWithAuth({
      url:"/portfolio/trade-books/",
      method:"get"
 })
 let portfolio=[]
 if(response?.status===200){
  portfolio=response.data.results||[]
 }
 else {
      return []
 }
  return <RootLayouts portfolio={portfolio} />;
}
