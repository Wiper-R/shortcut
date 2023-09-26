import Image from "next/image";
import Link from "next/link";
import LogoSVG from "@/assets/LinkSwift.svg";

const Navbar = () => {
    return (
      <nav
        className={`bg-white md:px-4 xl:px-6 flex justify-between transition duration-500 ease-in-out px-5 py-4 items-center w-full max-w-screen-2xl drop-shadow-sm`}
        id="dashboard-navbar"
      >
        <Link href="/">
          <Image src={LogoSVG} alt="LinkSwift" className="h-7" />
        </Link>
        <div className="flex gap-4 items-center">
          <span className="rounded-full bg-gray-700 w-10 h-10 leading-10 block text-center text-white">
            S
          </span>
          <span className="text-lg">Shivang Rathore</span>
        </div>
      </nav>
    );
  };

  export default Navbar;