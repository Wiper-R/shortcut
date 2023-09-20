"use client";

import { Sriracha, Lato } from "next/font/google";
import Link from "next/link";
import QRImg from "./icons/QR.svg";
import LinkImg from "./icons/Link.svg";
import UserImg from "./icons/user.svg";
import { useState, useEffect } from "react";
import Input from "./components/input";
import Logo from "./components/logo";
import { useSelector } from "react-redux";
import Footer from "./components/footer";
import { RootState } from "@/redux/store";

const sriracha = Sriracha({ weight: "400", subsets: ["latin"] });
const lato = Lato({ weight: "900", subsets: ["latin"] });

const Navbar = () => {
  // Checkbox
  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);

  // Navigation color and shadow change
  const [isOut, setIsOut] = useState(false); // Out of screen
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY === 0) setIsOut(false);
      else setIsOut(true);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <nav
      className={`md:px-12 xl:px-36 flex justify-between transition duration-500 ease-in-out px-5 py-4 items-center fixed top-0 w-full max-w-screen-2xl z-20 ${
        isOut ? "drop-shadow-sm bg-white" : "bg-[#F5F4F4]"
      }`}
    >
      <Link href="/">
        <Logo />
      </Link>
      <input
        type="checkbox"
        className="self-end w-0 h-0"
        id="hamburger"
        value={checked ? "on" : "off"}
        onClick={handleClick}
      />
      <label
        htmlFor="hamburger"
        className="md:hidden relative cursor-pointer p-4"
      >
        <span className="block -translate-x-3 relative">
          <span
            className={`h-0.5 w-6 bg-black block absolute origin-center  transition duration-500 ease-in-out
             ${checked ? "rotate-45" : "-translate-y-2"}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black block absolute transition duration-500 ease-in-out
             ${checked ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black block absolute origin-center transition duration-500 ease-in-out
             ${checked ? "-rotate-45" : "translate-y-2"}`}
          ></span>
        </span>
      </label>

      <span
        className={`space-x-4 md:space-x-10 max-md:absolute max-md:top-20
       right-2 max-md:bg-white max-md:shadow-lg max-md:p-4 max-md:rounded-md flex justify-center items-center text-md md:text-lg ${
         checked ? "max-md:block" : "max-md:hidden"
       }`}
      >
        <Link href="/login">Login</Link>
        <Link href="/sign-up" className="text-primary">
          Sign up
        </Link>
      </span>
    </nav>
  );
};

const Hero = () => {
  return (
    <main className="mx-5 mb-6 mt-24 md:mt-36">
      <h2
        className={`text-5xl xl:text-6xl font-extrabold whitespace-break-spaces max-xsm:max-w-lg max-xsm:mx-auto xsm:space-x-4 xsm:text-center xl:mt-20`}
      >
        <span className="max-xsm:block text-primary">Success</span>
        <span className="max-xsm:block">Begins</span>
        <span className="max-lg:block text-center">with</span>

        <span className="max-xsm:text-end xsm:space-x-4">
          <span className="max-xsm:block text-primary">Simplified</span>
          <span className="max-xsm:block">Sharing!</span>
        </span>
      </h2>
      <p className="text-gray-700 my-8 text-center text-xl md:text-2xl">
        Are you tired of clunky links cluttering your online presence? Look no
        further!
        <br /> <b>LinkSwift</b> is your trusted companion for streamlining your
        web sharing experience.
      </p>
    </main>
  );
};

interface ITabBtnProps {
  content: string;
  image: string;
}

const TabBtn = (props: ITabBtnProps) => {
  return (
    <button className="flex max-xl:flex-col xl:space-x-3 items-center px-6 py-3 xl:py-4 bg-white rounded-t-xl border-2 border-b-0">
      <img src={props.image} className="w-5 xl:w-6" />
      <span className="text-xl xl:text-2xl text-gray-700">{props.content}</span>
    </button>
  );
};

const DemoForm = () => {
  return (
    <section className="relative sm:mx-6 md:mx-12 lg:mx-20 xl:mx-44 md:my-20">
      <div className="flex justify-center relative z-10">
        <TabBtn content="Short Link" image={LinkImg.src} />
        <TabBtn content="QR Code" image={QRImg.src} />
      </div>
      <form className="bg-white flex flex-col space-y-4 p-5 lg:p-12 border-y-2 relative bottom-0.5 z-0 shadow sm:rounded-xl">
        <Input
          label="Long Url"
          placeholder="ex: https://www.your-long-url.com/short-it"
        />
        <div className="flex max-xl:space-y-4 max-xl:flex-col xl:justify-center xl:items-center">
          <div className="flex justify-center items-center xl:basis-2/4">
            <Input label="Domain" placeholder="LinkSwift.com" disabled={true} />
            <span className="text-3xl p-4 mt-8 font-extrabold">/</span>
          </div>

          <Input label="Sub Path (Optional)" placeholder="eg: my-link" />
        </div>

        <span className="bg-orange-100 px-4 py-2 text-lg text-orange-700 rounded-md flex space-x-2 lg:text-xl">
          <img src={UserImg.src} alt="" className="w-5" />
          <span>Login to keep track of your shorten urls</span>
        </span>
        <button className="bg-primary text-white font-bold p-4 text-lg rounded-lg lg:text-xl">
          Shorten It!
        </button>
      </form>
    </section>
  );
};

const WhyLinkSwift = () => {
  return (
    <section className="box-border sm:mx-6 md:mx-12 lg:mx-20 xl:mx-44">
      <h4 className="text-center text-3xl underline my-8 font-semibold">
        Why LinkSwift?
      </h4>
      <div className="bg-white my-8 shadow sm:rounded-md">
        {/* Wrapper */}
        <ul className="p-5 text-xl space-y-5">
          <li>
            <b>Shorten Links:</b> Say goodbye to those sprawling URLs. LinkSwift
            effortlessly trims them down into sleek, shareable links.
          </li>
          <li>
            <b>QR Code Generation:</b> Enhance user accessibility by generating
            QR codes for your shortened links. It's quick, it's easy, and it's
            all right here.
          </li>
          <li>
            <b>Track with Confidence:</b> Securely log in to LinkSwift and gain
            complete control. Track link performance, monitor traffic sources,
            and manage your links, all from a user-friendly dashboard.
          </li>
          <li>
            <b>Absolutely Free:</b> Best of all, our premium features are at
            your fingertips, without costing you a dime. No hidden fees, no
            tricks – just powerful link management, free for you.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DemoForm />
      <WhyLinkSwift />
      <Footer />
    </>
  );
}
