import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import PeopleSharing from "@/public/sharing-vector.svg";
import Image from "next/image";
import Button from "@/components/ui/Button";

function HeroSection() {
  return (
    <section className="overflow-x-hidden mt-14">
      <MaxWidthWrapper>
        <div className="flex">
          <div className="w-1/2 space-y-8 mt-10">
            <h1 className="text-6xl font-black leading-tight">
              Success Begins with{" "}
              <span className="text-blue-600">Simplified</span> Sharing
            </h1>
            <p>
              Shortcut is your all-in-one solution for URL shortening, QR code
              generation, and link tracking. Say goodbye to long and unwieldy
              URLs. With Shortcut, you can shorten any link in seconds, making
              it easy to share with your audience.
            </p>
            <div className="space-x-4">
              <Button size="lg">Get Started</Button>
              <Button variant="secondary" size="lg">
                Read Docs
              </Button>
            </div>
          </div>
          <div className="flex w-1/2">
            <div className="flex-none ml-20">
              <Image
                src={PeopleSharing.src}
                width={1120}
                height={750}
                className="w-[52rem]"
                alt="People sharing on internet"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MaxWidthWrapper className="my-10">
        <hr />
      </MaxWidthWrapper>
    </main>
  );
}
