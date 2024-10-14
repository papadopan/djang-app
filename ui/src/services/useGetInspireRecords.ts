import { useMutation } from "@tanstack/react-query";

export const useGetInspireRecords = () => {
  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: async (query: string) => {
      console.log("query", query);
      const response = await fetch("/api/search");
      return response.json();
    },
  });

  return { mutate, data, isError, isPending, error };
};
