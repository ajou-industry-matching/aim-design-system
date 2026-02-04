"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Megaphone, ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// Design Spec Components - Two Column Layout
// ----------------------------------------------------------------------

const getPxValue = (className: string) => {
  const match = className.match(/-(?:(\d+)|\[(\d+)px\])$/);
  if (!match) return null;
  if (match[2]) return `${match[2]}px`;
  const val = parseInt(match[1]);
  if (isNaN(val)) return null;
  return `${val * 4}px`;
};

const parseClasses = (className: string) => {
  const classes = className.split(" ");
  return {
    padding: classes.filter((c) => /^p[xytblr]?-/.test(c)),
    margin: classes.filter((c) => /^m[xytblr]?-/.test(c)),
    gap: classes.filter((c) => /^gap-/.test(c)),
    dimensions: classes.filter((c) => /^(w-|h-|max-w|min-h|max-h|flex-1|flex)/.test(c)),
    border: classes.filter((c) => /^border/.test(c)),
    rounded: classes.filter((c) => /^rounded/.test(c)),
    typography: classes.filter((c) => /^(text-|font-|leading-|tracking-)/.test(c)),
    background: classes.filter((c) => /^bg-/.test(c)),
    position: classes.filter((c) => /^(relative|absolute|fixed|sticky|static|top-|right-|bottom-|left-|inset-)/.test(c)),
    layout: classes.filter((c) => /^(overflow-|group|aspect-|object-|cursor-)/.test(c)),
    effects: classes.filter((c) => /^(opacity-|shadow-|transition-|group-hover:)/.test(c)),
  };
};

const SpecBadge = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-600 text-white rounded-full text-[11px] font-bold ml-2 z-50 relative">
    {num}
  </span>
);

