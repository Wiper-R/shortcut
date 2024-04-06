import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useAppState } from "@/contexts/app-state-provider";

export function SidebarToggle() {
  const { setSidebarToggle } = useAppState();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setSidebarToggle(p => !p)}
      className="md:hidden"
    >
      <MenuIcon className="w-5" />
    </Button>
  );
}
