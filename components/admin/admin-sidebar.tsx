"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Users, Megaphone, Database } from "lucide-react"

const navItems = [
  {
    title: "대시보드",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "공지사항 관리",
    href: "/admin/notices",
    icon: Megaphone,
  },
  {
    title: "사용자 관리",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "포트폴리오 관리",
    href: "/admin/portfolios",
    icon: FileText,
  },
  {
    title: "크롤링 데이터 관리",
    href: "/admin/crawled-projects",
    icon: Database,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-neutral-200 bg-neutral-50 p-6 min-h-screen">
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">관리자 콘솔</h2>
          <p className="text-sm text-muted-foreground">플랫폼 관리</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-800 text-white shadow-md shadow-primary-800/20"
                    : "text-neutral-600 hover:bg-primary-50 hover:text-primary-800",
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-neutral-500")} />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
