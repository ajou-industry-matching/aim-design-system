"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AppHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/portfolio") {
      return pathname.startsWith("/portfolio");
    }
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e5ec] bg-white/95 backdrop-blur-[6px] backdrop-filter h-[80px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex h-[80px] items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[6px]">
            <div className="relative h-8 w-8">
              <Image
                src="/assets/logo.svg"
                alt="AIM AJOU Logo"
                width={32}
                height={32}
                className="h-full w-full"
              />
            </div>
            <span className="font-semibold text-2xl text-[#111] tracking-[-0.6px] leading-[1.33]">
              AIM AJOU
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-12">
            <Link
              href="/portfolio"
              className={`flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] ${
                isActive("/portfolio")
                  ? "border-b-2 border-[#0056b3]"
                  : "border-b-2 border-transparent hover:border-[#0056b3]/50"
              }`}
            >
              포트폴리오
            </Link>
            <Link
              href="/about"
              className={`flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] ${
                isActive("/about")
                  ? "border-b-2 border-[#0056b3]"
                  : "border-b-2 border-transparent hover:border-[#0056b3]/50"
              }`}
            >
              소개
            </Link>
            <Link
              href="/notice"
              className={`flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] ${
                isActive("/notice")
                  ? "border-b-2 border-[#0056b3]"
                  : "border-b-2 border-transparent hover:border-[#0056b3]/50"
              }`}
            >
              공지사항
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
            >
              <Link href="/signup">회원가입</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
            >
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
