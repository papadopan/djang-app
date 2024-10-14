import { Skeleton } from "@/components/ui/skeleton";

export function ArticleLoadingCard() {
  return (
    <div className="flex flex-col space-y-3" data-testid="articlesLoading">
      <Skeleton className="h-[200px] rounded bg-slate-100" />
      <Skeleton className="h-8 w-[250px] bg-slate-100 rounded" />
      {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
        <Skeleton key={item} className="h-[200px] rounded bg-slate-100" />
      ))}
    </div>
  );
}
