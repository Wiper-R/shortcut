import ShortCutLogo from "@/assets/shortcut-logo.svg"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export function Logo({ className, ...props }: ComponentProps<'img'>) {
    return <img src={ShortCutLogo.src} {...props} className={cn('w-8', className)} />
}