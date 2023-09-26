import Link from "next/link";
import LogoSVG from "@/assets/LinkSwift.svg";
import Image from "next/image";

const PlainNavbar = () => {
  return (
    <nav
      className={`px-5 py-4 w-full md:px-12 xl:px-36 
          bg-[#F5F4F4]
        `}
    >
      <Link href="/">
        <Image src={LogoSVG} alt="LinkSwift" className="h-7" />
      </Link>
    </nav>
  );
};

export default PlainNavbar;
