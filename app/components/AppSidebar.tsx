import { BarChart3, Boxes, Package, PackageCheck, TruckIcon } from "lucide-react"

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
} from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"

// Menu items.
const items = [
  {
    title: "Inbound",
    url: "#",
    icon: Package,
  },
  {
    title: "Inventário",
    url: "#",
    icon: Boxes,
  },
  {
    title: "Entrada de Caminhões",
    url: "controle_veiculos",
    icon: TruckIcon,
  },
  {
    title: "Expedição",
    url: "#",
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
          <SidebarHeader>
            <h1 className="text-2xl">ZYX</h1>
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