import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounced } from "./useDebounced";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useSearchParams } from "next/navigation";
import client from "@/lib/api-client";

type ApiData<T> = {
  nextPage: string | null;
  entries: T[];
};

export function useInfiniteScroll<T = any>(apiEndPoint: string) {
  const search = useSearchParams().get("search");
  const { data, fetchNextPage, hasNextPage, refetch, isLoading } =
    useInfiniteQuery({
      queryKey: [apiEndPoint],
      queryFn: ({ pageParam }) => fetchData(pageParam),
      initialPageParam: "",
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const fetchData = async (cursor: string) => {
    const searchParams = new URLSearchParams();

    if (search) searchParams.set("search", search);

    if (cursor) searchParams.set("cursor", cursor);

    searchParams.set("limit", "10");

    try {
      const res = await client.get<ApiData<T>>(
        apiEndPoint + "?" + searchParams.toString(),
        {},
      );
      return res.data;
    } catch (e) {
      throw new Error("Unable to fetch data. Cause: " + e);
    }
  };

  const handleFetchNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useDebounced(search, refetch);
  const observed = useIntersectionObserver<HTMLDivElement>(handleFetchNextPage);
  return { data, element: observed, isLoading };
}
