import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";

import { User } from "../types";

export const profileLoader = async (
  args: LoaderFunctionArgs
): Promise<User> => {
  const id = localStorage.getItem("userId");

  try {
    const response = await axios.get<{ user: User }>(
      `/api/user/profile/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data.user;
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
