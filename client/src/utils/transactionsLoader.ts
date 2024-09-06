import axios from "axios";

export const transactionsLoader = async () => {
  const id = localStorage.getItem("userId");
  try {
    const response = await axios.get(`/api/transaction/${id}`, {
      withCredentials: true,
    });

    return response.data.myTransaction;
  } catch (err: any) {
    if (err.response && err.response.status === 400) {
      throw new Response("something went wrong.", {
        status: 400,
      });
    } else {
      throw new Response(err.message || "An error occurred", {
        status: err.response ? err.response.status : 500,
      });
    }
  }
};
