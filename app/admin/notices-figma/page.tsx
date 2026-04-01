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
import { Search, Plus, LayoutDashboard, Megaphone, Users, FileText } from "lucide-react";
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

export default function AdminNoticesPageFigma() {
  const navItems = [
    { title: "대시보드", icon: LayoutDashboard, active: false },
    { title: "공지사항 관리", icon: Megaphone, active: true },
    { title: "사용자 관리", icon: Users, active: false },
    { title: "소프콘 관리", icon: FileText, active: false },
  ];

  const mockNotices = Array.from({ length: 5 }, (_, i) => ({
    id: String(i + 1),
    number: i + 1,
    title: `공지사항 제목 예시 ${i + 1}`,
    date: "2025.01.20",
    views: 123,
    author: "관리자",
  }));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 공지사항 관리</h2>
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-[32px] font-bold text-[#111] flex items-center">
                    공지사항 관리 <SpecBadge num={1} />
                  </h1>
                  <p className="text-[14px] text-[#666] flex items-center">
                    공지사항을 작성하고 관리할 수 있습니다. <SpecBadge num={2} />
                  </p>
                </div>
                <Button className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2">
                  <Plus size={18} />
                  공지사항 작성
                  <SpecBadge num={3} />
                </Button>
              </div>

              {/* Search Spec */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm flex items-center">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                  <Input placeholder="제목 검색..." className="pl-9 h-10" />
                  <SpecBadge num={4} />
                </div>
              </div>

              {/* Table Width Specs */}
              <div className="w-full border-collapse">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                        순번 <SpecBadge num={5} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                        제목 <SpecBadge num={6} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                        작성자 <SpecBadge num={7} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                        등록일 <SpecBadge num={8} />
                      </TableHead>
                      <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                        조회수 <SpecBadge num={9} />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockNotices.map((notice) => (
                      <TableRow key={notice.id}>
                        <TableCell className="text-center">{notice.number}</TableCell>
                        <TableCell>{notice.title}</TableCell>
                        <TableCell className="text-center">{notice.author}</TableCell>
                        <TableCell className="text-center">{notice.date}</TableCell>
                        <TableCell className="text-center">{notice.views}</TableCell>
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
          
          <SpecDetail num={1} className="text-[32px] font-bold text-[#111]" label="Page Title" note="Size: 32px, Weight: 700" />
          <SpecDetail num={2} className="text-[14px] text-[#666]" label="Page Subtitle" note="Size: 14px, Color: #666" />
          <SpecDetail num={3} className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2" label="Create Button" note="Primary Blue, 40px Height" />
          
          <SpecDetail num={4} className="relative flex-1 max-w-sm h-10 border-[#e5e5e5] rounded-md" label="Search Input Container" note="Max width: sm (384px)" />
          
          <div className="mt-8 mb-4 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-2">📏 Table Columns Width</h4>
          </div>
          
          <SpecDetail num={5} className="w-[70px]" label="Column: 순번" />
          <SpecDetail num={6} className="flex-1" label="Column: 제목" note="Flexible (Fill)" />
          <SpecDetail num={7} className="w-[120px]" label="Column: 작성자" />
          <SpecDetail num={8} className="w-[120px]" label="Column: 등록일" />
          <SpecDetail num={9} className="w-[120px]" label="Column: 조회수" />
        </div>
      </div>
    </div>
  );
}
