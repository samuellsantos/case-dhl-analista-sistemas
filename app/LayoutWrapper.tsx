'use client'

import { usePathname } from "next/navigation";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const [isOpen, setIsOpen] = useState(false);

  if (isLoginPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1 p-6">
            <div>
               <SidebarTrigger/> Menu
            </div>
            {children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
