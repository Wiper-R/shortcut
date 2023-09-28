import Link from "next/link";
import Image from "next/image";
import LogoSVG from "@/assets/LinkSwift.svg";

const Footer = () => {
  return (
    <footer className="p-4 bg-white drop-shadow-md flex flex-col justify-center items-center space-y-3 mt-auto">
      <Link href="/">
        <Image src={LogoSVG} alt="LinkSwift" className="h-6" />
      </Link>
      <span className="text-center">
        Copyright @2023 | LinkSwift - Shivang Rathore
      </span>
    </footer>
  );
};

export default Footer;
