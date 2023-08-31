import Axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
const baseURL = process.env.NEXT_PUBLIC_HOST;

// const getToken = async () => {
//   const session = await getServerSession(authOptions);
//   //@ts-ignore
//   const accessToken = session?.user?.data?.tokens?.access;
//   return accessToken;
// };

// let token = getToken();
const axios = Axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    // Authorization : `Bearer ${localStorage.getItem("access_token")}`
  },
});
// axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
export default axios;
