"use client";

import { Sriracha, Lato } from "next/font/google";
import Link from "next/link";
import CrossImg from "./icons/cross.svg";
import HamburgerImg from "./icons/hamburger.svg";
import QRImg from "./icons/QR.svg";
import LinkImg from "./icons/Link.svg";
import UserImg from "./icons/user.svg";
import { useRef, useState } from "react";
import Input from "./components/input";

const sriracha = Sriracha({ weight: "400", subsets: ["latin"] });
const lato = Lato({ weight: "900", subsets: ["latin"] });

const Navbar = () => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => setChecked(!checked);
  return (
    <nav className="flex justify-between px-5 py-4  items-center drop-shadow-sm bg-white relative">
      <Link href="/" className={`text-primary ${sriracha.className} text-3xl`}>
        LinkSwift
      </Link>
      <input
        type="checkbox"
        className="self-end w-0 h-0"
        id="hamburger"
        value={checked ? "on" : "off"}
        onClick={handleClick}
      />
      <label htmlFor="hamburger" className="md:hidden">
        <img
          src={!checked ? HamburgerImg.src : CrossImg.src}
          alt=""
          className="w-8"
        />
      </label>

      <span
        className={`space-x-4 md:space-x-10 max-md:absolute max-md:top-20
       right-2 max-md:bg-white max-md:shadow-lg max-md:p-4 max-md:rounded-md flex justify-center items-center ${
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
    <main className="mx-5 my-6">
      <h2
        className={`text-6xl font-extrabold whitespace-break-spaces max-sm:max-w-lg max-sm:mx-auto sm:space-x-4 sm:text-center xl:mt-20`}
      >
        <span className="max-sm:block text-primary">Success</span>
        <span className="max-sm:block">Begins</span>
        <span className="max-xl:block text-center">with</span>

        <span className="max-sm:text-end sm:space-x-4">
          <span className="max-sm:block text-primary">Simplified</span>
          <span className="max-sm:block">Sharing!</span>
        </span>
      </h2>
      <p className="text-gray-700 my-8 text-center text-xl">
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
    <button className="flex flex-col items-center px-4 py-2 bg-white rounded-t-lg border-2 border-b-0">
      <img src={props.image} className="w-5" />
      <span className="text-xl">{props.content}</span>
    </button>
  );
};

const DemoForm = () => {
  return (
    <section className="relative">
      <div className="flex justify-center relative z-10">
        <TabBtn content="Short Link" image={LinkImg.src} />
        <TabBtn content="QR Code" image={QRImg.src} />
      </div>
      <form className="bg-white flex flex-col space-y-4 p-5 border-y-2 relative bottom-0.5 z-0 shadow">
        <Input
          label="Long Url"
          placeholder="ex: https://www.your-long-url.com/short-it"
        />
        <div className="space-y-4">
          <div className="flex justify-center items-center">
            <Input label="Domain" placeholder="LinkSwift.com" disabled={true} />
            <span className="text-3xl p-4 mt-6 font-extrabold">/</span>
          </div>

          <Input label="Sub Path (Optional)" placeholder="eg: my-link" />
        </div>

        <span className="bg-orange-100 px-4 py-2 text-lg text-orange-700 rounded-md flex space-x-2">
          <img src={UserImg.src} alt="" />
          <span>Login to keep track of your shorten urls</span>
        </span>
        <button className="bg-primary text-white font-bold p-4 text-lg rounded-lg">
          Shorten It!
        </button>
      </form>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DemoForm />
      {/* Why LinkSwift? */}
      <section className="box-border">
        <h4 className="text-center text-3xl underline my-8 font-semibold">
          Why LinkSwift?
        </h4>
        <div className="bg-white my-8 shadow">
          {/* Wrapper */}
          <ul className="p-5 text-xl space-y-5">
            <li>
              <b>Shorten Links:</b> Say goodbye to those sprawling URLs.
              LinkSwift effortlessly trims them down into sleek, shareable
              links.
            </li>
            <li>
              <b>QR Code Generation:</b> Enhance user accessibility by
              generating QR codes for your shortened links. It's quick, it's
              easy, and it's all right here.
            </li>
            <li>
              <b>Track with Confidence:</b> Securely log in to LinkSwift and
              gain complete control. Track link performance, monitor traffic
              sources, and manage your links, all from a user-friendly
              dashboard.
            </li>
            <li>
              <b>Absolutely Free:</b> Best of all, our premium features are at
              your fingertips, without costing you a dime. No hidden fees, no
              tricks – just powerful link management, free for you.
            </li>
          </ul>
        </div>
      </section>
      <footer className="p-4 bg-white drop-shadow-md flex flex-col justify-center items-center space-y-3">
        <Link
          href="/"
          className={`text-primary ${sriracha.className} text-3xl`}
        >
          LinkSwift
        </Link>
        <span className="text-center">
          Copyright @2023 | LinkSwift - Shivang Rathore
        </span>
      </footer>
    </>
  );
}
