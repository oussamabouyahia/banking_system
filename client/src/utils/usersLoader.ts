import axios from "axios";

import { User } from "../types";

export const usersLoader = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`/api/user`, {
      withCredentials: true,
    });

    return response.data.users;
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
