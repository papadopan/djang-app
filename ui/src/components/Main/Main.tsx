import { SearchBar } from "../SearchBar/SearchBar";

export const Main = () => {
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
      <SearchBar isPending={false} onFormSubmit={(val) => console.log(val)} />
    </section>
  );
};
