import { useGetInspireRecords } from "@/services/useGetInspireRecords";
import { SearchBar } from "../SearchBar/SearchBar";
import { Articles } from "../Articles/Articles";
import { Content } from "@/common/Content";

export const Main = () => {
  const { mutate, data, isPending, isError, error } = useGetInspireRecords();
  console.log("data", data);
  return (
    <section className="py-6 px-10">
      <Content>
        <>
          <h1 className="text-lg font-bold">
            Discover High-Energy Physics Content
          </h1>
          <p className="text-sm text-gray-600">
            INSPIRE is a trusted community hub that helps researchers to share
            and find accurate scholarly information in high energy physics
          </p>
        </>
        <SearchBar isPending={isPending} onFormSubmit={mutate} />
        <Articles
          data={data}
          isPending={isPending}
          isError={isError}
          error={error}
        />
      </Content>
    </section>
  );
};
