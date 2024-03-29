"use client"

import { Input } from "@/components/ui/input";
import { LinkContainer } from "./link-container";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();




    // TODO: Make custom hook
    return <div>
        <Input type="search" placeholder="Search for a link" className="max-w-sm ml-auto"
            defaultValue={searchParams.get("search") || ""}
            onInput={(e) => {
                e.preventDefault();
                const params = new URLSearchParams(searchParams);
                const search = e.currentTarget.value;
                if (search) params.set("search", search);
                else params.delete("search");
                router.replace(pathname + "?" + params.toString())
            }}
        />
        <LinkContainer />
    </div>
}