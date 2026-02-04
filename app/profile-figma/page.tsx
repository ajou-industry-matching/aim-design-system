"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Grid3x3, Heart } from "lucide-react";

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
  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-[11px] font-bold ml-2 z-50 relative">
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
    <div className="bg-white border-2 border-green-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-green-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">{num}</span>
          {label}
        </span>
        {note && <span className="text-green-200 text-[11px] font-normal">{note}</span>}
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

export default function ProfilePageFigma() {
  const mockUser = {
    name: "김철수",
    email: "chulsoo.kim@ajou.ac.kr",
    affiliation: "아주대학교 소프트웨어학과",
    userType: "학생",
    bio: "웹 개발과 UI/UX 디자인에 관심이 많은 학생입니다.",
    portfolioCount: 12,
    likedCount: 8,
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 border-b-4 border-green-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 프로필 페이지</h2>
        <div className="flex gap-6 text-sm mt-2 text-green-50">
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-orange-100 border border-orange-600"></span> Spacing</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-100 border border-blue-600"></span> Size</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-purple-100 border border-purple-600"></span> Style</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-100 border border-green-600"></span> Text</span>
        </div>
      </div>

      <div className="flex max-w-[1800px] mx-auto">
        {/* Left: UI Preview */}
        <div className="flex-1 p-8 bg-gray-50">
          <div className="bg-white p-8 rounded-xl shadow-sm relative">
            <SpecBadge num={0} />
            
            {/* Profile Header */}
            <div className="flex gap-[100px] mb-12 items-start">
              <div className="w-[150px] h-[150px] rounded-full bg-[#004a9c] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[48px] font-bold">{mockUser.name.charAt(0)}</span>
                <SpecBadge num={1} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-[20px] font-normal text-[#111]">{mockUser.name} <SpecBadge num={3} /></h1>
                  <Button variant="outline" className="border border-[#e5e5e5] text-[#111] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium">
                    프로필 편집 <SpecBadge num={4} />
                  </Button>
                  <Button className="bg-[#004a9c] text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium gap-2">
                    <Upload size={18} /> 포트폴리오 업로드 <SpecBadge num={5} />
                  </Button>
                </div>

                <div className="flex items-center gap-10 mb-4">
                  <div className="text-[16px] text-[#111]">게시물 <span className="font-semibold">{mockUser.portfolioCount}</span></div>
                  <div className="text-[16px] text-[#111]">좋아요 <span className="font-semibold">{mockUser.likedCount}</span></div>
                  <SpecBadge num={6} />
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div className="text-[14px] font-semibold text-[#111]">{mockUser.email}</div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#004a9c]/10 text-[#004a9c] text-[12px] font-medium">
                    {mockUser.userType}
                  </div>
                  <SpecBadge num={7} />
                </div>

                <div className="text-[14px] text-[#111] mb-1">{mockUser.affiliation}</div>
                <div className="text-[14px] text-[#666]">{mockUser.bio} <SpecBadge num={8} /></div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-[#e5e5ec] mb-8">
              <div className="flex justify-start">
                <button className="flex items-center gap-2 px-8 py-4 border-t-2 border-[#004a9c] text-[#004a9c]">
                  <Grid3x3 size={20} /> <span className="text-[14px] font-medium">내 게시글</span> <SpecBadge num={10} />
                </button>
                <button className="flex items-center gap-2 px-8 py-4 border-t-2 border-transparent text-[#999]">
                  <Heart size={20} /> <span className="text-[14px] font-medium">좋아요한 게시글</span>
                </button>
                <SpecBadge num={9} />
              </div>
            </div>

            {/* Card Grid (Preview only, no spec badges) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Card 1 (No Spec)</div>
              <div className="aspect-[4/3] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Card 2 (No Spec)</div>
              <SpecBadge num={11} />
            </div>

            {/* Profile Edit Modal Preview (Rendered in-page for spec) */}
            <div className="mt-20 border-t-4 border-dashed border-gray-200 pt-20">
              <h3 className="text-xl font-bold mb-10 text-gray-400 uppercase tracking-widest text-center">--- Profile Edit Modal Spec ---</h3>
              
              <div className="bg-white rounded-lg w-[500px] mx-auto border-2 shadow-2xl relative">
                <SpecBadge num={13} />
                <div className="border-b border-[#e5e5e5] p-4 flex items-center justify-between">
                  <h2 className="text-[18px] font-semibold text-[#111]">프로필 편집</h2>
                  <SpecBadge num={14} />
                </div>
                <div className="p-6 space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">이름</Label>
                    <Input value={mockUser.name} readOnly className="h-9" />
                    <SpecBadge num={15} />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">이메일</Label>
                    <Input value={mockUser.email} readOnly className="h-9" />
                    <SpecBadge num={17} />
                  </div>

                  {/* Affiliation */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">소속</Label>
                    <Input value={mockUser.affiliation} readOnly className="h-9" />
                    <SpecBadge num={18} />
                  </div>

                  {/* User Type */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">회원 종류</Label>
                    <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm flex items-center">
                      학생
                    </div>
                    <SpecBadge num={19} />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">자기소개</Label>
                    <Textarea value={mockUser.bio} readOnly rows={4} className="resize-none" />
                    <SpecBadge num={20} />
                  </div>
                </div>
                <div className="border-t border-[#e5e5e5] p-4 flex justify-end gap-2">
                  <Button variant="outline" className="border-[#004a9c] text-[#004a9c] h-[40px] px-6">취소</Button>
                  <Button className="bg-[#004a9c] text-white h-[40px] px-6">저장</Button>
                  <SpecBadge num={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="w-[450px] p-8 bg-green-50 border-l-4 border-green-500">
          <h3 className="text-green-900 font-bold text-lg mb-6">📋 컴포넌트 스펙</h3>
          <SpecDetail num={0} className="mx-auto max-w-[1440px] py-16 px-4" label="Page Container" />
          <SpecDetail num={1} className="w-[150px] h-[150px] rounded-full bg-[#004a9c]" label="Profile Avatar" />
          
          <SpecDetail 
            num={3} 
            className="text-[20px] font-normal leading-normal tracking-normal text-[#111]" 
            label="Username Text" 
            note="Size: 20px, Weight: 400"
          />
          
          <SpecDetail 
            num={4} 
            className="h-[40px] rounded-lg px-6 py-[10px] border border-[#e5e5e5] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]" 
            label="Edit Button" 
            note="Text: 14px, Medium"
          />
          
          <SpecDetail 
            num={5} 
            className="h-[40px] rounded-lg px-6 py-[10px] bg-[#004a9c] text-white text-[14px] font-medium leading-[1.43] tracking-[-0.35px]" 
            label="Upload Button" 
            note="Text: 14px, Medium"
          />
          
          <SpecDetail 
            num={6} 
            className="text-[16px] font-normal leading-normal text-[#111]" 
            label="Stats Text (게시물/좋아요)" 
            note="Value: font-semibold"
          />
          
          <SpecDetail 
            num={7} 
            className="text-[14px] font-semibold text-[#111] leading-normal" 
            label="Email & User Type Badge" 
            note="Badge: 12px, Medium"
          />
          
          <SpecDetail 
            num={8} 
            className="text-[14px] text-[#666] leading-normal" 
            label="Bio Text" 
            note="Size: 14px, Color: #666"
          />
          
          <SpecDetail num={9} className="border-t border-[#e5e5ec] flex justify-start" label="Tabs Container" />
          
          <SpecDetail 
            num={10} 
            className="px-8 py-4 border-t-2 border-[#004a9c] text-[#004a9c] text-[14px] font-medium leading-normal" 
            label="Active Tab Text" 
          />
          
          <SpecDetail num={11} className="grid grid-cols-4 gap-6" label="Portfolio Grid" note="Card specs excluded" />
          
          <SpecDetail num={13} className="bg-white rounded-lg w-[500px] border shadow-2xl" label="Modal Container" />
          
          <SpecDetail 
            num={14} 
            className="text-[18px] font-semibold text-[#111] leading-normal" 
            label="Modal Title" 
          />
          
          <SpecDetail 
            num={15} 
            className="text-sm font-medium leading-none text-[#111]" 
            label="Field Label" 
            note="Applied to all modal labels"
          />
          
          <SpecDetail 
            num={17} 
            className="h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm" 
            label="Input Field Text" 
            note="Font: 14px (text-sm)"
          />
          
          <SpecDetail 
            num={18} 
            className="h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm" 
            label="Affiliation Input" 
            note="Font: 14px (text-sm)"
          />
          
          <SpecDetail 
            num={19} 
            className="h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm" 
            label="User Type Select" 
            note="Font: 14px (text-sm)"
          />
          
          <SpecDetail 
            num={20} 
            className="w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm min-h-[80px]" 
            label="Bio Textarea" 
            note="Font: 14px (text-sm)"
          />
          
          <SpecDetail 
            num={16} 
            className="h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]" 
            label="Modal Action Buttons" 
            note="Font: 14px, Medium"
          />
        </div>
      </div>
    </div>
  );
}