import { PropsWithChildren } from "react";

export default function Layout({children}: PropsWithChildren){
    return <div className="my-10 w-full max-w-[384px]">{children}</div>
}