import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchBarSchema = z.object({
  query: z.string().optional(),
});

export const SearchBar = ({
  onFormSubmit,
  isPending,
}: {
  onFormSubmit: (query: string) => void;
  isPending: boolean;
}) => {
  const form = useForm<z.infer<typeof searchBarSchema>>({
    resolver: zodResolver(searchBarSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (values: z.infer<typeof searchBarSchema>) => {
    onFormSubmit(values.query ?? "");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex justify-center gap-4 my-4"
    >
      <input
        {...form.register("query")}
        className="w-full p-2 rounded border border-[#001529]"
        placeholder="Search for articles"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-[#001529] text-white hover:bg-[#001529]/90 py-3 px-4  disabled:cursor-not-allowed rounded disabled:bg-[#001529]/10"
      >
        search
      </button>
    </form>
  );
};
