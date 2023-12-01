import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import buttonVariants from "@/components/ui/button";
import { cs } from "@/lib";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "Effortless URL Shortening",
    description:
      "Instantly shorten long and complex URLs with just a click. Create concise, easy-to-share links for a seamless user experience.",
  },
  {
    title: "QR Code Generation",
    description:
      "Generate QR codes for your shortened URLs effortlessly. Perfect for bridging the digital and physical world in marketing campaigns.",
  },
  {
    title: "Real-time Click Tracking",
    description:
      "Monitor link clicks in real-time. Gain insights into user engagement and campaign performance with up-to-the-minute data.",
  },
  {
    title: "Scan Analytics",
    description:
      "Track QR code scans and analyze user interactions. Understand when, where, and how your QR codes are being used for improved targeting.",
  },
  {
    title: "Custom Short URLs",
    description:
      "Enhance your brand presence by creating custom short URL aliases. Promote brand consistency across all your digital channels.",
  },
  {
    title: "User-friendly Interface",
    description:
      "Our intuitive platform is designed for all skill levels. Get started quickly without any technical hassle.",
  },
  {
    title: "Efficient Link Organization",
    description:
      "Organize and manage your links with ease using folders and tags. Streamline your link management process.",
  },
  {
    title: "Mobile-Optimized",
    description:
      "Access Linkzy on-the-go with our mobile-responsive design. Manage and track your links from anywhere.",
  },
  {
    title: "Link Expiration Controls",
    description:
      "Create time-sensitive promotions by setting expiration dates for your links, ensuring content relevance.",
  },
];


export default async function Home() {
  return (
    <>
      <MaxWidthWrapper className="flex flex-col items-center gap-10 text-center">
        <div className="whitespace-pre rounded-full border bg-secondary px-6 py-2 text-lg text-primary drop-shadow lg:px-14 lg:text-xl">
          Welcome to Linkzy
        </div>
        <h3 className="text-center text-4xl font-semibold capitalize leading-tight text-secondary lg:text-5xl">
          Success begins with simplified sharing
        </h3>
        <p className="max-w-5xl text-center text-sm text-secondary-light lg:text-lg">
          Linkzy is your all-in-one solution for URL shortening, QR code
          generation, and link tracking. Say goodbye to long and unwieldy URLs.
          With Linkzy, you can shorten any link in seconds, making it easy to
          share with your audience.
        </p>
        <Link href="/sign-up" className={cs(buttonVariants({ size: "md" }))}>
          Get Started
          <ArrowRight className="ml-1 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* Features */}
      <div className="z-0 mx-auto mt-20">
        <h5 className="text-center text-xl font-medium text-white underline underline-offset-4">
          Features
        </h5>
        <ul className="relative mx-4 mt-10 flex flex-wrap justify-center gap-5">
          {features.map((f) => (
            <li
              className="flex max-w-xs cursor-pointer flex-col rounded-md border bg-primary py-[14px] text-center transition-all ease-in-out hover:-translate-y-0.5 hover:shadow-sm hover:shadow-shadow"
              key={f.title}
            >
              {/* Title */}
              <p className="font-medium text-secondary">{f.title}</p>
              <span className="my-[11px] h-px w-full border-t" />
              {/* Description */}
              <p className="px-4 text-left text-secondary-light">
                {f.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
