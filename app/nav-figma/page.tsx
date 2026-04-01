"use client";

import { useState } from "react";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// Design Spec Components - Two Column Layout
// ----------------------------------------------------------------------

// Helper to convert tailwind spacing to px
const getPxValue = (className: string) => {
  const match = className.match(/-(?:(\d+)|\[(\d+)px\])$/);
  if (!match) return null;
  if (match[2]) return `${match[2]}px`;
  const val = parseInt(match[1]);
  if (isNaN(val)) return null;
  return `${val * 4}px`;
};

// Parse all CSS properties
const parseClasses = (className: string) => {
  const classes = className.split(" ");

  const padding = classes.filter((c) => /^p[xytblr]?-/.test(c));
  const margin = classes.filter((c) => /^m[xytblr]?-/.test(c));
  const gap = classes.filter((c) => /^gap-/.test(c));
  const dimensions = classes.filter((c) =>
    /^(w-|h-|max-w|min-h|max-h|flex-1|flex)/.test(c),
  );
  const border = classes.filter((c) => /^border/.test(c));
  const rounded = classes.filter((c) => /^rounded/.test(c));
  const typography = classes.filter((c) =>
    /^(text-|font-|leading-|tracking-)/.test(c),
  );
  const background = classes.filter((c) => /^bg-/.test(c));
  const position = classes.filter((c) =>
    /^(relative|absolute|fixed|sticky|static|top-|right-|bottom-|left-|inset-)/.test(c),
  );
  const layout = classes.filter((c) =>
    /^(overflow-|group|aspect-|object-|cursor-)/.test(c),
  );
  const effects = classes.filter((c) =>
    /^(opacity-|shadow-|transition-|group-hover:|backdrop-)/.test(c),
  );

  return {
    padding,
    margin,
    gap,
    dimensions,
    border,
    rounded,
    typography,
    background,
    position,
    layout,
    effects,
  };
};

const SpecBadge = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full text-[11px] font-bold ml-2 shrink-0">
    {num}
  </span>
);

