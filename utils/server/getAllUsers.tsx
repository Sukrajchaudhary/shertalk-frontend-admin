import { serverSideFetchWithAuth } from "../serversideFetch/serverSideFetchWithAuth";
export interface userResult {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
  role: string;
  phone_number: string;
  date_joined: string;
  is_blocked: boolean;
}
export interface userListTypes {
  count: number;
  next: string;
  previous: string;
  results: userListTypes[];
}
async function getAllUsers() {
  try {
    const res = await serverSideFetchWithAuth({
      url: "/auth/list/",
      method: "get",
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return null;
  }
}

export default getAllUsers