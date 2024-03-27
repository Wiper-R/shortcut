import { Input } from "@/components/ui/input";
import { LinkCard } from "./link-card";
import { LinkContainer } from "./link-container";

export default function Page() {
    return <div>
        <Input type="search" placeholder="Search for a link" className="max-w-sm ml-auto"/>
        <LinkContainer/>
    </div>
}