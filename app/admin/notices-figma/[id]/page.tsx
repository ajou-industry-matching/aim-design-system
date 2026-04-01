"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trash2, FileText, X } from "lucide-react";

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

export default function AdminNoticeEditPageFigma() {
  const [formData, setFormData] = useState({
    title: "공지사항 예시 제목입니다",
    author: "관리자",
    content: "<p>공지사항 내용입니다.</p>",
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 border-b-4 border-teal-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">🎨 Design Spec: 공지사항 수정</h2>
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
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col gap-10">
              {/* Admin Header with Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-[40px] w-[40px] border-[#e5e5e5]">
                    <ArrowLeft size={20} />
                  </Button>
                  <div>
                    <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333] flex items-center">
                      공지사항 수정 <SpecBadge num={1} />
                    </h1>
                    <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] flex items-center">
                      공지사항을 수정하세요 <SpecBadge num={2} />
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

              <div className="flex flex-col gap-10">
                {/* Basic Information */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a] flex items-center">
                    기본 정보 <SpecBadge num={5} />
                  </h2>

                  {/* Title */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333] flex items-center">
                      제목 * <SpecBadge num={6} />
                    </Label>
                    <Input
                      value={formData.title}
                      readOnly
                      disabled
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[#999] bg-[#f5f5f5] cursor-not-allowed"
                    />
                    <SpecBadge num={7} />
                  </div>

                  {/* Author */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      작성자 *
                    </Label>
                    <Input
                      value={formData.author}
                      readOnly
                      disabled
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[#999] bg-[#f5f5f5] cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Content Editor */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    공지 내용
                  </h2>
                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      내용 *
                    </Label>
                    <div className="border border-[#ccc] rounded-[8px] p-4 min-h-[300px] bg-white flex items-center justify-center text-gray-400 relative">
                      Editor Component Placeholder
                      <SpecBadge num={8} />
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    파일 첨부
                  </h2>

                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      첨부파일
                    </Label>
                    <div className="space-y-2 w-full">
                      <Card className="w-full p-3 flex flex-row items-center justify-between hover:bg-gray-50 transition-colors border border-[#e5e5e5] rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-[14px] font-medium text-[#333]">sample.pdf</p>
                            <p className="text-[12px] text-[#999]">2.5 MB</p>
                          </div>
                        </div>
                      </Card>
                      <SpecBadge num={9} />
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
            className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#333]" 
            label="Page Title" 
            note="H1: 40px, Bold"
          />
          <SpecDetail 
            num={2} 
            className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]" 
            label="Page Subtitle" 
            note="Body: 16px, Regular"
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
            className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]" 
            label="Section Title" 
            note="H2: 24px, Semibold"
          />
          <SpecDetail 
            num={6} 
            className="text-[16px] font-medium text-[#333]" 
            label="Input Label" 
            note="Size: 16px, Medium"
          />
          <SpecDetail 
            num={7} 
            className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[#999] bg-[#f5f5f5] cursor-not-allowed" 
            label="Input Field (Disabled)" 
            note="Bg: #f5f5f5, Text: #999, Cursor: not-allowed"
          />
          <SpecDetail 
            num={8} 
            className="border border-[#ccc] rounded-[8px] min-h-[300px] bg-white" 
            label="Editor Container" 
            note="Min-Height: 300px, Border: #ccc"
          />
          <SpecDetail 
            num={9} 
            className="w-full p-3 border border-[#e5e5e5] rounded-lg bg-white" 
            label="Attachment Card" 
            note="Padding: 12px, Border: #e5e5e5"
          />
        </div>
      </div>
    </div>
  );
}