const SpecDetail = ({
  num,
  className,
  label,
  note,
}: {
  num: number;
  className: string;
  label: string;
  note?: string;
}) => {
  const {
    padding,
    margin,
    gap,
    dimensions,
    border,
    rounded,
    typography,
    background,
    position,
    layout,
    effects,
  } = parseClasses(className);

  return (
    <div className="bg-white border-2 border-indigo-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-indigo-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">
            {num}
          </span>
          {label}
        </span>
        {note && (
          <span className="text-indigo-200 text-[11px] font-normal">{note}</span>
        )}
      </div>

      <div className="p-3 space-y-2.5 text-[11px]">
        {/* Spacing */}
        {(padding.length > 0 || margin.length > 0 || gap.length > 0) && (
          <div className="space-y-1">
            <div className="text-orange-700 font-bold text-[10px] uppercase tracking-wider">
              📐 Spacing
            </div>
            {padding.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {padding.map((c, i) => {
                  const px = getPxValue(c);
                  return (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                    >
                      {c}{" "}
                      {px && <span className="text-orange-600">({px})</span>}
                    </span>
                  );
                })}
              </div>
            )}
            {margin.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {margin.map((c, i) => {
                  const px = getPxValue(c);
                  return (
                    <span
                      key={i}
                      className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                    >
                      {c} {px && <span className="text-red-600">({px})</span>}
                    </span>
                  );
                })}
              </div>
            )}
            {gap.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {gap.map((c, i) => {
                  const px = getPxValue(c);
                  return (
                    <span
                      key={i}
                      className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                    >
                      {c}{" "}
                      {px && <span className="text-yellow-600">({px})</span>}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Dimensions */}
        {dimensions.length > 0 && (
          <div className="space-y-1">
            <div className="text-blue-700 font-bold text-[10px] uppercase tracking-wider">
              📏 Size
            </div>
            <div className="bg-blue-50 text-blue-900 px-2 py-1 rounded font-mono text-[10px]">
              {dimensions.join(" ")}
            </div>
          </div>
        )}

        {/* Visual Styles */}
        {(border.length > 0 || rounded.length > 0 || background.length > 0) && (
          <div className="space-y-1">
            <div className="text-purple-700 font-bold text-[10px] uppercase tracking-wider">
              🎨 Style
            </div>
            <div className="bg-purple-50 text-purple-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed">
              {[...border, ...rounded, ...background].join(" ")}
            </div>
          </div>
        )}

        {/* Typography */}
        {typography.length > 0 && (
          <div className="space-y-1">
            <div className="text-green-700 font-bold text-[10px] uppercase tracking-wider">
              ✍️ Text
            </div>
            <div className="bg-green-50 text-green-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed break-all">
              {typography.join(" ")}
            </div>
          </div>
        )}

        {/* Position */}
        {position.length > 0 && (
          <div className="space-y-1">
            <div className="text-indigo-700 font-bold text-[10px] uppercase tracking-wider">
              📍 Position
            </div>
            <div className="bg-indigo-50 text-indigo-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed">
              {position.join(" ")}
            </div>
          </div>
        )}

        {/* Layout */}
        {layout.length > 0 && (
          <div className="space-y-1">
            <div className="text-teal-700 font-bold text-[10px] uppercase tracking-wider">
              🎯 Layout
            </div>
            <div className="bg-teal-50 text-teal-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed">
              {layout.join(" ")}
            </div>
          </div>
        )}

        {/* Effects */}
        {effects.length > 0 && (
          <div className="space-y-1">
            <div className="text-pink-700 font-bold text-[10px] uppercase tracking-wider">
              ✨ Effects
            </div>
            <div className="bg-pink-50 text-pink-900 px-2 py-1 rounded font-mono text-[10px] leading-relaxed break-all">
              {effects.join(" ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function NavigationPageFigma() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Mock user data
  const mockUser = {
    name: "김철수",
    email: "chulsoo.kim@ajou.ac.kr",
    userType: "학생",
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 border-b-4 border-indigo-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">
          🎨 Design Spec: Navigation Bar (로그인 상태)
        </h2>
        <div className="flex gap-6 text-sm mt-2 text-indigo-50">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-100 border border-orange-600"></span>{" "}
            Padding
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-100 border border-red-600"></span>{" "}
            Margin
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-100 border border-yellow-600"></span>{" "}
            Gap
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-100 border border-blue-600"></span>{" "}
            Size
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex max-w-[1800px] mx-auto">
        {/* Left: UI Preview */}
        <div className="flex-1 p-8 bg-gray-50 min-h-[800px]">
          
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 border-b border-gray-200 pb-2">
              <h3 className="font-bold text-lg text-gray-800">Navigation Bar & Dropdown Menu</h3>
            </div>
          
            {/* Header Simulation */}
            <div className="relative border border-dashed border-gray-300 bg-gray-100/50 min-h-[500px] rounded-lg overflow-hidden">
              <header className="sticky top-0 z-50 border-b border-[#e5e5ec] bg-white/95 backdrop-blur-[6px] backdrop-filter h-[80px]">
                <div className="mx-auto max-w-[1440px]">
                  <div className="flex h-[80px] items-center justify-between py-5 px-4 md:px-8">
                    {/* Logo Section */}
                    <div className="flex items-center gap-[6px]">
                      <div className="relative h-8 w-8 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400">
                        Logo
                      </div>
                      <span className="font-semibold text-2xl text-[#111] tracking-[-0.6px] leading-[1.33]">
                        AIM AJOU
                      </span>
                      <SpecBadge num={0} />
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex items-center gap-12">
                      <div className="flex items-center">
                        <span className="flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] border-b-2 border-[#0056b3]">
                          포트폴리오
                        </span>
                        <SpecBadge num={1} />
                      </div>
                      
                      <div className="flex items-center">
                        <span className="flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] border-b-2 border-transparent hover:border-[#0056b3]/50">
                          소개
                        </span>
                        <SpecBadge num={2} />
                      </div>

                      <div className="flex items-center">
                        <span className="flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] border-b-2 border-transparent hover:border-[#0056b3]/50">
                          공지사항
                        </span>
                      </div>
                      <SpecBadge num={3} />
                    </nav>

                    {/* Auth Buttons / User Menu */}
                    <div className="flex items-center gap-4">
                      {/* Admin Mode Toggle */}
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] text-[#666]">
                          {isAdminMode ? "관리 모드" : "일반 모드"}
                        </span>
                        <button
                          onClick={() => setIsAdminMode(!isAdminMode)}
                          className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors ${
                            isAdminMode ? "bg-[#004a9c]" : "bg-[#e5e5ec]"
                          }`}
                        >
                          <span
                            className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform ${
                              isAdminMode ? "translate-x-[23px]" : "translate-x-[3px]"
                            }`}
                          />
                        </button>
                        <SpecBadge num={4} />
                      </div>

                      <div className="flex items-center gap-3 relative">
                        {/* User Icon Button */}
                        <div className="flex items-center">
                          <button className="flex items-center justify-center h-[40px] w-[40px] text-[#004a9c] hover:opacity-70 transition-opacity">
                            <User size={24} />
                          </button>
                          <SpecBadge num={5} />
                        </div>

                        {/* Logout Icon Button */}
                        <div className="flex items-center">
                          <button className="flex items-center justify-center h-[40px] w-[40px] text-[#004a9c] hover:opacity-70 transition-opacity">
                            <LogOut size={24} />
                          </button>
                          <SpecBadge num={6} />
                        </div>
                        <SpecBadge num={7} />

                        {/* Static Profile Dropdown to show specs */}
                        <div className="absolute top-[50px] right-0 w-[280px] bg-white border border-[#e5e5ec] rounded-lg shadow-lg z-50">
                          <SpecBadge num={8} />
                          <div className="p-4">
                            <div className="mb-3 pb-3 border-b border-[#e5e5ec]">
                              <SpecBadge num={9} />
                              <div className="flex items-center mb-1">
                                <h3 className="text-[16px] font-semibold text-[#111]">
                                  {mockUser.name}
                                </h3>
                                <SpecBadge num={10} />
                              </div>
                              <div className="flex items-center mb-2">
                                <p className="text-[14px] text-[#666]">
                                  {mockUser.email}
                                </p>
                                <SpecBadge num={11} />
                              </div>
                              <div className="flex items-center">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#004a9c]/10 text-[#004a9c] text-[12px] font-medium">
                                  {mockUser.userType}
                                </div>
                                <SpecBadge num={12} />
                              </div>
                            </div>

                            {/* Menu Links */}
                            <div className="space-y-1">
                              {isAdminMode && (
                                <div className="flex items-center">
                                  <span className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors w-full cursor-pointer">
                                    관리자 대시보드
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <span className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors w-full cursor-pointer">
                                  내 프로필
                                </span>
                                <SpecBadge num={13} />
                              </div>
                              <div className="flex items-center">
                                <span className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors w-full cursor-pointer">
                                  내 포트폴리오
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors w-full cursor-pointer">
                                  계정 설정
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
            </div>
            
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="w-[450px] p-8 bg-indigo-50 border-l-4 border-indigo-500">
          <h3 className="text-indigo-900 font-bold text-lg mb-6 bg-indigo-50 py-2">
            📋 컴포넌트 스펙
          </h3>

          <SpecDetail
            num={0}
            className="flex items-center gap-[6px]"
            label="Logo Container"
            note="로고 이미지 및 타이포그래피 영역"
          />
          <SpecDetail
            num={1}
            className="flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] border-b-2 border-[#0056b3]"
            label="Nav Item (Active)"
            note="현재 활성화된 페이지 메뉴"
          />
          <SpecDetail
            num={2}
            className="flex items-center justify-center py-[10px] text-[16px] leading-[1.5] tracking-[-0.4px] text-[#1a1a1a] border-b-2 border-transparent hover:border-[#0056b3]/50"
            label="Nav Item (Default)"
            note="비활성화된 페이지 메뉴 (Hover 효과 포함)"
          />
          <SpecDetail
            num={3}
            className="flex items-center gap-12"
            label="Nav Menu Container"
            note="GNB 메뉴들을 감싸는 컨테이너"
          />
          <SpecDetail
            num={4}
            className="flex items-center gap-3"
            label="Admin Mode Toggle Wrapper"
            note="관리자 모드 토글 스위치 및 라벨 컨테이너"
          />
          <SpecDetail
            num={5}
            className="flex items-center justify-center h-[40px] w-[40px] text-[#004a9c] hover:opacity-70 transition-opacity"
            label="User Profile Button"
            note="프로필 드롭다운 토글 아이콘 버튼"
          />
          <SpecDetail
            num={6}
            className="flex items-center justify-center h-[40px] w-[40px] text-[#004a9c] hover:opacity-70 transition-opacity"
            label="Logout Button"
            note="로그아웃 아이콘 버튼"
          />
          <SpecDetail
            num={7}
            className="flex items-center gap-3 relative"
            label="Auth Icons Container"
            note="아이콘 버튼들을 감싸는 컨테이너"
          />
          <SpecDetail
            num={8}
            className="absolute top-[50px] right-0 w-[280px] bg-white border border-[#e5e5ec] rounded-lg shadow-lg z-50"
            label="Profile Dropdown Box"
            note="프로필 메뉴 드롭다운 영역"
          />
          <SpecDetail
            num={9}
            className="mb-3 pb-3 border-b border-[#e5e5ec]"
            label="Dropdown User Info Wrapper"
            note="유저 정보(이름, 이메일, 뱃지)를 감싸는 영역"
          />
          <SpecDetail
            num={10}
            className="text-[16px] font-semibold text-[#111] mb-1"
            label="User Name Text"
            note="유저 이름 텍스트"
          />
          <SpecDetail
            num={11}
            className="text-[14px] text-[#666] mb-2"
            label="User Email Text"
            note="유저 이메일 텍스트"
          />
          <SpecDetail
            num={12}
            className="inline-flex items-center px-3 py-1 rounded-full bg-[#004a9c]/10 text-[#004a9c] text-[12px] font-medium"
            label="User Type Badge"
            note="학생/기업/교수 등 권한 뱃지"
          />
          <SpecDetail
            num={13}
            className="block px-3 py-2 text-[14px] text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-md transition-colors"
            label="Dropdown Link Item"
            note="드롭다운 메뉴 링크 아이템"
          />
        </div>
      </div>
    </div>
  );
}
