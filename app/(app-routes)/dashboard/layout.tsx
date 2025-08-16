import type React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarInset>
        <Navbar />
       <div className="p-6 h-full bg-[#f6f2f9]">
         {children}
       </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
