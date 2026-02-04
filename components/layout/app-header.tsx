"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function AppHeader() {
  const pathname = usePathname();

  // Mock login state - set to true to test logged-in UI
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock user data
  const mockUser = {
    name: "김철수",
    email: "chulsoo.kim@ajou.ac.kr",
    userType: "학생" as "기업" | "학생" | "교수",
  };

  const isActive = (path: string) => {
    if (path === "/portfolio") {
      return pathname.startsWith("/portfolio");
    }
    return pathname === path;
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfile(false);
  };

  // Sync admin mode with localStorage
  const handleAdminModeToggle = () => {
    const newMode = !isAdminMode;
    setIsAdminMode(newMode);
    localStorage.setItem("isAdminMode", String(newMode));
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

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-4">
            {/* Admin Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[#666]">
                {isAdminMode ? "관리 모드" : "일반 모드"}
              </span>
              <button
                onClick={handleAdminModeToggle}
                className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors ${
                  isAdminMode ? "bg-[#004a9c]" : "bg-[#e5e5ec]"
                }`}
                aria-label="관리자 모드 토글"
              >
                <span
                  className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform ${
                    isAdminMode ? "translate-x-[23px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </div>

            {isLoggedIn ? (
              <div
                className="flex items-center gap-3 relative"
                ref={profileRef}
              >
                {/* User Icon Button */}
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center justify-center h-[40px] w-[40px] text-[#004a9c] hover:opacity-70 transition-opacity"
                  aria-label="사용자 프로필"
                >
                  <User size={24} />
                </button>

                {/* Logout Icon Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center h-[40px] w-[40px] text-[#004a9c] hover:opacity-70 transition-opacity"
                  aria-label="로그아웃"
                >
                  <LogOut size={24} />
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute top-[50px] right-0 w-[280px] bg-white border border-[#e5e5ec] rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <div className="mb-3 pb-3 border-b border-[#e5e5ec]">
                        <h3 className="text-[16px] font-semibold text-[#111] mb-1">
                          {mockUser.name}
                        </h3>
                        <p className="text-[14px] text-[#666] mb-2">
                          {mockUser.email}
                        </p>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#004a9c]/10 text-[#004a9c] text-[12px] font-medium">
                          {mockUser.userType}
                        </div>
                      </div>

                      {/* Menu Links */}
                      <div className="space-y-1">
                        {isAdminMode && (
                          <Link
                            href="/admin"
                            className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors"
                            onClick={() => setShowProfile(false)}
                          >
                            관리자 대시보드
                          </Link>
                        )}
                        <Link
                          href="/profile"
                          className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors"
                          onClick={() => setShowProfile(false)}
                        >
                          내 프로필
                        </Link>
                        <Link
                          href="/my-portfolio"
                          className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors"
                          onClick={() => setShowProfile(false)}
                        >
                          내 포트폴리오
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors"
                          onClick={() => setShowProfile(false)}
                        >
                          계정 설정
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
