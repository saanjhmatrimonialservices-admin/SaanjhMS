import Topbar from "@/app/components/dashboard/layout/top-bar";
import Navbar from "@/app/components/dashboard/layout/navbar";
import { ReactNode } from "react";
import AutoLogin from "@/app/components/auth/auto-login";

interface ParamsData {
  role: string;
  userId: string;
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<ParamsData>;
}): Promise<React.ReactElement> {
  const { role, userId } = await params;
  return (
    <div className="bg-gray-50 w-screen h-screen flex">
      <AutoLogin />
      <div className="h-full w-[15%]" id="nav-bar">
        <Navbar userId={userId} role={role} />
      </div>
      <div className="min-h-screen w-[85%] flex flex-col">
        <div id="top-bar" className="w-full h-20">
          <Topbar />
        </div>
        <div id="main-space " className="w-full h-full overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
