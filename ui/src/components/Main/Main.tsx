import { useGetInspireRecords } from "@/services/useGetInspireRecords";
import { SearchBar } from "../SearchBar/SearchBar";

export const Main = () => {
  const { mutate, data, isPending } = useGetInspireRecords();
  console.log("data", data);
  return (
    <section className="py-6 px-10">
      <>
        <h1 className="text-lg font-bold">
          Discover High-Energy Physics Content
        </h1>
        <p className="text-sm text-gray-600">
          INSPIRE is a trusted community hub that helps researchers to share and
          find accurate scholarly information in high energy physics
        </p>
      </>
      <SearchBar isPending={isPending} onFormSubmit={mutate} />
    </section>
  );
};
