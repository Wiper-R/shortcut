import Navbar from "@/components/Client/Dashboard/Navbar";
import Sidebar from "@/components/Client/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-hidden.">
      <Navbar />
      <div className={`flex h-full overflow-hidden`}>
        <Sidebar />
        <div className="overflow-y-auto h-full w-full no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
