"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, PlusCircle, Briefcase, User } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  {
    name: "홈",
    href: "/explore",
    icon: Home,
  },
  {
    name: "검색",
    href: "/search",
    icon: Search,
  },
  {
    name: "만들기",
    href: "/create",
    icon: PlusCircle,
  },
  {
    name: "내 작업물",
    href: "/my-work",
    icon: Briefcase,
  },
  {
    name: "프로필",
    href: "/profile",
    icon: User,
  },
]

export function BottomTabs() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
