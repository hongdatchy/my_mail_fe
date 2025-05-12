"use client"

import { Home, ChevronDown, User, Bell, Settings, LayoutGrid, Users, FileText } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Quản lý chung",
    url: "#",
    icon: Home,
  },
  {
    title: "Luồng Email",
    url: "/home/flow-email",
    icon: FileText,
  },
  {
    title: "Email tổ chức",
    url: "/home/org-email",
    icon: LayoutGrid,
  },
  {
    title: "Email công dân",
    url: "#",
    icon: User,
    item: [
      {
        title: "Địa chỉ email",
        url: "/home/user-email",
      },
      {
        title: "Nhóm email",
        url: "/home/distribution-list",
      }
    ]
  },
  {
    title: "Quản lý tài khoản",
    url: "/home/manage-account",
    icon: Users,
  },
]

const items2 = [
  {
    title: "Thông báo",
    url: "#",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup style={{ top: 50 }}>
          <SidebarGroupLabel>Chính</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                item.item ? (
                  <Collapsible className="group/collapsible group" defaultOpen={false} key={item.title}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={item.url} className="flex w-full items-center">
                            <item.icon />
                            <span className="flex-1">{item.title}</span>
                            <ChevronDown
                              className="h-4 w-4 ml-2 transition-transform group-data-[state=open]:rotate-180"
                            />
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {
                            item.item.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={subItem.url} className={`flex w-full items-center ${pathname === subItem.url ? "font-semibold bg-muted text-primary" : ""}`}>
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))
                          }
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className={`flex w-full items-center ${pathname.includes(item.url) ? "font-semibold bg-muted text-primary" : ""}`}>
                        <item.icon />
                        <span className="flex-1">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>Cài đặt</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
