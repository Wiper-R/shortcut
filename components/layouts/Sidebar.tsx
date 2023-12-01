import { trpc } from "@/app/_trpc/client";
import useSession from "@/auth/useSession";
import { cs } from "@/lib";
import {
  BarChart2,
  LinkIcon,
  LogOut,
  LucideIcon,
  Menu,
  Plus,
  QrCode,
  Settings,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

// TODO: Preserve scroll position of multiple pages

type SidebarProps = {
  toggled: boolean;
  setToggled: (v: boolean) => void;
};

type SidebarNavigation = {
  text: string;
  icon: LucideIcon;
  href: string;
};

const sidebarNavigation: SidebarNavigation[] = [
  {
    text: "Create New",
    icon: Plus,
    href: "/dashboard/create-new",
  },
  { text: "Overview", icon: BarChart2, href: "/dashboard/overview" },
  { text: "Links", icon: LinkIcon, href: "/dashboard/links" },
  { text: "QR Codes", icon: QrCode, href: "/dashboard/qr-codes" },
  { text: "Tags", icon: Tag, href: "/dashboard/tags" },
  { text: "Profile", icon: User, href: "/dashboard/profile" },
  { text: "Settings", icon: Settings, href: "/dashboard/settings" },
];

function Sidebar({ toggled, setToggled }: SidebarProps) {
  const pathname = usePathname();
  const { dispatch } = useSession();
  const utils = trpc.useContext();
  const router = useRouter();
  return (
    <aside
      className={cs(
        "absolute top-0 z-20 flex h-full min-w-[240px] -translate-x-full flex-col overflow-hidden bg-primary transition-transform delay-150 max-sm:w-full lg:sticky lg:translate-x-0",
        toggled && "translate-x-0",
      )}
    >
      <div className="flex items-center gap-x-5 bg-primary px-2 py-4 text-2xl font-semibold lg:px-8">
        <button onClick={() => setToggled(false)} className="lg:hidden">
          <Menu />
        </button>
        <Link href={"/dashboard/links"} scroll={false}>
          link.zy
        </Link>
      </div>
      <nav className="flex h-full flex-col overflow-auto px-2">
        {sidebarNavigation.map((nav) => (
          <Link
            href={nav.href}
            key={nav.href}
            className={cs(
              "flex items-center gap-4 whitespace-nowrap p-2 text-secondary hover:bg-secondary-lighter",
              pathname.startsWith(nav.href) && "bg-secondary-lighter",
            )}
            onClick={() => setToggled(false)}
          >
            <nav.icon className="w-4 lg:w-5" />
            <span>{nav.text}</span>
          </Link>
        ))}
        <button
          className={cs(
            "flex items-center gap-4 whitespace-nowrap p-2 text-rose-600 hover:bg-secondary-lighter ",
          )}
          onClick={async () => {
            await utils.auth.signOut.ensureData();
            dispatch({ type: "logout" });
            router.push("/sign-in");
          }}
        >
          <LogOut className="w-4 lg:w-5" />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
