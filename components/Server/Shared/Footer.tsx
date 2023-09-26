import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="p-4 bg-white drop-shadow-md flex flex-col justify-center items-center space-y-3 mt-auto">
      <Link href="/">
        <Logo />
      </Link>
      <span className="text-center">
        Copyright @2023 | LinkSwift - Shivang Rathore
      </span>
    </footer>
  );
};

export default Footer;