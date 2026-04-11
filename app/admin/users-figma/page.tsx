"use client";

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

// ─────────────────────────────────────────────
// Spec Utilities
// ─────────────────────────────────────────────
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
  };
};

const SpecBadge = ({ num }: { num: number }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-600 text-white rounded-full text-[11px] font-bold ml-2 z-50 relative shrink-0">
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
        {note && <span className="text-teal-200 text-[11px] font-normal">{note}</span>}
      </div>
      <div className="p-3 space-y-2.5 text-[11px]">
        {(padding.length > 0 || margin.length > 0 || gap.length > 0) && (
          <div className="space-y-1">
            <div className="text-orange-700 font-bold text-[10px] uppercase tracking-wider">
              📐 Spacing
            </div>
            <div className="flex flex-wrap gap-1">
              {[...padding, ...margin, ...gap].map((c, i) => (
                <span
                  key={i}
                  className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                >
                  {c} {getPxValue(c) && <span className="text-orange-600">({getPxValue(c)})</span>}
                </span>
              ))}
            </div>
          </div>
        )}
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
        {(border.length > 0 || rounded.length > 0 || background.length > 0) && (
          <div className="space-y-1">
            <div className="text-purple-700 font-bold text-[10px] uppercase tracking-wider">
              🎨 Style
            </div>
            <div className="bg-purple-50 text-purple-900 px-2 py-1 rounded font-mono text-[10px]">
              {[...border, ...rounded, ...background].join(" ")}
            </div>
          </div>
        )}
        {typography.length > 0 && (
          <div className="space-y-1">
            <div className="text-green-700 font-bold text-[10px] uppercase tracking-wider">
              ✍️ Text
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

// ─────────────────────────────────────────────
// 모든 권한 케이스를 한 테이블에 담은 샘플 데이터
// ─────────────────────────────────────────────
const mockUsers = [
  {
    id: "1",
    name: "김관리자",
    email: "super@ajou.ac.kr",
    baseRole: null as string | null,
    adminRole: "슈퍼관리자" as string | null,
    portfolios: 0,
    lastActivity: "2025.01.20",
    joinedAt: "2023.03.01",
    status: "정상",
  },
  {
    id: "2",
    name: "이교수",
    email: "prof@ajou.ac.kr",
    baseRole: "교수",
    adminRole: "일반관리자",
    portfolios: 5,
    lastActivity: "2025.01.19",
    joinedAt: "2023.09.01",
    status: "정상",
  },
  {
    id: "3",
    name: "박학생",
    email: "student@ajou.ac.kr",
    baseRole: "학생",
    adminRole: null,
    portfolios: 12,
    lastActivity: "2025.01.19",
    joinedAt: "2024.03.02",
    status: "정상",
  },
  {
    id: "4",
    name: "최기업",
    email: "company@example.com",
    baseRole: "기업",
    adminRole: null,
    portfolios: 3,
    lastActivity: "2025.01.18",
    joinedAt: "2024.06.15",
    status: "비정상",
  },
];

const roleBadgeClass = (baseRole: string | null, adminRole: string | null) => {
  if (adminRole === "슈퍼관리자")
    return "bg-red-500/10 text-red-600 font-semibold";
  if (baseRole === "교수") return "bg-[#004a9c]/10 text-[#004a9c]";
  if (baseRole === "학생") return "bg-green-500/10 text-green-600";
  return "bg-purple-500/10 text-purple-600";
};

const roleLabel = (baseRole: string | null, adminRole: string | null) => {
  if (adminRole === "슈퍼관리자") return "슈퍼관리자";
  return baseRole ?? "-";
};

export default function AdminUsersPageFigma() {
  const navItems = [
    { title: "대시보드", icon: LayoutDashboard, active: false },
    { title: "공지사항 관리", icon: Megaphone, active: false },
    { title: "사용자 관리", icon: Users, active: true },
    { title: "소프콘 관리", icon: FileText, active: false },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Spec Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 사용자 관리</h2>
        <div className="flex gap-6 text-sm mt-2 text-teal-50">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-100 border border-orange-600" /> Spacing
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-100 border border-blue-600" /> Size
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-100 border border-purple-600" /> Style
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-100 border border-green-600" /> Text
          </span>
        </div>
      </div>

      <div className="flex max-w-[1900px] mx-auto">
        {/* ── Left: UI Preview ── */}
        <div className="flex-1 p-8 bg-gray-50">
          <div className="flex min-h-[700px] bg-white border rounded-xl overflow-hidden shadow-sm">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-200 bg-neutral-50 p-6 shrink-0">
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
                        item.active ? "bg-[#004a9c] text-white" : "text-neutral-600"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 p-8 space-y-6 overflow-auto">
              <div>
                <h1 className="text-[32px] font-bold text-[#111] flex items-center mb-2">
                  사용자 관리 <SpecBadge num={1} />
                </h1>
                <p className="text-[14px] text-[#666] flex items-center">
                  플랫폼의 모든 사용자를 관리하세요 <SpecBadge num={2} />
                </p>
              </div>

              {/* Search */}
              <div className="relative flex items-center max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                <Input placeholder="이름 또는 이메일 검색..." className="pl-9 h-10" />
                <SpecBadge num={3} />
              </div>

              {/* Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center w-[110px]">
                      사용자 <SpecBadge num={4} />
                    </TableHead>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center">
                      이메일 <SpecBadge num={5} />
                    </TableHead>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center w-[120px]">
                      권한 <SpecBadge num={6} />
                    </TableHead>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center w-[110px]">
                      관리자 여부 <SpecBadge num={7} />
                    </TableHead>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center w-[100px]">
                      게시글
                    </TableHead>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center w-[130px]">
                      마지막 활동
                    </TableHead>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center w-[130px]">
                      가입일
                    </TableHead>
                    <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold text-center w-[90px]">
                      상태
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user, idx) => {
                    const isAdmin = user.adminRole !== null;
                    return (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 px-5 py-4 text-[#333] text-[14px] text-center">
                          {user.name}
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 px-5 py-4 text-[#333] text-[14px] text-center">
                          {user.email}
                        </TableCell>
                        {/* 권한 */}
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 px-5 py-4 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium",
                              roleBadgeClass(user.baseRole, user.adminRole)
                            )}
                          >
                            {roleLabel(user.baseRole, user.adminRole)}
                            {idx === 0 && <SpecBadge num={8} />}
                            {idx === 1 && <SpecBadge num={9} />}
                            {idx === 2 && <SpecBadge num={10} />}
                            {idx === 3 && <SpecBadge num={11} />}
                          </span>
                        </TableCell>
                        {/* 관리자 여부 */}
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 px-5 py-4 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold",
                              isAdmin
                                ? "bg-amber-500/10 text-amber-700"
                                : "bg-[#f2f2f2] text-[#aaa]"
                            )}
                          >
                            {isAdmin ? "Y" : "N"}
                            {idx === 0 && <SpecBadge num={12} />}
                            {idx === 2 && <SpecBadge num={13} />}
                          </span>
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 px-5 py-4 text-[#333] text-[14px] text-center">
                          {user.portfolios}
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 px-5 py-4 text-[#333] text-[14px] text-center">
                          {user.lastActivity}
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 px-5 py-4 text-[#333] text-[14px] text-center">
                          {user.joinedAt}
                        </TableCell>
                        <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 px-5 py-4 text-center">
                          <span
                            className={cn(
                              "inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium",
                              user.status === "정상"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-500"
                            )}
                          >
                            {user.status}
                            {idx === 3 && <SpecBadge num={14} />}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-center pt-4">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <div
                      key={p}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded border text-sm",
                        p === 1 ? "bg-[#004a9c] text-white" : "bg-white"
                      )}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Spec Details ── */}
        <div className="w-[460px] p-8 bg-teal-50 border-l-4 border-teal-500 overflow-auto">
          <h3 className="text-teal-900 font-bold text-lg mb-6">📋 컴포넌트 스펙</h3>

          <SpecDetail num={1} className="text-[32px] font-bold text-[#111]" label="Page Title" note="32px / Bold 700" />
          <SpecDetail num={2} className="text-[14px] text-[#666]" label="Page Subtitle" note="14px / Color #666" />
          <SpecDetail num={3} className="relative max-w-sm h-10 rounded-md border border-input pl-9" label="Search Input" note="max-w-sm, h-40px, pl-36px" />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">📏 Table Column Widths</h4>
          </div>
          <SpecDetail num={4} className="w-[110px]" label="Column: 사용자" />
          <SpecDetail num={5} className="flex-1" label="Column: 이메일" note="Flexible (Fill)" />
          <SpecDetail num={6} className="w-[120px]" label="Column: 권한" />
          <SpecDetail num={7} className="w-[110px]" label="Column: 관리자 여부" />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">🏷️ 권한 배지 — 4가지 케이스</h4>
          </div>
          <SpecDetail
            num={8}
            className="bg-red-500/10 text-red-600 font-semibold px-3 py-1 rounded-full text-[12px]"
            label="슈퍼관리자 Badge"
            note="bg red-500/10 · text red-600 · Bold"
          />
          <SpecDetail
            num={9}
            className="bg-[#004a9c]/10 text-[#004a9c] px-3 py-1 rounded-full text-[12px] font-medium"
            label="교수 Badge"
            note="bg #004a9c/10 · text #004a9c"
          />
          <SpecDetail
            num={10}
            className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-[12px] font-medium"
            label="학생 Badge"
            note="bg green-500/10 · text green-600"
          />
          <SpecDetail
            num={11}
            className="bg-purple-500/10 text-purple-600 px-3 py-1 rounded-full text-[12px] font-medium"
            label="기업 Badge"
            note="bg purple-500/10 · text purple-600"
          />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">🔘 관리자 여부 배지 — 2가지 케이스</h4>
          </div>
          <SpecDetail
            num={12}
            className="bg-amber-500/10 text-amber-700 font-semibold px-3 py-1 rounded-full text-[12px]"
            label="관리자 여부 Y"
            note="bg amber-500/10 · text amber-700 · Bold"
          />
          <SpecDetail
            num={13}
            className="bg-[#f2f2f2] text-[#aaa] font-semibold px-3 py-1 rounded-full text-[12px]"
            label="관리자 여부 N"
            note="bg #f2f2f2 · text #aaa · Bold"
          />

          <div className="mt-6 mb-3 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-1">🔴 상태 배지 — 비정상</h4>
          </div>
          <SpecDetail
            num={14}
            className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[12px] font-medium"
            label="Status Badge (비정상)"
            note="bg red-500/10 · text red-500"
          />
        </div>
      </div>
    </div>
  );
}
