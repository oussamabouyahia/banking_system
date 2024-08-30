// profileLoader.ts
import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

// Define the shape of the user data
interface UserProfile {
  iduser: string;
  name: string;
  email: string;
  balance: number;
}

// The loader function with TypeScript
export const profileLoader = async (
  args: LoaderFunctionArgs
): Promise<UserProfile> => {
  const id = localStorage.getItem("userId");

  try {
    const response = await axios.get<{ user: UserProfile }>(
      `/api/user/profile/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data.user; // Return the user object from response.data
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      throw new Response("Session expired. Please log in again.", {
        status: 401,
      });
    } else {
      throw new Response(err.message || "An error occurred", {
        status: err.response ? err.response.status : 500,
      });
    }
  }
};
