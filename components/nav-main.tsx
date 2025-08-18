"use client"

import type { LucideIcon } from "lucide-react"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

type NavItemIcon = LucideIcon | string

interface NavChildItem {
  title: string
  url: string
  icon?: NavItemIcon
}

interface NavItem {
  title: string
  url: string
  icon?: NavItemIcon
  isActive?: boolean
  children?: NavChildItem[]
}

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="bg-[#FAF9FB]">
      <SidebarGroupLabel className="text-green-700 text-base mb-2 font-semibold">Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))
          const hasChildren = item.children && item.children.length > 0
          const isChildActive = hasChildren && item.children?.some(child => pathname === child.url)
          
          return (
            <Collapsible key={item.title} asChild defaultOpen={isActive || isChildActive} className="group/collapsible">
              <SidebarMenuItem>
                {hasChildren ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`hover:bg-green-200 h-10 ${isActive || isChildActive ? "bg-[#29AD82] text-white" : ""}`}
                      >
                        {typeof item.icon === 'string' ? (
                          <span className={`${isActive || isChildActive ? "text-white" : "text-black"}`}>{item.icon}</span>
                        ) : item.icon && (
                          <item.icon className={`${isActive || isChildActive ? "text-white" : "text-black"}`} />
                        )}
                        <span className="text-[15px] font-medium">{item.title}</span>
                        <ChevronDown className={`ml-auto h-4 w-4 ${isActive || isChildActive ? "text-white" : "text-black"}`} />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-6 pt-2 space-y-1">
                        {item.children?.map((child) => {
                          const isChildItemActive = pathname === child.url
                          
                          return (
                            <SidebarMenuButton
                              key={child.title}
                              tooltip={child.title}
                              className={`hover:bg-green-200 h-10 ${isChildItemActive ? "bg-[#29AD82] text-white" : ""}`}
                              asChild
                            >
                              <Link href={child.url}>
                                {typeof child.icon === 'string' ? (
                                  <span className={`${isChildItemActive ? "text-white" : "text-black"}`}>{child.icon}</span>
                                ) : child.icon && (
                                  <child.icon className={`${isChildItemActive ? "text-white" : "text-black"}`} />
                                )}
                                <span className="text-[15px] font-medium">{child.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`hover:bg-green-200 h-10 ${isActive ? "bg-[#29AD82] text-white" : ""}`}
                    asChild
                  >
                    <Link href={item.url}>
                      {typeof item.icon === 'string' ? (
                        <span className={`${isActive ? "text-white" : "text-black"}`}>{item.icon}</span>
                      ) : item.icon && (
                        <item.icon className={`${isActive ? "text-white" : "text-black"}`} />
                      )}
                      <span className="text-[15px] font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
