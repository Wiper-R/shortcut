"use client";

import Link from "next/link";
import Logo from "../components/logo";
import LinkImg from "../icons/Link.svg";

import {ReactElement} from "react";
import {Icon} from "@iconify/react";

const Navbar = () => {
  return (
    <nav
      className={`bg-white md:px-4 xl:px-6 flex justify-between transition duration-500 ease-in-out px-5 py-4 items-center w-full max-w-screen-2xl drop-shadow-sm fixed z-10`}
    >
      <Link href="/">
        <Logo />
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

const NavigationMenu = () => {
  return <nav className=""></nav>;
};

interface INavigationLink {
  href: string;
  text: string;
  icon: ReactElement;
}

const NavigationLink = (props: INavigationLink) => {
  return (
    <Link
      href={props.href}
      className="px-4 py-2 bg-white rounded-sm flex gap-4 hover:bg-sky-100 text-black items-center text-xl"
    >
      {props.icon}
      <span>{props.text}</span>
    </Link>
  );
};

const DashboardManage = () => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="top-[4.5rem] relative">
        <div className="fixed w-64 h-full bg-white max-h-full overflow-y-auto flex flex-col p-2 pb-[4.5rem] gap-y-2">
          <NavigationLink text="Links" icon={<Icon icon="octicon:link-16"/>} href="/manage/links" />
          <NavigationLink text="QR Code" icon={<Icon icon="uil:qrcode-scan"/>} href="/manage/qr-codes"/>
          <hr />
          <NavigationLink text="Settings" icon={<Icon icon="fluent:settings-24-regular"/>} href="/manage/account"/>
        </div>
        <div className="left-64 overflow-y-auto fixed max-h-full pb-[4.5rem]"></div>
      </div>
    </div>
  );
};

export default function Manage() {
  return <DashboardManage></DashboardManage>;
}
