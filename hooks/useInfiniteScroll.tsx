import { fetchApi } from "@/lib/api-helpers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounced } from "./useDebounced";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useSearchParams } from "next/navigation";

type ApiData<T> = {
    nextPage: string | null;
} & T;



export function useInfiniteScroll<T = any>(apiEndPoint: string) {   
    const search = useSearchParams().get("search")
    const { data, fetchNextPage, hasNextPage, refetch, isLoading } = useInfiniteQuery({
        queryKey: [apiEndPoint],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });

    const fetchData = async (cursor: string) => {
        const searchParams = new URLSearchParams();

        if (search)
            searchParams.set("search", search)

        if (cursor)
            searchParams.set("cursor", cursor)

        searchParams.set("limit", "10")

        const res = await fetchApi<ApiData<T>>(apiEndPoint + "?" + searchParams.toString(), {})
        if (res.code == "success") return res.data;
        throw new Error("Unable to fetch data. Cause: " + res.message)
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