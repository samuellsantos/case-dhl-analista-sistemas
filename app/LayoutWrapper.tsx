'use client'

import { usePathname } from "next/navigation";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex w-full">
      {!isLoginPage && (
        <SidebarProvider className="w-72">
          <AppSidebar />
        </SidebarProvider>
      )}
      <main className="flex-1">{children}</main>
    </div>
  );
}
