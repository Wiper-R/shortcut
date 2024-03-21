import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center py-10">
      <MaxWidthWrapper>
      <div className="text-center">
        <h6 className="italic font-medium text-sm sm:text-base">there is always a...</h6>
        <h1 className="uppercase font-extrabold tracking-tight text-5xl  sm:text-7xl">shortcut</h1>
        <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base">Shortcut is your all-in-one solution for URL shortening, QR code generation, and link tracking. Say goodbye to long and unwieldy URLs. With Shortcut, you can shorten any link in seconds, making it easy to share with your audience.</p>
      </div>
      <div className="mt-10 gap-4 flex flex-wrap items-center justify-center">
        <Link href="/sign-in" className={buttonVariants({ size: "lg" })}>Get Started</Link>
        <Link className={buttonVariants({ variant: "secondary", size: "lg" })} href="/api">API Documentation</Link>
      </div>
      </MaxWidthWrapper>
    </main>
  );
}
