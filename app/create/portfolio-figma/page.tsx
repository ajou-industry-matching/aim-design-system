"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PortfolioContentEditor } from "@/components/portfolio/portfolio-content-editor";
import { FileText, Plus, X, Upload, ImageIcon } from "lucide-react";
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
  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-[11px] font-bold ml-2">
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
    <div className="bg-white border-2 border-purple-500 rounded-lg overflow-hidden mb-4">
      <div className="bg-purple-500 text-white px-3 py-2 font-bold text-[13px] flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="bg-white text-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-[11px]">
            {num}
          </span>
          {label}
        </span>
        {note && (
          <span className="text-purple-200 text-[11px] font-normal">
            {note}
          </span>
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

interface PortfolioFormData {
  title: string;
  description: string;
  markdownContent: string;
  tags: string[];
  thumbnail: File | null;
  images: File[];
  videoUrl: string;
  githubUrl: string;
  attachments: File[];
}

export default function CreatePortfolioPageFigma() {
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: "",
    description: "",
    markdownContent: "",
    tags: ["React", "TypeScript"],
    thumbnail: null,
    images: [],
    videoUrl: "",
    githubUrl: "",
    attachments: [],
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 border-b-4 border-purple-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">
          🎨 Design Spec: Portfolio 작성 페이지
        </h2>
        <div className="flex gap-6 text-sm mt-2 text-purple-50">
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
                    포트폴리오 작성 <SpecBadge num={1} />
                  </h1>
                  <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] flex items-center">
                    프로젝트를 공유하고 다른 사람들과 소통하세요{" "}
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
                      프로젝트 제목 * <SpecBadge num={5} />
                    </Label>
                    <Input
                      type="text"
                      placeholder="프로젝트 제목을 입력하세요"
                      className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[16px] font-medium text-[#333]">
                      간단 설명 *
                    </Label>
                    <div className="flex items-start gap-2">
                      <Textarea
                        placeholder="프로젝트를 2-3줄로 간단히 요약해주세요"
                        rows={3}
                        className="px-4 py-3 border border-[#ccc] rounded-[8px] text-[16px] resize-none flex-1"
                      />
                      <SpecBadge num={6} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[16px] font-medium text-[#333]">
                      태그
                    </Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="태그를 입력하세요"
                        className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] flex-1"
                      />
                      <Button
                        type="button"
                        className="h-[48px] w-[48px] bg-[#004a9c] text-white rounded-[8px]"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                      <SpecBadge num={7} />
                    </div>

                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="flex items-center gap-2 px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-full border border-[#003876]"
                          >
                            #{tag} <X className="h-3 w-3" />
                          </Badge>
                        ))}
                        <SpecBadge num={8} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    상세 내용
                  </h2>
                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      프로젝트 상세 설명 *
                    </Label>
                    <div className="flex items-start gap-2">
                      <p className="text-[14px] text-[#666] flex-1">
                        / 를 입력하여 다양한 포맷을 사용할 수 있습니다
                      </p>
                      <SpecBadge num={9} />
                    </div>
                    <div className="border border-[#ccc] rounded-[8px] p-4 min-h-[200px] bg-gray-50 flex items-center justify-center text-gray-400">
                      Editor Placeholder <SpecBadge num={10} />
                    </div>
                  </div>
                </div>

                {/* Media & Links */}
                <div className="flex flex-col gap-6">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    미디어 및 링크
                  </h2>

                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      썸네일 이미지 *
                    </Label>
                    <div className="flex items-start gap-2">
                      <Card className="relative overflow-hidden w-full">
                        <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                            <p className="text-sm text-purple-600 font-medium">
                              thumbnail-preview.jpg
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </Card>
                      <SpecBadge num={11} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      추가 이미지
                    </Label>
                    <div className="flex items-start gap-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50">
                        <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-[14px] text-[#666]">
                          <span className="font-semibold">이미지 추가</span>
                        </p>
                      </label>
                      <SpecBadge num={12} />
                    </div>

                    <div className="flex items-start gap-2 w-full">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 flex-1">
                        <Card className="relative overflow-hidden group">
                          <SpecBadge num={19} />
                          <div className="w-full aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-blue-400" />
                            <SpecBadge num={20} />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                            <SpecBadge num={21} />
                          </Button>
                        </Card>
                        <Card className="relative overflow-hidden group">
                          <div className="w-full aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-green-400" />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </Card>
                        <Card className="relative overflow-hidden group">
                          <div className="w-full aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-orange-400" />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </Card>
                      </div>
                      <SpecBadge num={18} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[16px] font-medium text-[#333]">
                      시연 영상 URL
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] flex-1"
                      />
                      <SpecBadge num={13} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <Label className="text-[16px] font-medium text-[#333]">
                      GitHub URL
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="url"
                        placeholder="https://github.com/username/repo"
                        className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] flex-1"
                      />
                      <SpecBadge num={14} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-[16px] font-medium text-[#333]">
                      첨부파일
                    </Label>
                    <div className="flex items-start gap-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50">
                        <FileText className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-[14px] text-[#666]">
                          <span className="font-semibold">파일 추가</span>
                        </p>
                        <p className="text-[12px] text-[#999] mt-1">
                          PDF, DOCX, PPTX, ZIP 등
                        </p>
                      </label>
                      <SpecBadge num={15} />
                    </div>

                    <div className="space-y-2 mt-4 w-full flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <Card className="w-full p-3 flex flex-row items-center justify-between hover:bg-gray-50 transition-colors">
                          <div className="w-full flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-[14px] font-medium">
                                project-document.pdf
                              </p>
                              <p className="text-[12px] text-[#999]">3.2 MB</p>
                            </div>
                          </div>
                          <Button type="button" variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </Card>
                        <SpecBadge num={17} />
                      </div>
                      <Card className="w-full p-3 flex flex-row items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="w-full flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-[14px] font-medium">
                              presentation.pptx
                            </p>
                            <p className="text-[12px] text-[#999]">5.8 MB</p>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-[#e5e5e5] items-center">
                  <Button
                    type="button"
                    className="h-[48px] px-8 bg-white border border-[#ccc] text-[#666] rounded-[8px] text-[16px] font-medium"
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    className="h-[48px] px-8 bg-[#004a9c] text-white rounded-[8px] text-[16px] font-medium"
                  >
                    저장하기
                  </Button>
                  <SpecBadge num={16} />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Spec Details */}
        <div className="w-[450px] p-8 bg-purple-50 border-l-4 border-purple-500">
          <h3 className="text-purple-900 font-bold text-lg mb-6 bg-purple-50 py-2">
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
            className="px-4 py-3 border border-[#ccc] rounded-[8px] text-[16px] resize-none"
            label="Textarea (공통)"
          />
          <SpecDetail
            num={7}
            className="flex gap-2"
            label="Input + Button Row"
            note="gap-2 (8px)"
          />
          <SpecDetail
            num={8}
            className="flex flex-wrap gap-2 mt-2"
            label="Tags Container"
            note="gap-2, mt-2"
          />
          <SpecDetail
            num={9}
            className="text-[14px] text-[#666]"
            label="Helper Text"
          />
          <SpecDetail
            num={10}
            className="w-full min-h-[300px]"
            label="Content Editor Area"
          />
          <SpecDetail
            num={11}
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer"
            label="Thumbnail Upload"
            note="hover:bg-gray-50, transition-colors"
          />
          <SpecDetail
            num={12}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer"
            label="Image Upload"
            note="hover:bg-gray-50, transition-colors"
          />
          <SpecDetail
            num={13}
            className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
            label="URL Input (공통)"
            note="동일 구조"
          />
          <SpecDetail
            num={14}
            className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
            label="URL Input (공통)"
            note="동일 구조"
          />
          <SpecDetail
            num={15}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer"
            label="File Upload"
            note="hover:bg-gray-50, transition-colors"
          />
          <SpecDetail
            num={16}
            className="flex justify-end gap-4 pt-6 border-t border-[#e5e5e5]"
            label="Button Group"
          />
          <SpecDetail
            num={17}
            className="w-full p-3 flex flex-row items-center justify-between"
            label="File Item Card"
            note="hover:bg-gray-50, transition-colors"
          />
          <SpecDetail
            num={18}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4"
            label="Image Grid Container"
            note="반응형 그리드"
          />
          <SpecDetail
            num={19}
            className="relative overflow-hidden group"
            label="Image Preview Card"
          />
          <SpecDetail
            num={20}
            className="object-cover aspect-video"
            label="Image Element"
          />
          <SpecDetail
            num={21}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            label="Delete Button (Image)"
            note="hover 시 나타남"
          />
        </div>
      </div>
    </div>
  );
}
