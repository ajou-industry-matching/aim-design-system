import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 w-full">{children}</main>
    </div>
  )
}
