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
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
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
    </div>
  );
};
