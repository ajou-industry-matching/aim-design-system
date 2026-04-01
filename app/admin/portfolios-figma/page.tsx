"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  LayoutDashboard,
  Megaphone,
  Users,
  FileText,
  ArrowLeft,
  X,
  Upload,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------
// Design Spec Components
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
    dimensions: classes.filter(
      (c) => /^(w-|h-|max-w|min-h|max-h|flex-1|flex)/.test(c),
    ),
    border: classes.filter((c) => /^border/.test(c)),
    rounded: classes.filter((c) => /^rounded/.test(c)),
    typography: classes.filter(
      (c) => /^(text-|font-|leading-|tracking-)/.test(c),
    ),
    background: classes.filter((c) => /^bg-/.test(c)),
  };
};

const SpecBadge = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-600 text-white rounded-full text-[11px] font-bold ml-2 z-50 relative">
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
  const { padding, margin, gap, dimensions, border, rounded, typography, background } =
    parseClasses(className);

  return (
    <div className="bg-white border-2 border-teal-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-teal-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-teal-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">
            {num}
          </span>
          {label}
        </span>
        {note && (
          <span className="text-teal-200 text-[11px] font-normal">{note}</span>
        )}
      </div>
      <div className="p-3 space-y-2.5 text-[11px]">
        {(padding.length > 0 || margin.length > 0 || gap.length > 0) && (
          <div className="space-y-1">
            <div className="text-orange-700 font-bold text-[10px] uppercase tracking-wider">
              Spacing
            </div>
            <div className="flex flex-wrap gap-1">
              {[...padding, ...margin, ...gap].map((c, i) => (
                <span
                  key={i}
                  className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                >
                  {c}{" "}
                  {getPxValue(c) && (
                    <span className="text-orange-600">({getPxValue(c)})</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
        {dimensions.length > 0 && (
          <div className="space-y-1">
            <div className="text-blue-700 font-bold text-[10px] uppercase tracking-wider">
              Size
            </div>
            <div className="bg-blue-50 text-blue-900 px-2 py-1 rounded font-mono text-[10px]">
              {dimensions.join(" ")}
            </div>
          </div>
        )}
        {(border.length > 0 || rounded.length > 0 || background.length > 0) && (
          <div className="space-y-1">
            <div className="text-purple-700 font-bold text-[10px] uppercase tracking-wider">
              Style
            </div>
            <div className="bg-purple-50 text-purple-900 px-2 py-1 rounded font-mono text-[10px]">
              {[...border, ...rounded, ...background].join(" ")}
            </div>
          </div>
        )}
        {typography.length > 0 && (
          <div className="space-y-1">
            <div className="text-green-700 font-bold text-[10px] uppercase tracking-wider">
              Text
            </div>
            <div className="bg-green-50 text-green-900 px-2 py-1 rounded font-mono text-[10px]">
              {typography.join(" ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Page
// ----------------------------------------------------------------------

export default function AdminPortfoliosPageFigma() {
  const navItems = [
    { title: "대시보드", icon: LayoutDashboard, active: false },
    { title: "공지사항 관리", icon: Megaphone, active: false },
    { title: "사용자 관리", icon: Users, active: false },
    { title: "포트폴리오 관리", icon: FileText, active: true },
  ];

  const mockPortfolios = [
    { number: 1, title: "AI 기반 학습 도우미 플랫폼", author: "김철수", views: 1234, date: "2024.01.20" },
    { number: 2, title: "캠퍼스 네비게이션 앱", author: "이영희", views: 987, date: "2024.01.18" },
    { number: 3, title: "블록체인 투표 시스템", author: "박민수", views: 456, date: "2024.01.15" },
    { number: 4, title: "IoT 스마트 팜 관리", author: "최지은", views: 321, date: "2024.01.12" },
    { number: 5, title: "실시간 채팅 애플리케이션", author: "정우성", views: 789, date: "2024.01.10" },
  ];

  const mockTags = [
    { name: "React", count: 45 },
    { name: "TypeScript", count: 38 },
    { name: "JavaScript", count: 32 },
    { name: "Next.js", count: 28 },
    { name: "Python", count: 25 },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Figma Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">
          Design Spec: 포트폴리오 관리
        </h2>
        <div className="flex gap-6 text-sm mt-2 text-teal-50">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-100 border border-orange-600"></span>{" "}
            Spacing
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-100 border border-blue-600"></span>{" "}
            Size
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-100 border border-purple-600"></span>{" "}
            Style
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-100 border border-green-600"></span>{" "}
            Text
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CASE 1: 포트폴리오 관리 탭 */}
      {/* ============================================================ */}
      <div className="border-b-4 border-teal-200">
        <div className="bg-teal-600 px-8 py-3">
          <h3 className="text-white font-bold text-lg">
            Case 1: 포트폴리오 관리 탭
          </h3>
        </div>
        <div className="flex max-w-[1800px] mx-auto">
          {/* Left: UI Preview */}
          <div className="flex-1 p-8 bg-gray-50">
            <div className="flex min-h-[700px] bg-white border rounded-xl overflow-hidden shadow-sm">
              {/* Sidebar */}
              <aside className="w-64 border-r border-neutral-200 bg-neutral-50 p-6">
                <div className="space-y-4">
                  <div className="space-y-1 mb-6">
                    <h2 className="text-lg font-semibold">관리자 콘솔</h2>
                    <p className="text-sm text-muted-foreground">플랫폼 관리</p>
                  </div>
                  <nav className="space-y-1">
                    {navItems.map((item, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                          item.active
                            ? "bg-[#004a9c] text-white"
                            : "text-neutral-600",
                        )}
                      >
                        <item.icon className="h-4 w-4" /> {item.title}
                      </div>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 p-8 space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-[32px] font-bold text-[#111] flex items-center">
                    포트폴리오 관리 <SpecBadge num={1} />
                  </h1>
                  <p className="text-[14px] text-[#666] flex items-center">
                    포트폴리오와 태그를 관리할 수 있습니다.{" "}
                    <SpecBadge num={2} />
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex items-center">
                  <div className="h-[44px] bg-[#f2f2f2] rounded-lg p-1 flex items-center">
                    <div className="px-6 py-2 bg-white rounded-md shadow-sm text-[14px] font-medium text-[#111]">
                      포트폴리오 관리
                    </div>
                    <div className="px-6 py-2 text-[14px] font-medium text-[#666]">
                      태그 관리
                    </div>
                  </div>
                  <SpecBadge num={3} />
                </div>

                {/* Search */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 max-w-sm flex items-center">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                    <Input
                      placeholder="제목 또는 작성자 검색..."
                      className="pl-9 h-10"
                    />
                    <SpecBadge num={4} />
                  </div>
                </div>

                {/* Table */}
                <div className="w-full border-collapse">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                          순번 <SpecBadge num={5} />
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                          제목
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                          작성자
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                          조회수
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                          등록일
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPortfolios.map((p) => (
                        <TableRow
                          key={p.number}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                            {p.number}
                          </TableCell>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                            {p.title}
                          </TableCell>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                            {p.author}
                          </TableCell>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                            {p.views.toLocaleString()}
                          </TableCell>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                            {p.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center pt-4">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((p) => (
                      <div
                        key={p}
                        className={cn(
                          "w-8 h-8 flex items-center justify-center rounded border text-sm",
                          p === 1
                            ? "bg-[#004a9c] text-white"
                            : "bg-white text-[#333]",
                        )}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                  <SpecBadge num={6} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Spec Details */}
          <div className="w-[450px] p-8 bg-teal-50 border-l-4 border-teal-500">
            <h3 className="text-teal-900 font-bold text-lg mb-6">
              컴포넌트 스펙
            </h3>

            <SpecDetail
              num={1}
              className="text-[32px] font-bold text-[#111]"
              label="Page Title"
              note="32px, Bold"
            />
            <SpecDetail
              num={2}
              className="text-[14px] text-[#666]"
              label="Page Subtitle"
              note="14px, #666"
            />
            <SpecDetail
              num={3}
              className="h-[44px] bg-[#f2f2f2] rounded-lg p-1"
              label="Tabs Container"
              note="Active: bg-white shadow-sm"
            />
            <SpecDetail
              num={4}
              className="h-10 max-w-sm border-[#e5e5e5] rounded-md pl-9"
              label="Search Input"
              note="Max width: sm (384px)"
            />

            <div className="mt-6 mb-4 border-t border-teal-200 pt-4">
              <h4 className="text-teal-800 font-bold text-sm mb-2">
                Table Header / Cell
              </h4>
            </div>

            <SpecDetail
              num={5}
              className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px]"
              label="Table Header Cell"
              note="Bg: #f2f2f2, Top border: 2px"
            />
            <SpecDetail
              num={6}
              className="bg-[#004a9c] text-white w-8 h-8 rounded border"
              label="Pagination (Active)"
              note="Bg: #004a9c, 32x32px"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CASE 2: 태그 관리 탭 */}
      {/* ============================================================ */}
      <div className="border-b-4 border-teal-200">
        <div className="bg-teal-600 px-8 py-3">
          <h3 className="text-white font-bold text-lg">
            Case 2: 태그 관리 탭
          </h3>
        </div>
        <div className="flex max-w-[1800px] mx-auto">
          {/* Left: UI Preview */}
          <div className="flex-1 p-8 bg-gray-50">
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <div className="p-8 space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-[32px] font-bold text-[#111]">
                    포트폴리오 관리
                  </h1>
                  <p className="text-[14px] text-[#666]">
                    포트폴리오와 태그를 관리할 수 있습니다.
                  </p>
                </div>

                {/* Tabs - Tag active */}
                <div className="flex items-center">
                  <div className="h-[44px] bg-[#f2f2f2] rounded-lg p-1 flex items-center">
                    <div className="px-6 py-2 text-[14px] font-medium text-[#666]">
                      포트폴리오 관리
                    </div>
                    <div className="px-6 py-2 bg-white rounded-md shadow-sm text-[14px] font-medium text-[#111]">
                      태그 관리
                    </div>
                  </div>
                </div>

                {/* Add Tag */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="새 태그 이름 입력..."
                    className="max-w-[300px] h-10"
                  />
                  <Button className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2">
                    <Plus size={18} />
                    태그 추가
                  </Button>
                  <SpecBadge num={7} />
                </div>

                {/* Search + Count */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                    <Input
                      placeholder="태그 검색..."
                      className="pl-9 h-10"
                    />
                  </div>
                  <span className="text-[14px] text-[#666] flex items-center">
                    총{" "}
                    <span className="font-semibold text-[#111] mx-1">20</span>
                    개 <SpecBadge num={8} />
                  </span>
                </div>

                {/* Tag Table - Normal */}
                <div className="w-full border-collapse">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                          순번
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                          태그명 <SpecBadge num={9} />
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[150px]">
                          사용 수
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                          관리 <SpecBadge num={10} />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTags.map((tag, i) => (
                        <TableRow key={tag.name}>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                            {i + 1}
                          </TableCell>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                            <Badge
                              variant="outline"
                              className="border-[#003876] text-[#003876]"
                            >
                              #{tag.name}
                            </Badge>
                          </TableCell>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                            {tag.count}개 포트폴리오
                          </TableCell>
                          <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-[#666] hover:text-[#004a9c]"
                              >
                                <Pencil size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-[#666] hover:text-red-500"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Spec Details */}
          <div className="w-[450px] p-8 bg-teal-50 border-l-4 border-teal-500">
            <h3 className="text-teal-900 font-bold text-lg mb-6">
              컴포넌트 스펙
            </h3>

            <SpecDetail
              num={7}
              className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              label="Tag Add Button"
              note="Primary Blue, 40px"
            />
            <SpecDetail
              num={8}
              className="text-[14px] text-[#666] font-semibold text-[#111]"
              label="Tag Count Text"
              note="Count: Semibold #111"
            />
            <SpecDetail
              num={9}
              className="border-[#003876] text-[#003876] rounded-full px-3 py-1"
              label="Tag Badge"
              note="Border: #003876, Outline"
            />
            <SpecDetail
              num={10}
              className="h-8 w-8 text-[#666]"
              label="Action Icon Buttons"
              note="Ghost, 32x32px"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CASE 3: 태그 수정 중 (Inline Edit) */}
      {/* ============================================================ */}
      <div className="border-b-4 border-teal-200">
        <div className="bg-teal-600 px-8 py-3">
          <h3 className="text-white font-bold text-lg">
            Case 3: 태그 인라인 수정 모드
          </h3>
        </div>
        <div className="flex max-w-[1800px] mx-auto">
          {/* Left: UI Preview */}
          <div className="flex-1 p-8 bg-gray-50">
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
              <div className="p-8">
                {/* Partial tag table showing edit mode */}
                <div className="w-full border-collapse">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                          순번
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                          태그명
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[150px]">
                          사용 수
                        </TableHead>
                        <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                          관리
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Normal row */}
                      <TableRow>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center">
                          1
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4">
                          <Badge
                            variant="outline"
                            className="border-[#003876] text-[#003876]"
                          >
                            #React
                          </Badge>
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center text-[14px] text-[#333]">
                          45개 포트폴리오
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666]"
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666]"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {/* Editing row */}
                      <TableRow>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center">
                          2
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Input
                              readOnly defaultValue="TypeScript"
                              className="h-8 max-w-[200px]"
                            />
                            <Button
                              size="sm"
                              className="h-8 bg-[#004a9c] hover:bg-[#004a9c]/90 text-white"
                            >
                              저장
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8"
                            >
                              취소
                            </Button>
                            <SpecBadge num={11} />
                          </div>
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center text-[14px] text-[#333]">
                          38개 포트폴리오
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-center">
                          {/* Empty when editing */}
                        </TableCell>
                      </TableRow>
                      {/* Normal row */}
                      <TableRow>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center">
                          3
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4">
                          <Badge
                            variant="outline"
                            className="border-[#003876] text-[#003876]"
                          >
                            #JavaScript
                          </Badge>
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center text-[14px] text-[#333]">
                          32개 포트폴리오
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666]"
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666]"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Spec Details */}
          <div className="w-[450px] p-8 bg-teal-50 border-l-4 border-teal-500">
            <h3 className="text-teal-900 font-bold text-lg mb-6">
              컴포넌트 스펙
            </h3>

            <SpecDetail
              num={11}
              className="h-8 max-w-[200px] border border-[#ccc] rounded-md"
              label="Inline Edit Input"
              note="Height: 32px, Max-W: 200px"
            />

            <div className="bg-white border-2 border-teal-500 rounded-lg overflow-hidden mb-4">
              <div className="bg-teal-500 text-white px-3 py-2 font-bold text-[13px]">
                Inline Edit Buttons
              </div>
              <div className="p-3 space-y-2 text-[11px]">
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono text-[10px]">
                    저장: h-8, bg-[#004a9c], text-white
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-[10px]">
                    취소: h-8, variant-outline
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CASE 4: 포트폴리오 수정 - 읽기 모드 */}
      {/* ============================================================ */}
      <div className="border-b-4 border-teal-200">
        <div className="bg-teal-600 px-8 py-3">
          <h3 className="text-white font-bold text-lg">
            Case 4: 포트폴리오 수정 페이지 (읽기 모드)
          </h3>
        </div>
        <div className="flex max-w-[1800px] mx-auto">
          {/* Left: UI Preview */}
          <div className="flex-1 p-8 bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col gap-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-[40px] w-[40px] border-[#e5e5e5]"
                    >
                      <ArrowLeft size={20} />
                    </Button>
                    <div>
                      <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333] flex items-center">
                        포트폴리오 수정 <SpecBadge num={12} />
                      </h1>
                      <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] flex items-center">
                        포트폴리오 정보를 조회하고 수정할 수 있습니다{" "}
                        <SpecBadge num={13} />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
                      수정 <SpecBadge num={14} />
                    </Button>
                    <Button
                      variant="outline"
                      className="border border-red-500 text-red-500 hover:bg-red-500/5 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2"
                    >
                      <Trash2 size={18} />
                      삭제 <SpecBadge num={15} />
                    </Button>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a] flex items-center">
                    기본 정보 <SpecBadge num={16} />
                  </h2>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333] flex items-center">
                      프로젝트 제목 * <SpecBadge num={17} />
                    </label>
                    <Input
                      readOnly defaultValue="AI 기반 학습 도우미 플랫폼"
                      disabled
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] bg-[#f5f5f5]"
                    />
                    <SpecBadge num={18} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      간단 설명 *
                    </label>
                    <div className="px-4 py-3 border border-[#ccc] rounded-[8px] text-[16px] bg-[#f5f5f5] min-h-[80px] text-[#333]">
                      인공지능을 활용하여 학생 개개인의 학습 패턴을 분석하고, 맞춤형 학습 자료를 추천하는 플랫폼입니다.
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333] flex items-center">
                      태그 <SpecBadge num={19} />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "AI/ML", "Python"].map(
                        (tag) => (
                          <Badge
                            key={tag}
                            className="px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-full border border-[#003876]"
                          >
                            #{tag}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    상세 내용
                  </h2>
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      프로젝트 상세 설명 *
                    </label>
                    <div className="border border-[#ccc] rounded-[8px] p-4 min-h-[200px] bg-white relative">
                      Editor (Novel) - Read Only Mode
                      <SpecBadge num={20} />
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    미디어 및 링크
                  </h2>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333] flex items-center">
                      썸네일 이미지 * <SpecBadge num={21} />
                    </label>
                    <div className="w-full h-64 bg-[#f5f5f5] border border-[#e5e5e5] rounded-[8px] flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-300" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      시연 영상 URL
                    </label>
                    <Input
                      readOnly defaultValue="https://youtube.com/watch?v=example"
                      disabled
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] bg-[#f5f5f5]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      GitHub URL
                    </label>
                    <Input
                      readOnly defaultValue="https://github.com/example/ai-tutor"
                      disabled
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] bg-[#f5f5f5]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333] flex items-center">
                      첨부파일 <SpecBadge num={22} />
                    </label>
                    <div className="space-y-2">
                      {[
                        { name: "발표자료.pptx", size: "2 MB" },
                        { name: "기술문서.pdf", size: "1 MB" },
                      ].map((file) => (
                        <div
                          key={file.name}
                          className="w-full p-3 flex items-center gap-3 border border-[#e5e5e5] rounded-lg bg-white"
                        >
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-[14px] font-medium">
                              {file.name}
                            </p>
                            <p className="text-[12px] text-[#999]">
                              {file.size}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Spec Details */}
          <div className="w-[450px] p-8 bg-teal-50 border-l-4 border-teal-500">
            <h3 className="text-teal-900 font-bold text-lg mb-6">
              컴포넌트 스펙
            </h3>

            <SpecDetail
              num={12}
              className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#333]"
              label="Page Title"
              note="H1: 40px, Bold"
            />
            <SpecDetail
              num={13}
              className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]"
              label="Page Subtitle"
              note="Body: 16px"
            />
            <SpecDetail
              num={14}
              className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              label="Edit Button"
              note="Primary Blue, 40px"
            />
            <SpecDetail
              num={15}
              className="border border-red-500 text-red-500 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              label="Delete Button"
              note="Border: Red-500"
            />
            <SpecDetail
              num={16}
              className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]"
              label="Section Title"
              note="H2: 24px, Semibold"
            />
            <SpecDetail
              num={17}
              className="text-[16px] font-medium text-[#333]"
              label="Input Label"
              note="16px, Medium"
            />
            <SpecDetail
              num={18}
              className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] bg-[#f5f5f5]"
              label="Input (Disabled)"
              note="Bg: #f5f5f5, Height: 48px"
            />
            <SpecDetail
              num={19}
              className="px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-full border border-[#003876]"
              label="Tag Badge (Read)"
              note="No X button in read mode"
            />
            <SpecDetail
              num={20}
              className="border border-[#ccc] rounded-[8px] min-h-[200px] bg-white"
              label="Novel Editor (Read)"
              note="editable={false}, same styling"
            />
            <SpecDetail
              num={21}
              className="w-full h-64 bg-[#f5f5f5] border border-[#e5e5e5] rounded-[8px]"
              label="Thumbnail Preview"
              note="Height: 256px"
            />
            <SpecDetail
              num={22}
              className="w-full p-3 border border-[#e5e5e5] rounded-lg bg-white"
              label="Attachment Card"
              note="Padding: 12px"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CASE 5: 포트폴리오 수정 - 수정 모드 */}
      {/* ============================================================ */}
      <div>
        <div className="bg-teal-600 px-8 py-3">
          <h3 className="text-white font-bold text-lg">
            Case 5: 포트폴리오 수정 페이지 (수정 모드)
          </h3>
        </div>
        <div className="flex max-w-[1800px] mx-auto">
          {/* Left: UI Preview */}
          <div className="flex-1 p-8 bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col gap-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-[40px] w-[40px] border-[#e5e5e5]"
                    >
                      <ArrowLeft size={20} />
                    </Button>
                    <div>
                      <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333]">
                        포트폴리오 수정
                      </h1>
                      <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]">
                        포트폴리오 정보를 조회하고 수정할 수 있습니다
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
                    >
                      취소 <SpecBadge num={23} />
                    </Button>
                    <Button className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
                      저장 <SpecBadge num={24} />
                    </Button>
                  </div>
                </div>

                {/* Basic Info - Editable */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    기본 정보
                  </h2>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      프로젝트 제목 *
                    </label>
                    <Input
                      readOnly defaultValue="AI 기반 학습 도우미 플랫폼"
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                    />
                    <SpecBadge num={25} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      간단 설명 *
                    </label>
                    <textarea
                      readOnly defaultValue="인공지능을 활용하여 학생 개개인의 학습 패턴을 분석하고, 맞춤형 학습 자료를 추천하는 플랫폼입니다."
                      rows={3}
                      className="px-4 py-3 border border-[#ccc] rounded-[8px] text-[16px] resize-none"
                    />
                  </div>

                  {/* Tags with Select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333] flex items-center">
                      태그 <SpecBadge num={26} />
                    </label>
                    <div className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] flex items-center text-[#999]">
                      태그를 선택하세요
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["React", "TypeScript", "AI/ML", "Python"].map(
                        (tag) => (
                          <Badge
                            key={tag}
                            className="flex items-center gap-2 px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-full border border-[#003876]"
                          >
                            #{tag}
                            <X className="h-3 w-3 cursor-pointer" />
                          </Badge>
                        ),
                      )}
                      <SpecBadge num={27} />
                    </div>
                  </div>
                </div>

                {/* Content Editor - Editable */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    상세 내용
                  </h2>
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      프로젝트 상세 설명 *
                    </label>
                    <p className="text-[14px] text-[#666]">
                      / 를 입력하여 다양한 포맷을 사용할 수 있습니다
                    </p>
                    <div className="border border-[#ccc] rounded-[8px] p-4 min-h-[200px] bg-white relative">
                      Editor (Novel) - Editable Mode
                      <SpecBadge num={28} />
                    </div>
                  </div>
                </div>

                {/* Media - Editable */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    미디어 및 링크
                  </h2>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333] flex items-center">
                      썸네일 이미지 * <SpecBadge num={29} />
                    </label>
                    <div className="w-full h-96 bg-[#f5f5f5] border border-[#e5e5e5] rounded-[8px] flex items-center justify-center relative">
                      <ImageIcon className="w-16 h-16 text-gray-300" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      시연 영상 URL
                    </label>
                    <Input
                      readOnly defaultValue="https://youtube.com/watch?v=example"
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      GitHub URL
                    </label>
                    <Input
                      readOnly defaultValue="https://github.com/example/ai-tutor"
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                    />
                  </div>

                  {/* Attachments with upload + remove */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333]">
                      첨부파일
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-[14px] text-[#666]">
                        <span className="font-semibold">파일 추가</span>
                      </p>
                      <p className="text-[12px] text-[#999] mt-1">
                        PDF, DOCX, PPTX, ZIP 등
                      </p>
                    </label>
                    <SpecBadge num={30} />
                    <div className="space-y-2 mt-2">
                      {[
                        { name: "발표자료.pptx", size: "2 MB" },
                        { name: "기술문서.pdf", size: "1 MB" },
                      ].map((file) => (
                        <div
                          key={file.name}
                          className="w-full p-3 flex items-center justify-between border border-[#e5e5e5] rounded-lg bg-white"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-[14px] font-medium">
                                {file.name}
                              </p>
                              <p className="text-[12px] text-[#999]">
                                {file.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="flex justify-end gap-2 pt-6 border-t border-[#e5e5e5]">
                  <Button
                    variant="outline"
                    className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
                  >
                    취소
                  </Button>
                  <Button className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
                    저장
                  </Button>
                  <SpecBadge num={31} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Spec Details */}
          <div className="w-[450px] p-8 bg-teal-50 border-l-4 border-teal-500">
            <h3 className="text-teal-900 font-bold text-lg mb-6">
              컴포넌트 스펙
            </h3>

            <SpecDetail
              num={23}
              className="border border-[#e5e5e5] text-[#111] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              label="Cancel Button"
              note="Outline, Border: #e5e5e5"
            />
            <SpecDetail
              num={24}
              className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              label="Save Button"
              note="Primary Blue, 40px"
            />
            <SpecDetail
              num={25}
              className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
              label="Input (Editable)"
              note="Height: 48px, no bg override"
            />
            <SpecDetail
              num={26}
              className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
              label="Tag Select Trigger"
              note="Same style as Input"
            />
            <SpecDetail
              num={27}
              className="px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-full border border-[#003876]"
              label="Tag Badge (Editable)"
              note="With X button to remove"
            />
            <SpecDetail
              num={28}
              className="border border-[#ccc] rounded-[8px] min-h-[200px] bg-white"
              label="Novel Editor (Editable)"
              note="editable={true}, slash commands"
            />
            <SpecDetail
              num={29}
              className="w-full h-96 bg-[#f5f5f5] border border-[#e5e5e5] rounded-[8px]"
              label="Thumbnail (With Delete)"
              note="Height: 384px, X button top-right"
            />
            <SpecDetail
              num={30}
              className="w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px]"
              label="File Upload Zone"
              note="Dashed border, 128px height"
            />
            <SpecDetail
              num={31}
              className="border-t border-[#e5e5e5] pt-6 gap-2"
              label="Bottom Action Bar"
              note="Top border separator, right-aligned"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
