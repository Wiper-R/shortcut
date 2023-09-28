import AuthValidator from "@/components/AuthValidator";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthValidator redirectNotAuthenticated="/login">
    <div className="flex h-full flex-col overflow-y-hidden.">
      <Navbar />
      <div className={`flex h-full overflow-hidden`}>
        <Sidebar />
        <div className="overflow-y-auto h-full w-full no-scrollbar">
          {children}
        </div>
      </div>
    </div>
    </AuthValidator>
  );
}
