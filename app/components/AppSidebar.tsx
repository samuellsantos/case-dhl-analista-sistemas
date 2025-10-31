import { BarChart3, Boxes, Menu, Package, PackageCheck, TruckIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Menu items.
const items = [
  {
    title: "Inbound",
    url: "http://localhost:3000/inbound",
    icon: Package,
  },
  {
    title: "Inventário",
    url: "http://localhost:3000/inventario",
    icon: Boxes,
  },
  {
    title: "Entrada de Caminhões",
    url: "http://localhost:3000/controle_veiculos",
    icon: TruckIcon,
  },
  {
    title: "Expedição",
    url: "http://localhost:3000/expedicao",
    icon: PackageCheck,
  },
  {
    title: "Relatórios",
    url: "#",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  return (
    <div className="w-24">
      <Sidebar className="fixed w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl">ZYX</h1>
              <SidebarTrigger size={"lg"}/>
            </div>
          </SidebarHeader>
          <SidebarGroupLabel>Sistema Logístico</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </div>
  )
}