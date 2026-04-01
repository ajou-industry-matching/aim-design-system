"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, LayoutDashboard, Megaphone, Users, FileText } from "lucide-react";
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
            <div className="text-orange-700 font-bold text-[10px] uppercase tracking-wider">📐 Spacing</div>
            <div className="flex flex-wrap gap-1">
              {[...padding, ...margin, ...gap].map((c, i) => (
                <span key={i} className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  {c} {getPxValue(c) && <span className="text-orange-600">({getPxValue(c)})</span>}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Size */}
        {dimensions.length > 0 && (
          <div className="space-y-1">
            <div className="text-blue-700 font-bold text-[10px] uppercase tracking-wider">📏 Size</div>
            <div className="bg-blue-50 text-blue-900 px-2 py-1 rounded font-mono text-[10px]">{dimensions.join(" ")}</div>
          </div>
        )}
        {/* Style */}
        {(border.length > 0 || rounded.length > 0 || background.length > 0) && (
          <div className="space-y-1">
            <div className="text-purple-700 font-bold text-[10px] uppercase tracking-wider">🎨 Style</div>
            <div className="bg-purple-50 text-purple-900 px-2 py-1 rounded font-mono text-[10px]">{[...border, ...rounded, ...background].join(" ")}</div>
          </div>
        )}
        {/* Text */}
        {typography.length > 0 && (
          <div className="space-y-1">
            <div className="text-green-700 font-bold text-[10px] uppercase tracking-wider">✍️ Text</div>
            <div className="bg-green-50 text-green-900 px-2 py-1 rounded font-mono text-[10px]">{typography.join(" ")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AdminUsersPageFigma() {
  const navItems = [
    { title: "대시보드", icon: LayoutDashboard, active: false },
    { title: "공지사항 관리", icon: Megaphone, active: false },
    { title: "사용자 관리", icon: Users, active: true },
    { title: "소프콘 관리", icon: FileText, active: false },
  ];

  const mockUsers = Array.from({ length: 5 }, (_, i) => ({
    id: String(i + 1),
    name: `사용자${i + 1}`,
    email: `user${i + 1}@ajou.ac.kr`,
    role: i === 0 ? "관리자" : i === 1 ? "교수" : i < 4 ? "학생" : "기업",
    portfolios: Math.floor((i * 7 + 3) % 20),
    lastActivity: "2025.01.20",
    joinedAt: "2024.03.01",
    status: i === 4 ? "비정상" : "정상",
  }));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 사용자 관리</h2>
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
          <div className="flex min-h-[800px] bg-white border rounded-xl overflow-hidden shadow-sm relative">
            
            {/* Sidebar (No Spec Badges) */}
            <aside className="w-64 border-r border-neutral-200 bg-neutral-50 p-6">
              <div className="space-y-4">
                <div className="space-y-1 mb-6">
                  <h2 className="text-lg font-semibold">관리자 콘솔</h2>
                  <p className="text-sm text-muted-foreground">플랫폼 관리</p>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item, i) => (
                    <div key={i} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium", item.active ? "bg-[#004a9c] text-white" : "text-neutral-600")}>
                      <item.icon className="h-4 w-4" /> {item.title}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-8 space-y-6">
              {/* Header Spec */}
              <div>
                <h1 className="text-[32px] font-bold text-[#111] flex items-center mb-2">
                  사용자 관리 <SpecBadge num={1} />
                </h1>
                <p className="text-[14px] text-[#666] flex items-center">
                  플랫폼의 모든 사용자를 관리하세요 <SpecBadge num={2} />
                </p>
              </div>

              {/* Search Spec */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm flex items-center">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                  <Input placeholder="이름 또는 이메일 검색..." className="pl-9 h-10" />
                  <SpecBadge num={3} />
                </div>
              </div>

              {/* Table Width Specs */}
              <div className="w-full border-collapse">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                        사용자 <SpecBadge num={4} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                        이메일 <SpecBadge num={5} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                        권한 <SpecBadge num={6} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                        게시글 <SpecBadge num={7} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[140px]">
                        마지막 활동 <SpecBadge num={8} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[140px]">
                        가입일 <SpecBadge num={9} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                        상태 <SpecBadge num={10} />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user, i) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="text-center">{user.name}</TableCell>
                        <TableCell className="text-center">{user.email}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium",
                            user.role === "관리자" ? "bg-red-500/10 text-red-500" :
                            user.role === "교수" ? "bg-[#004a9c]/10 text-[#004a9c]" :
                            user.role === "학생" ? "bg-green-500/10 text-green-500" :
                            "bg-purple-500/10 text-purple-500"
                          )}>
                            {user.role}
                            {i === 0 && <SpecBadge num={11} />}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">{user.portfolios}</TableCell>
                        <TableCell className="text-center">{user.lastActivity}</TableCell>
                        <TableCell className="text-center">{user.joinedAt}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium",
                            user.status === "정상" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                          )}>
                            {user.status}
                            {i === 0 && <SpecBadge num={12} />}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination (No Spec) */}
              <div className="flex justify-center pt-4">
                <div className="flex gap-1">
                  {[1, 2, 3].map(p => (
                    <div key={p} className={cn("w-8 h-8 flex items-center justify-center rounded border", p === 1 ? "bg-[#004a9c] text-white" : "bg-white")}>{p}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="w-[450px] p-8 bg-teal-50 border-l-4 border-teal-500">
          <h3 className="text-teal-900 font-bold text-lg mb-6">📋 컴포넌트 스펙</h3>
          
          <SpecDetail 
            num={1} 
            className="text-[32px] font-bold text-[#111]" 
            label="Page Title" 
            note="Size: 32px, Weight: 700" 
          />
          <SpecDetail 
            num={2} 
            className="text-[14px] text-[#666]" 
            label="Page Subtitle" 
            note="Size: 14px, Color: #666" 
          />
          
          <SpecDetail 
            num={3} 
            className="relative flex-1 max-w-sm h-10 border-[#e5e5e5] rounded-md" 
            label="Search Input Container" 
            note="Max width: sm (384px)" 
          />
          
          <div className="mt-8 mb-4 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-2">📏 Table Columns Width</h4>
          </div>
          
          <SpecDetail num={4} className="w-[100px]" label="Column: 사용자" />
          <SpecDetail num={5} className="flex-1" label="Column: 이메일" note="Flexible (Fill)" />
          <SpecDetail num={6} className="w-[100px]" label="Column: 권한" />
          <SpecDetail num={7} className="w-[120px]" label="Column: 게시글" />
          <SpecDetail num={8} className="w-[140px]" label="Column: 마지막 활동" />
          <SpecDetail num={9} className="w-[140px]" label="Column: 가입일" />
          <SpecDetail num={10} className="w-[100px]" label="Column: 상태" />

          <div className="mt-8 mb-4 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-2">🏷️ Badges</h4>
          </div>

          <SpecDetail 
            num={11} 
            className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-red-500/10 text-red-500" 
            label="Role Badge (Admin)" 
            note="Size: 12px, Medium" 
          />
          <SpecDetail 
            num={12} 
            className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-green-500/10 text-green-500" 
            label="Status Badge (Normal)" 
            note="Size: 12px, Medium" 
          />
        </div>
      </div>
    </div>
  );
}
