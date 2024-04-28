import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-full flex-col justify-center py-10">
      <MaxWidthWrapper>
        <div className="text-center">
          <h6 className="text-sm font-medium italic sm:text-base">
            there is always a...
          </h6>
          <h1 className="text-5xl font-extrabold uppercase tracking-tight  sm:text-7xl">
            shortcut
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base">
            Shortcut is your all-in-one solution for URL shortening, QR code
            generation, and link tracking. Say goodbye to long and unwieldy
            URLs. With Shortcut, you can shorten any link in seconds, making it
            easy to share with your audience.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/sign-in" className={buttonVariants({ size: "lg" })}>
            Get Started
          </Link>
          <Link
            className={buttonVariants({ variant: "secondary", size: "lg" })}
            href="/api"
          >
            API Documentation
          </Link>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
