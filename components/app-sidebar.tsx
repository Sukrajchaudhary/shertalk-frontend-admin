"use client";

import type * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Users,
  Home,
  BarChart3,
  FileText,
  Calendar,
  Mail,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
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
      name: "Admin Dashboard",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Analytics Corp",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Data Inc.",
      logo: Command,
      plan: "Free",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Portflio",
      url: "/dashboard/portflio",
      icon: BarChart3,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: FileText,
    },
    {
      title: "Video",
      url: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: Mail,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
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
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
