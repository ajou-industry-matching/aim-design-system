"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Users, Building2, Flag, Settings, BarChart3 } from "lucide-react"

const navItems = [
  {
    title: "대시보드",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "포트폴리오 관리",
    href: "/admin/portfolios",
    icon: FileText,
  },
  {
    title: "사용자 관리",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "조직 관리",
    href: "/admin/organizations",
    icon: Building2,
  },
  {
    title: "신고 관리",
    href: "/admin/reports",
    icon: Flag,
  },
  {
    title: "통계",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "설정",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-muted/40 p-6">
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
