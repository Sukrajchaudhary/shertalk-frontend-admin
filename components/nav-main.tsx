"use client"

import type { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { Collapsible } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="bg-[#FAF9FB]">
      <SidebarGroupLabel className="text-green-700 text-base mb-2  font-semibold">Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))

          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive} className="group/collapsible ">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`hover:bg-green-200 h-10 ${isActive ? "bg-[#29AD82] text-white" : ""}`}
                  asChild
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className={`${isActive?"text-white":"text-black"}`}/>}
                    <span className=" text-[15px] font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
