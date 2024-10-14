import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const getInspireData = async (query: string) => {
  const params = new URLSearchParams({
    limit: "10",
    offset: "0",
  });

  // make sure to add query only when it is not empty
  if (query && query.trim().length > 0) {
    params.append("query", query);
  }

  try {
    const response = await axios.get("/api/search?" + params);
    return response.data;
  } catch (error: unknown) {
    const defaultMessage =
      "Our servers are having issues. Please try again later.";

    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message ?? defaultMessage);
    }
    if (error instanceof Error) {
      throw new Error(error.message ?? defaultMessage);
    }
    throw new Error(defaultMessage);
  }
};

export const useGetInspireRecords = () => {
  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: async (query: string) => getInspireData(query),
  });

  return { mutate, data, isError, isPending, error };
};
