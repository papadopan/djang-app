import { ApiDataResponse } from "@/services/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.results.map((result, index) => (
        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle>{result.title}</CardTitle>
              <span className="text-gray-500">#{index + 1}</span>
            </div>
            <CardDescription>
              {new Date(result.publication_date).toDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-5">
            {result.abstract}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
