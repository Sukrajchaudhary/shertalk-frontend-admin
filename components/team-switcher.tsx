"use client";
import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function TeamSwitcher({}: {
  teams?: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Link href="/dashboard">
            <div className="w-[150px] h-12 cursor-pointer">
              <Image
                style={{
                  mixBlendMode: "multiply",
                }}
                src="/images/shertalklogo.jpg"
                className="h-full w-full "
                alt="logo"
                height={500}
                width={500}
                unoptimized
                priority
              />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
