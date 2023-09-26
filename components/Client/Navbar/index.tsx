"use client";

import useNavbarScroll from "@/hooks/useNavbarScroll";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoSVG from "@/assets/LinkSwift.svg";
import Hamburger from "../Shared/Hamburger";

const Navbar = () => {
  // Checkbox
  const [isToggled, setIsToggled] = useState(false);
  const isScrolled = useNavbarScroll();

  return (
    <nav
      className={`md:px-12 xl:px-36 flex justify-between transition duration-500 ease-in-out px-5 py-4 items-center fixed top-0 w-full max-w-screen-2xl z-20 ${
        isScrolled ? "drop-shadow-sm bg-white" : "bg-[#F5F4F4]"
      }`}
    >
      <Link href="/">
        <Image src={LogoSVG} alt="LinkSwift" className="h-7" />
      </Link>
      <Hamburger {...{ isToggled, setIsToggled }} />
      <span
        className={`space-x-4 md:space-x-10 max-md:absolute max-md:top-20
         right-2 max-md:bg-white max-md:shadow-lg max-md:p-4 max-md:rounded-md flex justify-center items-center text-md md:text-lg ${
           isToggled ? "max-md:block" : "max-md:hidden"
         }`}
      >
        <Link href="/login">Login</Link>
        <Link href="/signup" className="text-primary">
          Sign up
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
