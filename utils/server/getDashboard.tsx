import { serverSideFetchWithAuth } from "../serversideFetch/serverSideFetchWithAuth";

export interface DashbaordIndexTypes {
  total_user: number | 0;
  total_active_user: number | 0;
  total_inactive_user: number | 0;
  total_blocked_user: number | 0;
}
async function getDashboardIndexData() {
  try {
    const response = await serverSideFetchWithAuth({
      url: "/report/user/status/",
      method:"get"
    });
    if(response.status===200){
      return response.data
    }
  } catch (error) {
    return null;
  }
}

export default getDashboardIndexData;
