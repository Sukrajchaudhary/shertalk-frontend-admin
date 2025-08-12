"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="hover:bg-green-200">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-600 text-sidebar-primary-foreground">
            <activeTeam.logo className="size-4 text-white" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-green-800">
              {activeTeam.name}
            </span>
            <span className="truncate text-xs text-green-600">
              {activeTeam.plan}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto text-green-600" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
