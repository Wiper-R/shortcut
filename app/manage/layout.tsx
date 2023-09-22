"use client";

import Link from "next/link";
import Logo from "../components/logo";

import { ReactElement, useState } from "react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

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

interface INavigationLink {
  href: string;
  text: string;
  icon: ReactElement;
}

const NavigationLink = (props: INavigationLink) => {
  const pathname = usePathname();
  return (
    <Link
      href={props.href}
      className={`px-4 py-2 bg-white rounded-sm flex gap-4  text-black items-center text-2xl hover:bg-gray-100 ${
        pathname == props.href ? "bg-sky-100" : ""
      }`}
    >
      {props.icon}
      <span className="hidden">{props.text}</span>
    </Link>
  );
};

const Sidebar = ({ className }: { className: string }) => {
  return (
    <div
      className={`absolute w-fit h-full bg-white max-h-full overflow-y-auto flex flex-col p-2 pb-[4.5rem] gap-y-2 z-10 ${className} transition-all duration-250 ease-linear`}
    >
      <button className="text-2xl flex items-center gap-4 bg-primary px-4 py-2 text-white rounded-md">
        <Icon icon="fe:plus" />
        <span className="hidden">New</span>
      </button>
      <hr className="my-2" />
      <NavigationLink
        text="Links"
        icon={<Icon icon="octicon:link-16" />}
        href="/manage/links"
      />
      <NavigationLink
        text="QR Code"
        icon={<Icon icon="uil:qrcode-scan" />}
        href="/manage/qr-codes"
      />
      <hr />
      <NavigationLink
        text="Settings"
        icon={<Icon icon="fluent:settings-24-regular" />}
        href="/manage/settings"
      />
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="h-full overflow-clip relative">
      <Navbar />
      <button onClick={() => setToggled(!toggled)} className="absolute right-10 top-20  z-30">Click to Test</button>
      <div className="top-[4.5rem] relative flex h-full">
        <Sidebar className={!toggled ? "-left-20" : "-left-0"} />
        <div className="overflow-y-auto relative max-h-full pb-[4.5rem] overflow-x-hidden w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
