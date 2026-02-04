"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ExternalLink,
  FileText,
  Download,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

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
  <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-600 text-white rounded-full text-[11px] font-bold ml-2 z-50 relative">
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
          <span className="text-purple-200 text-[11px] font-normal">{note}</span>
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

export default function PortfolioDetailPageFigma() {
  const [activeTab, setActiveTab] = useState("intro");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(193);

  // Mock Data
  const portfolio = {
    title: "EveryQuest",
    description: `EveryQuest는 FC온라인 공경 매칭된 유저를 빠르게 요약해주고, 이기기 위한 맞춤형 퀘스트를 제공합니다.`,
    thumbnail: "https://picsum.photos/id/119/800/600",
    videoUrl: "https://youtube.com/watch?v=example",
    githubUrl: "https://github.com/example/everyquest",
    tags: ["React", "Frontend"],
  };

  const MOCK_ATTACHMENTS = [
    {
      id: "1",
      name: "프로젝트_발표자료.pdf",
      size: "2.5 MB",
      type: "PDF",
      uploadedAt: "2024-01-15",
    },
  ];

  const MOCK_COMMENTS = [
    {
      id: "1",
      author: {
        name: "이영희",
        avatar: "/placeholder-user.jpg",
        department: "미디어학과",
      },
      content: "정말 인상적인 프로젝트네요! 추천 알고리즘 부분이 특히 흥미롭습니다.",
      createdAt: "2024-01-18",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 border-b-4 border-purple-700 shadow-lg">
        <h2 className="text-white font-bold text-xl">
          🎨 Design Spec: 포트폴리오 상세 페이지
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
          <div className="bg-white min-h-screen relative">
             <SpecBadge num={0} />
            {/* Header Section */}
            <div className="mx-auto max-w-[1440px] py-20 px-6">
               <SpecBadge num={1} />
              <div className="flex flex-col gap-10">
                {/* Like Button */}
                <div className="flex justify-end">
                  <button
                    className={`flex items-center gap-[6px] h-8 px-4 py-[6px] rounded-full border transition-colors border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5`}
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
                      {likes}
                      <SpecBadge num={18} />
                    </span>
                  </button>
                   <SpecBadge num={2} />
                </div>

                {/* Main Content */}
                <div className="flex gap-10">
                  {/* Thumbnail */}
                  <div className="relative h-[383px] w-[680px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                     <SpecBadge num={3} />
                    <div className="w-full h-full flex items-center justify-center text-gray-400">Thumbnail Image</div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col justify-between h-[375px] flex-1">
                    <div className="flex flex-col gap-5">
                      {/* Title */}
                      <h1 className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#333]">
                        {portfolio.title}
                         <SpecBadge num={4} />
                      </h1>

                      {/* Description */}
                      <div className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] whitespace-pre-line">
                        {portfolio.description}
                         <SpecBadge num={5} />
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-[6px] h-8 px-4 py-[6px] rounded-full border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5 transition-colors">
                        <span className="text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
                          시연영상
                          <SpecBadge num={19} />
                        </span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                       <SpecBadge num={6} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-20 z-50 bg-white border-b shadow-sm">
               <SpecBadge num={7} />
              <div className="mx-auto max-w-[1440px] px-6">
                <div className="flex h-14">
                  <button
                    className={`flex-1 flex items-center justify-center px-6 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] border-b-2 border-[#004a9c] text-[#666]`}
                  >
                    포트폴리오 소개
                     <SpecBadge num={8} />
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center px-6 py-3 text-[14px] font-medium leading-[1.43] tracking-[-0.35px] border-b-2 border-[#e5e5e5] text-[#666]`}
                  >
                    첨부파일
                  </button>
                  <button
                    className={`flex-1 flex items-center justify-center px-6 py-3 text-[14px] font-medium leading-[1.43] tracking-[-0.35px] border-b-2 border-[#e5e5e5] text-[#666]`}
                  >
                    댓글
                  </button>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="mx-auto max-w-[1440px] px-6 pb-20">
              <div className="flex flex-col gap-[80px]">
                {/* Portfolio Introduction Section */}
                <div className="flex flex-col gap-10 pt-[60px]">
                   <SpecBadge num={9} />
                  <div className="flex flex-col gap-5">
                    <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                      포트폴리오
                       <SpecBadge num={10} />
                    </h2>
                     <div className="p-4 border rounded bg-gray-50 min-h-[100px] text-gray-500">
                        Markdown Content Viewer
                     </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                      태그
                    </h2>
                    <div className="flex gap-2">
                      {portfolio.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center justify-center px-3 py-1 rounded-xl border border-[#003876] text-[#003876] text-[12px] font-medium leading-[1.33] tracking-[-0.3px]"
                        >
                          #{tag}
                        </span>
                      ))}
                       <SpecBadge num={11} />
                    </div>
                  </div>
                </div>

                {/* Attachments Section */}
                <div className="flex flex-col gap-5 pt-[60px]">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    첨부파일
                  </h2>
                   <div className="flex flex-col gap-3">
                    {MOCK_ATTACHMENTS.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#004a9c]" />
                          <div className="flex flex-col">
                            <span className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px] text-[#333]">
                              {file.name}
                              <SpecBadge num={20} />
                            </span>
                            <span className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999]">
                              {file.size} · {file.uploadedAt}
                              <SpecBadge num={21} />
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#004a9c] hover:bg-[#004a9c]/5"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                     <SpecBadge num={12} />
                  </div>
                </div>

                {/* Comments Section */}
                <div className="flex flex-col gap-5 pt-[60px]">
                  <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                    댓글 {MOCK_COMMENTS.length}
                  </h2>

                  {/* Comment Form */}
                  <form className="flex flex-col gap-3">
                    <Textarea
                      placeholder="댓글을 입력하세요..."
                      rows={3}
                      className="resize-none"
                    />
                    <div className="flex justify-end">
                      <Button
                        disabled
                        className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white gap-2"
                      >
                        <Send className="h-4 w-4" />
                        댓글 등록
                         <SpecBadge num={22} />
                      </Button>
                    </div>
                  </form>
                   <SpecBadge num={13} />

                  {/* Comments List */}
                   <div className="flex flex-col gap-4">
                      {MOCK_COMMENTS.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex gap-3 p-4 border border-[#e5e5e5] rounded-lg"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[14px] text-[#333]">
                                {comment.author.name}
                                <SpecBadge num={15} />
                              </span>
                              <span className="text-[12px] text-[#999]">
                                {comment.author.department}
                                <SpecBadge num={16} />
                              </span>
                              <span className="text-[12px] text-[#999]">
                                ·{" "}
                                {new Date(comment.createdAt).toLocaleDateString(
                                  "ko-KR"
                                )}
                              </span>
                            </div>
                            <p className="text-[14px] leading-[1.5] tracking-[-0.35px] text-[#666]">
                              {comment.content}
                              <SpecBadge num={17} />
                            </p>
                          </div>
                        </div>
                      ))}
                       <SpecBadge num={14} />
                    </div>
                </div>
              </div>
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
            className="bg-white min-h-screen"
            label="Page Background"
          />
          <SpecDetail
            num={1}
            className="mx-auto max-w-[1440px] py-20 px-6"
            label="Header Container"
          />
          <SpecDetail
            num={2}
            className="flex items-center gap-[6px] h-8 px-4 py-[6px] rounded-full border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5"
            label="Like Button (Container)"
          />
          <SpecDetail
            num={18}
            className="text-[12px] font-medium leading-[1.33] tracking-[-0.3px]"
            label="Like Button Text"
          />
          <SpecDetail
            num={3}
            className="relative h-[383px] w-[680px] rounded-xl overflow-hidden flex-shrink-0"
            label="Thumbnail Image"
          />
          <SpecDetail
            num={4}
            className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#333]"
            label="Project Title"
          />
          <SpecDetail
            num={5}
            className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] whitespace-pre-line"
            label="Project Description"
          />
          <SpecDetail
            num={6}
            className="flex items-center gap-[6px] h-8 px-4 py-[6px] rounded-full border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5"
            label="External Link Button (Container)"
          />
          <SpecDetail
            num={19}
            className="text-[12px] font-medium leading-[1.33] tracking-[-0.3px]"
            label="External Link Text"
          />
          <SpecDetail
            num={7}
            className="sticky top-20 z-50 bg-white border-b shadow-sm"
            label="Sticky Tabs Bar"
          />
          <SpecDetail
            num={8}
            className="flex-1 flex items-center justify-center px-6 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] border-b-2 border-[#004a9c] text-[#666]"
            label="Active Tab Item"
          />
          <SpecDetail
            num={9}
            className="flex flex-col gap-10 pt-[60px]"
            label="Content Section"
          />
          <SpecDetail
            num={10}
            className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]"
            label="Section Title"
          />
          <SpecDetail
            num={11}
            className="flex items-center justify-center px-3 py-1 rounded-xl border border-[#003876] text-[#003876] text-[12px] font-medium leading-[1.33] tracking-[-0.3px]"
            label="Tag Badge"
          />
          <SpecDetail
            num={12}
            className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-lg hover:bg-gray-50 transition-colors"
            label="Attachment Item (Container)"
          />
          <SpecDetail
            num={20}
            className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px] text-[#333]"
            label="Attachment Name"
          />
          <SpecDetail
            num={21}
            className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999]"
            label="Attachment Meta"
          />
          <SpecDetail
            num={13}
            className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white gap-2"
            label="Submit Button (Container)"
          />
          <SpecDetail
            num={22}
            className="text-[16px] font-medium leading-[1.5] tracking-[-0.4px]"
            label="Submit Button Text"
            note="Assuming generic button text styles"
          />
          <SpecDetail
            num={14}
            className="flex gap-3 p-4 border border-[#e5e5e5] rounded-lg"
            label="Comment Item (Container)"
          />
          <SpecDetail
            num={15}
            className="font-semibold text-[14px] text-[#333]"
            label="Comment Author"
          />
          <SpecDetail
            num={16}
            className="text-[12px] text-[#999]"
            label="Comment Meta (Dept/Date)"
          />
          <SpecDetail
            num={17}
            className="text-[14px] leading-[1.5] tracking-[-0.35px] text-[#666]"
            label="Comment Body"
          />
        </div>
      </div>
    </div>
  );
}
