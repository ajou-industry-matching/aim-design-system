"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";

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

export default function AdminUserDetailPageFigma() {
  const [user] = useState({
    id: "1",
    name: "사용자1",
    email: "user1@ajou.ac.kr",
    role: "학생",
    portfolios: 12,
    lastActivity: "2025.01.20",
    joinedAt: "2024.03.01",
    status: "정상",
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 사용자 상세 정보</h2>
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
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-[40px] w-[40px] border-[#e5e5e5]">
                  <ArrowLeft size={20} />
                </Button>
                <div>
                  <h1 className="text-[32px] font-bold text-[#111] flex items-center">
                    사용자 상세 정보 <SpecBadge num={1} />
                  </h1>
                  <p className="text-[14px] text-[#666] flex items-center">
                    사용자 정보를 조회하고 수정할 수 있습니다. <SpecBadge num={2} />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
                  수정 <SpecBadge num={3} />
                </Button>
                <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500/5 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2">
                  <Trash2 size={18} />
                  삭제 <SpecBadge num={4} />
                </Button>
              </div>
            </div>

            {/* User Information */}
            <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
              <h2 className="text-[20px] font-semibold text-[#111] mb-6 flex items-center">
                기본 정보 <SpecBadge num={5} />
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111] flex items-center">
                    이름 <SpecBadge num={6} />
                  </Label>
                  <Input value={user.name} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                  <SpecBadge num={7} />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111]">이메일</Label>
                  <Input value={user.email} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111]">권한</Label>
                  <div className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm flex items-center text-[#999] cursor-not-allowed">
                    {user.role}
                  </div>
                </div>

                {/* Portfolios */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111]">게시글 수</Label>
                  <Input value={user.portfolios} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                </div>

                {/* Last Activity */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111]">마지막 활동</Label>
                  <Input value={user.lastActivity} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                </div>

                {/* Joined At */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111]">가입일</Label>
                  <Input value={user.joinedAt} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111]">상태</Label>
                  <Input value={user.status} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                </div>

                {/* User ID */}
                <div className="space-y-2">
                  <Label className="text-[14px] font-medium leading-none text-[#111]">사용자 ID</Label>
                  <Input value={user.id} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                </div>
              </div>
            </div>
          </div>

          {/* Edit Mode Preview */}
          <div className="mt-20 border-t-4 border-dashed border-gray-200 pt-20">
            <h3 className="text-xl font-bold mb-10 text-gray-400 uppercase tracking-widest text-center">--- Edit Mode Spec ---</h3>
            
            <div className="space-y-6">
              {/* Header with Save/Cancel */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-[40px] w-[40px] border-[#e5e5e5]">
                    <ArrowLeft size={20} />
                  </Button>
                  <div>
                    <h1 className="text-[32px] font-bold text-[#111]">사용자 상세 정보</h1>
                    <p className="text-[14px] text-[#666]">사용자 정보를 조회하고 수정할 수 있습니다.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
                    취소 <SpecBadge num={8} />
                  </Button>
                  <Button className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
                    저장 <SpecBadge num={9} />
                  </Button>
                </div>
              </div>

              {/* Editable Form */}
              <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
                <h2 className="text-[20px] font-semibold text-[#111] mb-6">기본 정보</h2>
                <div className="grid grid-cols-2 gap-6">
                  {/* Name (Editable) */}
                  <div className="space-y-2">
                    <Label className="text-[14px] font-medium leading-none text-[#111]">이름</Label>
                    <Input value={user.name} readOnly className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm" />
                    <SpecBadge num={10} />
                  </div>

                  {/* Email (Editable) */}
                  <div className="space-y-2">
                    <Label className="text-[14px] font-medium leading-none text-[#111]">이메일</Label>
                    <Input value={user.email} readOnly className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm" />
                  </div>

                  {/* Role (Editable Select) */}
                  <div className="space-y-2">
                    <Label className="text-[14px] font-medium leading-none text-[#111]">권한</Label>
                    <div className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm flex items-center justify-between">
                      {user.role}
                      <span className="text-gray-400">▼</span>
                    </div>
                  </div>

                  {/* Status Toggle Button */}
                  <div className="space-y-2">
                    <Label className="text-[14px] font-medium leading-none text-[#111]">상태</Label>
                    <div className="flex items-center gap-3">
                      <Input value={user.status} readOnly disabled className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" />
                      <Button variant="outline" className="h-[36px] rounded-lg px-4 text-[14px] font-medium border-red-500 text-red-500 hover:bg-red-500/5">
                        정지 <SpecBadge num={11} />
                      </Button>
                    </div>
                  </div>
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
            note="Size: 32px, Bold" 
          />
          <SpecDetail 
            num={2} 
            className="text-[14px] text-[#666]" 
            label="Page Subtitle" 
            note="Size: 14px, Color: #666" 
          />
          <SpecDetail 
            num={3} 
            className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]" 
            label="Primary Action Button" 
            note="Bg: #004a9c, Text: 14px Medium" 
          />
          <SpecDetail 
            num={4} 
            className="border border-red-500 text-red-500 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]" 
            label="Danger Action Button" 
            note="Border: Red-500, Text: Red-500" 
          />
          <SpecDetail 
            num={5} 
            className="text-[20px] font-semibold text-[#111]" 
            label="Section Title" 
            note="Size: 20px, Semibold" 
          />
          <SpecDetail 
            num={6} 
            className="text-[14px] font-medium leading-none text-[#111]" 
            label="Field Label" 
            note="Size: 14px, Medium" 
          />
          <SpecDetail 
            num={7} 
            className="h-9 w-full rounded-md border border-input bg-[#f5f5f5] px-3 py-1 text-sm shadow-sm cursor-not-allowed text-[#999]" 
            label="Input Field (Disabled)" 
            note="Bg: #f5f5f5, Text: #999, Cursor: not-allowed" 
          />
          
          <div className="mt-8 mb-4 border-t border-teal-200 pt-4">
            <h4 className="text-teal-800 font-bold text-sm mb-2">✏️ Edit Mode</h4>
          </div>

          <SpecDetail 
            num={8} 
            className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium" 
            label="Secondary Action Button" 
            note="Border: #e5e5e5, Text: #111" 
          />
          <SpecDetail 
            num={9} 
            className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium" 
            label="Save Button" 
            note="Bg: #004a9c, Text: White" 
          />
          <SpecDetail 
            num={10} 
            className="h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm" 
            label="Input Field (Active)" 
            note="Bg: White, Border: Default" 
          />
          <SpecDetail 
            num={11} 
            className="h-[36px] rounded-lg px-4 text-[14px] font-medium border-red-500 text-red-500" 
            label="Status Toggle Button" 
            note="Border: Red-500, Text: Red-500" 
          />
        </div>
      </div>
    </div>
  );
}
