"use client";

import { useLiveSearch } from "@/hooks/useLiveSearch";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";

export function Search() {
  const params = useSearchParams();
  const { onSearch } = useLiveSearch();
  return (
    <Input
      type="search"
      placeholder="Search for a link"
      className="ml-auto max-w-sm"
      defaultValue={params.get("search") || ""}
      onInput={(e) => {
        e.preventDefault();
        onSearch(e.currentTarget.value);
      }}
    />
  );
}