const SpecDetail = ({ num, className, label, note }: { num: number; className: string; label: string; note?: string }) => {
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
    <div className="bg-white border-2 border-teal-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-teal-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-teal-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">{num}</span>
          {label}
        </span>
        {note && <span className="text-teal-200 text-[11px] font-normal">{note}</span>}
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

export default function AdminDashboardPageFigma() {
  const stats = [
    { title: "총 사용자", value: "2,847", icon: Users, color: "bg-[#004a9c]/10 text-[#004a9c]" },
    { title: "총 공지사항", value: "156", icon: Megaphone, color: "bg-purple-500/10 text-purple-500" },
    { title: "총 포트폴리오", value: "1,234", icon: FileText, color: "bg-green-500/10 text-green-500" },
  ];

  const recentUsers = [
    { id: "1", name: "김철수", email: "user1@ajou.ac.kr", role: "학생", date: "2025.01.20" },
    { id: "2", name: "이영희", email: "user2@ajou.ac.kr", role: "교수", date: "2025.01.19" },
    { id: "3", name: "박민수", email: "user3@ajou.ac.kr", role: "학생", date: "2025.01.19" },
    { id: "4", name: "최지원", email: "user4@ajou.ac.kr", role: "기업", date: "2025.01.18" },
    { id: "5", name: "정서연", email: "user5@ajou.ac.kr", role: "학생", date: "2025.01.18" },
  ];

  const recentNotices = [
    { id: "1", title: "2025학년도 1학기 포트폴리오 공모전 안내", date: "2025.01.20" },
    { id: "2", title: "시스템 정기 점검 안내", date: "2025.01.19" },
    { id: "3", title: "신규 기능 업데이트 안내", date: "2025.01.18" },
    { id: "4", title: "개인정보 처리방침 개정 안내", date: "2025.01.17" },
    { id: "5", title: "겨울방학 운영시간 안내", date: "2025.01.16" },
  ];

  // Mock Nav Items for Preview
  const navItems = [
    { title: "대시보드", icon: LayoutDashboard, active: true },
    { title: "공지사항 관리", icon: Megaphone, active: false },
    { title: "사용자 관리", icon: Users, active: false },
    { title: "소프콘 관리", icon: FileText, active: false },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 관리자 대시보드</h2>
        <div className="flex gap-6 text-sm mt-2 text-teal-50">
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-orange-100 border border-orange-600"></span> Spacing</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-100 border border-blue-600"></span> Size</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-100 border border-purple-600"></span> Style</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-100 border border-green-600"></span> Text</span>
        </div>
      </div>

      <div className="flex max-w-[1800px] mx-auto">
        {/* Left: UI Preview */}
        <div className="flex-1 p-8 bg-gray-50">
          {/* Main Layout Preview */}
          <div className="flex min-h-screen bg-neutral-50 border rounded-xl overflow-hidden shadow-sm relative">
            <SpecBadge num={0} />
            
            {/* Sidebar Preview */}
            <aside className="w-64 border-r border-neutral-200 bg-neutral-50 p-6">
              <SpecBadge num={1} />
              <div className="space-y-4">
                <div className="space-y-1 mb-6">
                  <h2 className="text-lg font-semibold">관리자 콘솔 <SpecBadge num={2} /></h2>
                  <p className="text-sm text-muted-foreground">플랫폼 관리</p>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item, i) => {
                    const Icon = item.icon;
                    // Force hover state on 2nd item for spec
                    const isHovered = i === 1;
                    return (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 relative",
                          item.active
                            ? "bg-[#004a9c] text-white shadow-md shadow-[#004a9c]/20"
                            : isHovered 
                              ? "bg-primary-50 text-[#004a9c]" 
                              : "text-neutral-600 hover:bg-primary-50 hover:text-[#004a9c]",
                        )}
                      >
                         <Icon className={cn("h-4 w-4", item.active ? "text-white" : isHovered ? "text-[#004a9c]" : "text-neutral-500")} />
                         {item.title}
                         {item.active && <SpecBadge num={3} />}
                         {isHovered && <SpecBadge num={19} />}
                         {!item.active && !isHovered && i === 2 && <SpecBadge num={4} />}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 p-8 overflow-y-auto bg-white">
              <SpecBadge num={5} />
              
              <div className="space-y-8">
                 {/* Header */}
                <div>
                  <h1 className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#1a1a1a] mb-2 flex items-center">
                    대시보드 <SpecBadge num={6} />
                  </h1>
                  <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] flex items-center">
                    플랫폼 전체 현황을 확인하세요 <SpecBadge num={7} />
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3 relative">
                  <SpecBadge num={8} />
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <Card key={stat.title} className="border border-[#e5e5e5] rounded-lg p-6 bg-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[14px] leading-[1.43] tracking-[-0.35px] text-[#666] mb-2">
                              {stat.title} {i === 0 && <SpecBadge num={9} />}
                            </p>
                            <p className="text-[32px] font-bold leading-[1.25] tracking-[-0.8px] text-[#1a1a1a]">
                              {stat.value} {i === 0 && <SpecBadge num={10} />}
                            </p>
                          </div>
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.color}`}>
                            <Icon size={28} />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Recent Users */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                        최근 가입한 사용자 <SpecBadge num={11} />
                      </h2>
                      <Button variant="ghost" className="text-[14px] text-[#004a9c] bg-[#004a9c]/5">
                        전체보기
                        <ArrowRight size={16} className="ml-1" />
                        <SpecBadge num={20} />
                      </Button>
                    </div>
                    <Card className="border border-[#e5e5e5] rounded-lg p-6 relative bg-white">
                      <SpecBadge num={13} />
                      <div className="space-y-4">
                        {recentUsers.map((user, i) => (
                          <div key={user.id} className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] last:border-0 last:pb-0">
                            <div className="flex-1">
                              <p className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px] text-[#1a1a1a]">
                                {user.name} {i === 0 && <SpecBadge num={14} />}
                              </p>
                              <p className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#666]">
                                {user.email} {i === 0 && <SpecBadge num={15} />}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${
                                user.role === "교수" ? "bg-[#004a9c]/10 text-[#004a9c]" : 
                                user.role === "학생" ? "bg-green-500/10 text-green-500" : 
                                "bg-purple-500/10 text-purple-500"
                              }`}>
                                {user.role}
                                {i === 0 && <SpecBadge num={16} />}
                              </span>
                              <span className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999]">
                                {user.date}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Recent Notices */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                        최근 공지사항
                      </h2>
                      <Button variant="ghost" className="text-[14px] text-[#004a9c] hover:bg-[#004a9c]/5">
                        전체보기
                        <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </div>
                    <Card className="border border-[#e5e5e5] rounded-lg p-6 bg-white">
                      <div className="space-y-4">
                        {recentNotices.map((notice, i) => (
                          <div key={notice.id} className={cn(
                            "flex items-center justify-between pb-4 border-b border-[#e5e5e5] last:border-0 last:pb-0 -mx-2 px-2 rounded transition-colors",
                            i === 0 ? "bg-[#f9f9f9]" : "hover:bg-[#f9f9f9]"
                          )}>
                            <p className="text-[14px] leading-[1.43] tracking-[-0.35px] text-[#1a1a1a] flex-1">
                              {notice.title} {i === 0 && <SpecBadge num={17} />}
                              {i === 0 && <SpecBadge num={21} />}
                            </p>
                            <span className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999] ml-4">
                              {notice.date} {i === 0 && <SpecBadge num={18} />}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="w-[450px] p-8 bg-teal-50 border-l-4 border-teal-500">
          <h3 className="text-teal-900 font-bold text-lg mb-6">📋 컴포넌트 스펙</h3>
          
          <SpecDetail num={0} className="flex min-h-screen bg-neutral-50 border rounded-xl" label="Main Layout Container" />
          <SpecDetail num={1} className="w-64 border-r border-neutral-200 bg-neutral-50 p-6" label="Sidebar Container" />
          
          <SpecDetail 
            num={2} 
            className="text-lg font-semibold leading-tight tracking-normal text-[#111]" 
            label="Sidebar Title" 
            note="Size: 18px, Weight: 600"
          />
          
          <SpecDetail 
            num={3} 
            className="bg-[#004a9c] text-white rounded-lg px-3 py-2 text-sm font-medium leading-normal" 
            label="Active Nav Item Text" 
            note="Size: 14px, Weight: 500"
          />
          
          <SpecDetail 
            num={4} 
            className="text-neutral-600 rounded-lg px-3 py-2 text-sm font-medium leading-normal" 
            label="Inactive Nav Item Text" 
            note="Size: 14px, Color: neutral-600"
          />
          
          <SpecDetail 
            num={19} 
            className="bg-primary-50 text-[#004a9c] rounded-lg px-3 py-2 text-sm font-medium leading-normal" 
            label="Hover Nav Item" 
            note="Bg: primary-50, Text: #004a9c"
          />
          
          <SpecDetail num={5} className="flex-1 p-8 bg-white" label="Main Content Area" />
          
          <SpecDetail 
            num={6} 
            className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#1a1a1a]" 
            label="Page Title" 
            note="H1: 40px, Bold"
          />
          
          <SpecDetail 
            num={7} 
            className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]" 
            label="Page Subtitle" 
            note="Body: 16px, Regular"
          />
          
          <SpecDetail num={8} className="grid gap-6 md:grid-cols-3" label="Stats Grid Container" />
          
          <SpecDetail 
            num={9} 
            className="text-[14px] leading-[1.43] tracking-[-0.35px] text-[#666]" 
            label="Stat Label Text" 
            note="Size: 14px, Color: #666"
          />
          
          <SpecDetail 
            num={10} 
            className="text-[32px] font-bold leading-[1.25] tracking-[-0.8px] text-[#1a1a1a]" 
            label="Stat Value Text" 
            note="Size: 32px, Bold"
          />
          
          <SpecDetail 
            num={11} 
            className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]" 
            label="Section Title Text" 
            note="H2: 24px, Semibold"
          />
          
          <SpecDetail 
            num={12} 
            className="text-[14px] text-[#004a9c] hover:bg-[#004a9c]/5" 
            label="View All Link" 
            note="Size: 14px, Medium"
          />
          
          <SpecDetail 
            num={20} 
            className="text-[14px] text-[#004a9c] bg-[#004a9c]/5" 
            label="Hover View All Link" 
            note="Bg: #004a9c/5"
          />
          
          <SpecDetail num={13} className="border border-[#e5e5e5] rounded-lg p-6 bg-white" label="Content Card" />
          
          <SpecDetail 
            num={14} 
            className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px] text-[#1a1a1a]" 
            label="User Name Text" 
            note="List Title: 14px"
          />
          
          <SpecDetail 
            num={15} 
            className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#666]" 
            label="User Email Text" 
            note="List Subtitle: 12px"
          />
          
          <SpecDetail 
            num={16} 
            className="px-3 py-1 rounded-full text-[12px] font-medium leading-normal" 
            label="Status Badge Text" 
            note="Badge: 12px, Medium"
          />
          
          <SpecDetail 
            num={17} 
            className="text-[14px] font-normal leading-[1.43] tracking-[-0.35px] text-[#1a1a1a]" 
            label="Notice Title Text" 
            note="List Title: 14px"
          />
          
          <SpecDetail 
            num={18} 
            className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999]" 
            label="Notice Date Text" 
            note="List Date: 12px"
          />
          
          <SpecDetail 
            num={21} 
            className="bg-[#f9f9f9]" 
            label="Hover List Item" 
            note="Bg: #f9f9f9"
          />
        </div>
      </div>
    </div>
  );
}