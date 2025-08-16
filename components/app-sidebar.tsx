"use client";

import type * as React from "react";
import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Users,
  BarChart3,
  FileText,
  LayoutDashboard,
  Mail,
  ChartCandlestick,
  Video,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: " Wellcome to Shertalks",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },

  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    // {
    //   title: "Analytics",
    //   url: "/dashboard/analytics",
    //   icon: BarChart3,
    // },
    {
      title: "Portflio",
      url: "/dashboard/portflio",
      icon:ChartCandlestick
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
    // {
    //   title: "Reports",
    //   url: "/dashboard/reports",
    //   icon: FileText,
    // },
    {
      title: "Blogs",
      url: "/dashboard/blog",
      icon: FileText,
    },
    {
      title: "Video",
      url: "/dashboard/calendar",
      icon:Video
    },
    // {
    //   title: "Messages",
    //   url: "/dashboard/messages",
    //   icon: Mail,
    // },
  ],
  
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-[#FAF9FB]"
      {...props}
    >
      <SidebarHeader className="bg-[#FAF9FB] border-b">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-[#FAF9FB]">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
