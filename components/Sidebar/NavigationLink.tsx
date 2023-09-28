import { usePathname } from "next/navigation";
import Link from "next/link";

type NavigationLinkProps = {
  icon: React.ReactNode;
  text: string;
  disabled?: boolean;
  href: string;
}


const NavigationLink = (props: NavigationLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={props.href}
      className={`relative flex px-4 py-1 justify-start items-center gap-3 text-lg rounded-sm hover:bg-sky-100 ${
        pathname.includes(props.href.toString()) ? "bg-sky-100" : "bg-white"
      }`}
    >
      {props.icon}
      <span>{props.text}</span>
    </Link>
  );
};

export default NavigationLink;
