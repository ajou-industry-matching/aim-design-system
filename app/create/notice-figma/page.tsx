"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NoticeContentEditor } from "@/components/notice/notice-content-editor";
import { FileText, X } from "lucide-react";
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
    /^(opacity-|shadow-|transition-|group-hover:)/.test(c),
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
  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-[11px] font-bold ml-2">
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
    <div className="bg-white border-2 border-blue-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-blue-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">
            {num}
          </span>
          {label}
        </span>
        {note && (
          <span className="text-blue-200 text-[11px] font-normal">{note}</span>
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

interface NoticeFormData {
  title: string;
  author: string;
  content: string;
  attachments: File[];
}

export default function CreateNoticePageFigma() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    author: "",
    content: "",
    attachments: [],
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 border-b-4 border-blue-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">
          🎨 Design Spec: 공지사항 작성 페이지
        </h2>
        <div className="flex gap-6 text-sm mt-2 text-blue-50">
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
        <div className="flex-1 p-8 bg-gray-50">
          <div className="bg-white">
            <div className="mx-auto max-w-[1440px] py-12 px-4 md:px-8 flex items-start">
              <SpecBadge num={0} />
              <form className="flex flex-col gap-10 flex-1">
                {/* Header */}
                <div>
                  <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333] mb-2 flex items-center">
                    {isEditMode ? "공지사항 수정" : "공지사항 작성"}{" "}
                    <SpecBadge num={1} />
                  </h1>
                  <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] flex items-center">
                    {isEditMode
                      ? "공지사항을 수정하세요"
                      : "중요한 공지사항을 작성하고 공유하세요"}{" "}
                    <SpecBadge num={2} />
                  </p>
                </div>

                {/* Basic Information */}
                <div className="flex flex-col gap-6 items-start">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a] flex items-center">
                    기본 정보 <SpecBadge num={3} />
                  </h2>
                  <SpecBadge num={4} />

                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[16px] font-medium text-[#333] flex items-center">
                      제목 * <SpecBadge num={5} />
                    </Label>
                    <Input
                      type="text"
                      placeholder="공지사항 제목을 입력하세요"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[16px] font-medium text-[#333]">
                      작성자 *
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="작성자 이름을 입력하세요"
                        value={formData.author}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                        className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] flex-1"
                      />
                      <SpecBadge num={6} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    공지 내용
                  </h2>
                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      내용 *
                    </Label>
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] text-[#666] flex-1">
                        / 를 입력하여 다양한 포맷을 사용할 수 있습니다
                      </p>
                      <SpecBadge num={7} />
                    </div>
                    <div className="border border-[#ccc] rounded-[8px] p-4 min-h-[200px] bg-gray-50 flex items-center justify-center text-gray-400">
                      Editor Placeholder <SpecBadge num={8} />
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
                    <div className="flex items-start gap-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors">
                        <FileText className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-[14px] text-[#666]">
                          <span className="font-semibold">파일 추가</span>
                        </p>
                        <p className="text-[12px] text-[#999] mt-1">
                          PDF, DOCX, PPTX, ZIP, 이미지 등
                        </p>
                      </label>
                      <SpecBadge num={9} />
                    </div>

                    <div className="space-y-2 mt-4 w-full flex items-start gap-2">
                      <Card className="w-full p-3 flex flex-row items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="w-full flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-[14px] font-medium">
                              sample.pdf
                            </p>
                            <p className="text-[12px] text-[#999]">2.5 MB</p>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </Card>
                      <SpecBadge num={10} />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-[#e5e5e5] items-center">
                  <Button
                    type="button"
                    onClick={() => router.back()}
                    className="h-[48px] px-8 bg-white border border-[#ccc] text-[#666] hover:bg-gray-50 rounded-[8px] text-[16px] font-medium"
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    className="h-[48px] px-8 bg-[#004a9c] hover:bg-[#004a9c]/90 text-white rounded-[8px] text-[16px] font-medium"
                  >
                    {isEditMode ? "수정 완료" : "등록하기"}
                  </Button>
                  <SpecBadge num={11} />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="w-[450px] p-8 bg-blue-50 border-l-4 border-blue-500">
          <h3 className="text-blue-900 font-bold text-lg mb-6 bg-blue-50 py-2">
            📋 컴포넌트 스펙
          </h3>

          <SpecDetail
            num={0}
            className="mx-auto max-w-[1440px] py-12"
            label="Page Container"
          />
          <SpecDetail
            num={1}
            className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333] mb-2"
            label="H1 Title"
          />
          <SpecDetail
            num={2}
            className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]"
            label="Subtitle"
          />
          <SpecDetail
            num={3}
            className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]"
            label="Section H2"
          />
          <SpecDetail
            num={4}
            className="flex flex-col gap-6"
            label="Section Container"
            note="전체 섹션 반복"
          />
          <SpecDetail
            num={5}
            className="text-[16px] font-medium text-[#333]"
            label="Label (공통)"
          />
          <SpecDetail
            num={6}
            className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
            label="Input (공통)"
            note="동일 구조 반복"
          />
          <SpecDetail
            num={7}
            className="text-[14px] text-[#666]"
            label="Helper Text"
          />
          <SpecDetail
            num={8}
            className="w-full min-h-[300px]"
            label="Content Editor Area"
          />
          <SpecDetail
            num={9}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer"
            label="File Upload Area"
            note="hover:bg-gray-50, transition-colors"
          />
          <SpecDetail
            num={10}
            className="w-full p-3 flex flex-row items-center justify-between"
            label="File Item Card"
            note="hover:bg-gray-50, transition-colors"
          />
          <SpecDetail
            num={11}
            className="flex justify-end gap-4 pt-6 border-t border-[#e5e5e5]"
            label="Button Group"
          />
        </div>
      </div>
    </div>
  );
}
