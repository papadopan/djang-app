import { ApiDataResponse } from "@/services/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArticleLoadingCard } from "./Loader";

export const Articles = ({
  data,
  isPending,
  isError,
  error,
}: {
  data: ApiDataResponse;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}) => {
  if (isPending) {
    return <ArticleLoadingCard />;
  }

  if (isError) {
    return (
      <div className="p-5  w-full text-[#001529] rounded bg-slate-100 flex flex-col items-center">
        <div>
          <h1 className="text-lg font-bold">
            Sometimes something unexpected happens, even to the best
          </h1>
          <p>{error?.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-5  w-full text-[#001529] rounded bg-slate-100 flex flex-col items-center">
        <div>
          <h1 className="text-lg font-bold">
            Welcome to the largest scientific online library
          </h1>
          <p className="text-md mb-6">
            Here you can find the latest scientific articles, papers, and
            documents
          </p>
          <h2 className="font-bold">How can you start exploring</h2>
          <ul className="list-disc pl-6">
            <li>
              Provide a search term that is closest to your article description
            </li>
            <li>
              Our search engine will look into tiltes and abstracts of
              scientific articles and will provide a list with all the matches
            </li>
            <li>
              If not sure just hit search without any input and we will give you
              some suggestions
            </li>
            <li>
              Your results will be complemented with a brief description of all
              the results
            </li>
            <li>Enjoy reading</li>
          </ul>
        </div>
      </div>
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="p-5  w-full text-[#001529] rounded bg-slate-100 flex flex-col items-center">
        <div>
          <h1 className="text-lg font-bold">No articles found</h1>
          <p className="text-md mb-6">
            We could not find any articles matching your search criteria.
          </p>
          <h2 className="font-bold">Tips for more accurate results</h2>
          <ul className="list-disc pl-6">
            <li>Try to be more specifc on your search terms</li>
            <li>Better to provide keywords rather description</li>
            <li>Check for typos</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      {data.summary && (
        <div className="my-4">
          <p className="text-sm font-bold mb-2">
            A brief summary of your articles
          </p>
          <div className=" border-b-2 border-t-2 py-4">
            <div>
              <p className="pl-6 italic text-sm text-gray-600">
                {data.summary}
              </p>
            </div>
          </div>
        </div>
      )}
      <p className="text-sm font-bold">Results: {data.results.length}</p>
      {data.results.map((result, index) => (
        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle className="text-md">{result.title}</CardTitle>
              <span className="text-gray-500 text-xs">#{index + 1}</span>
            </div>
            <CardDescription className="text-xs">
              {new Date(result.publication_date).toDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            {result.abstract}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
