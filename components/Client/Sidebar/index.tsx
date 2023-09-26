"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavigationLink from "./NavigationLink";
import { PiQrCode } from "react-icons/pi";
import { BiLink } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import SidebarToggle from "./SidebarToggle";

const Sidebar = () => {
  const [toggled, setToggled] = useState(true);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("dashboard-navbar");
    if (!navbar) return;
    setHeight(navbar.offsetHeight);
  }, []);

  return (
    <aside
      className={`bg-white h-full transition-all duration-200 shadow-md relative ${
        toggled ? "w-[16rem]" : "w-0"
      }`}
      // style={{ height: `calc(100% - ${navHeight}px)` }}
    >
      <SidebarToggle {...{ toggled, setToggled }} />
      <nav className="relative h-full flex flex-col overflow-y-auto gap-2 pt-2 bg-white z-20">
        <Link
          href={"create-new"}
          className="bg-primary text-white flex px-4 py-1 justify-start items-center gap-3 text-lg rounded-sm"
        >
          <AiOutlinePlus />
          <span>New</span>
        </Link>
        <hr />
        <NavigationLink icon={<BiLink />} text="Links" href={"links"} />
        <NavigationLink
          disabled
          icon={<PiQrCode />}
          text="QR Codes"
          href={"qr-codes"}
        />
        <hr />
        <NavigationLink icon={<GoGear />} text="Settings" href={"settings"} />
      </nav>
    </aside>
  );
};

export default Sidebar;
