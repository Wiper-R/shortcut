"use client";

import Link, { LinkProps } from "next/link";
import Logo from "../components/logo";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { redirect, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AuthState, AuthUser } from "@/redux/reducers/auth-reducer";

const Navbar = () => {
  return (
    <nav
      className={`bg-white md:px-4 xl:px-6 flex justify-between transition duration-500 ease-in-out px-5 py-4 items-center w-full max-w-screen-2xl drop-shadow-sm`}
      id="navbar"
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

interface INavigationLink extends LinkProps {
  icon: string;
  text: string;
  disabled?: boolean;
}

const NavigationLink = (props: INavigationLink) => {
  const pathname = usePathname();
  return (
    <Link
      href={props.href}
      className={`relative flex px-4 py-1 justify-start items-center gap-3 text-lg rounded-sm hover:bg-sky-100 ${
        pathname.includes(props.href.toString())
          ? "bg-sky-100"
          : props.disabled
          ? "bg-gray-300"
          : "bg-white"
      } ${props.disabled ? "pointer-events-none" : ""}`}
    >
      <Icon icon={props.icon} />
      <span>{props.text}</span>
      {props.disabled ? (
        <span className="absolute right-2" title="Will available in future">
          <Icon icon="material-symbols:lock-outline" />
        </span>
      ) : (
        ""
      )}
    </Link>
  );
};

const Sidebar = ({ navHeight }: { navHeight: Number }) => {
  const [toggled, setToggled] = useState(true);

  return (
    <nav
      className={`h-full bg-white transition-all duration-200 shadow-md relative ${
        toggled ? "w-[16rem]" : "w-0"
      }`}
      // style={{ height: `calc(100% - ${navHeight}px)` }}
    >
      <label
        htmlFor="sidebarToggle"
        className="absolute -right-6 z-20 top-10 rounded-tr-full rounded-br-full w-6 h-6 bg-white flex flex-col gap-[0.2rem] cursor-pointer justify-center items-center shadow-md"
      >
        <span
          className={`w-2 h-[0.1rem] bg-black block transition-all duration-200 ${
            toggled ? "-rotate-45" : "rotate-45"
          }`}
        ></span>
        <span
          className={`w-2 h-[0.1rem] bg-black block transition-all duration-200 ${
            toggled ? "rotate-45" : "-rotate-45"
          }`}
        ></span>
      </label>
      <input
        type="checkbox"
        className="hidden"
        id="sidebarToggle"
        value={toggled ? "on" : "off"}
        onClick={() => setToggled(!toggled)}
      />
      <div className="h-full flex flex-col overflow-y-auto gap-2 mt-2">
        <Link
          href={"/manage/new"}
          className="bg-primary text-white flex px-4 py-1 justify-start items-center gap-3 text-lg rounded-sm"
        >
          <Icon icon="majesticons:plus-line" />
          <span>New</span>
        </Link>
        <hr />
        <NavigationLink
          icon="octicon:link-16"
          text="Links"
          href={"/manage/links"}
        />
        <NavigationLink
          disabled
          icon="ph:qr-code"
          text="QR Codes"
          href={"/manage/qrcodes"}
        />
        <hr />
        <NavigationLink
          icon="fluent:settings-24-regular"
          text="Settings"
          href={"/manage/settings"}
        />
      </div>
    </nav>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggled, setToggled] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    setHeight(navbar?.offsetHeight || 0);
  }, []);

  const auth = useSelector<RootState, AuthState>((state) => state.auth);

  // if (auth.isPopulated && !auth.isLoggedIn) {
  //   redirect("/login");
  // } else {
    return (
      <div className="flex h-full flex-col overflow-y-hidden">
        <Navbar />
        <div className={`flex h-full overflow-hidden`}>
          <Sidebar navHeight={height} />
          <div className="overflow-y-auto h-full w-full no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    );
  }
// }
