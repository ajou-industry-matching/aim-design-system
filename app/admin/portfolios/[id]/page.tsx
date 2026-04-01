"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PortfolioContentEditor } from "@/components/portfolio/portfolio-content-editor";
import {
  ArrowLeft,
  FileText,
  X,
  Upload,
  ImageIcon,
  Trash2,
} from "lucide-react";

const availableTags = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Vue.js",
  "Node.js",
  "Spring Boot",
  "Python",
  "Flutter",
  "Swift",
  "Kotlin",
  "Docker",
  "AWS",
  "Firebase",
  "UI/UX",
  "AI/ML",
  "데이터 분석",
  "블록체인",
  "IoT",
  "게임 개발",
];

const getMockPortfolio = (id: string) => ({
  title: "AI 기반 학습 도우미 플랫폼",
  description:
    "인공지능을 활용하여 학생 개개인의 학습 패턴을 분석하고, 맞춤형 학습 자료를 추천하는 플랫폼입니다.",
  markdownContent:
    "## 프로젝트 소개\n\nAI 기반 학습 도우미 플랫폼은 학생 개개인의 학습 패턴을 분석하여 맞춤형 학습 자료를 추천합니다.\n\n### 주요 기능\n- 학습 패턴 분석\n- 맞춤형 자료 추천\n- 학습 진도 추적",
  tags: ["React", "TypeScript", "AI/ML", "Python"],
  thumbnailUrl: "/placeholder-thumbnail.jpg",
  videoUrl: "https://youtube.com/watch?v=example",
  githubUrl: "https://github.com/example/ai-tutor",
  attachments: [
    { name: "발표자료.pptx", size: 2048000 },
    { name: "기술문서.pdf", size: 1024000 },
  ] as { name: string; size: number }[],
});

export default function AdminPortfolioDetailPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params.id as string;

  const [formData, setFormData] = useState(getMockPortfolio(portfolioId));
  const [isEditing, setIsEditing] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    formData.thumbnailUrl || null,
  );
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("포트폴리오가 저장되었습니다.");
  };

  const handleDelete = () => {
    if (confirm("정말로 이 포트폴리오를 삭제하시겠습니까?")) {
      router.push("/admin/portfolios");
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index),
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const disabled = !isEditing;

  return (
    <div className="bg-white">
      <div className="mx-auto">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push("/admin/portfolios")}
                className="h-[40px] w-[40px]"
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
              {isEditing ? (
                <>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
                  >
                    저장
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
                  >
                    수정
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    className="border border-red-500 text-red-500 hover:bg-red-500/5 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2"
                  >
                    <Trash2 size={18} />
                    삭제
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
              기본 정보
            </h2>

            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="title"
                className="text-[16px] font-medium text-[#333]"
              >
                프로젝트 제목 *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="프로젝트 제목을 입력하세요"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={disabled}
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] disabled:bg-[#f5f5f5]"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="description"
                className="text-[16px] font-medium text-[#333]"
              >
                간단 설명 *
              </Label>
              <Textarea
                id="description"
                placeholder="프로젝트를 2-3줄로 간단히 요약해주세요"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                disabled={disabled}
                rows={3}
                className="px-4 py-3 border border-[#ccc] rounded-[8px] text-[16px] resize-none disabled:bg-[#f5f5f5]"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <Label className="text-[16px] font-medium text-[#333]">
                태그
              </Label>
              {isEditing && (
                <Select onValueChange={handleAddTag}>
                  <SelectTrigger className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] w-full">
                    <SelectValue placeholder="태그를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags.map((tag) => (
                      <SelectItem
                        key={tag}
                        value={tag}
                        disabled={formData.tags.includes(tag)}
                      >
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-full border border-[#003876]"
                    >
                      #{tag}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
              상세 내용
            </h2>
            <div className="flex flex-col gap-2">
              <Label className="text-[16px] font-medium text-[#333]">
                프로젝트 상세 설명 *
              </Label>
              {isEditing && (
                <p className="text-[14px] text-[#666]">
                  / 를 입력하여 다양한 포맷을 사용할 수 있습니다
                </p>
              )}
              <PortfolioContentEditor
                content={formData.markdownContent}
                onChange={(content) =>
                  setFormData({ ...formData, markdownContent: content })
                }
                editable={isEditing}
              />
            </div>
          </div>

          {/* Media & Links */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
              미디어 및 링크
            </h2>

            {/* Thumbnail */}
            <div className="flex flex-col gap-2">
              <Label className="text-[16px] font-medium text-[#333]">
                썸네일 이미지 *
              </Label>
              {thumbnailPreview ? (
                <Card className="relative overflow-hidden">
                  <div className="w-full h-96 bg-[#f5f5f5] flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-300" />
                  </div>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setFormData({ ...formData, thumbnailUrl: "" });
                        setThumbnailPreview(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </Card>
              ) : isEditing ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="text-[14px] text-[#666]">
                    <span className="font-semibold">클릭하여 업로드</span> 또는
                    드래그 앤 드롭
                  </p>
                  <p className="text-[12px] text-[#999] mt-1">
                    PNG, JPG (최대 10MB)
                  </p>
                </label>
              ) : (
                <div className="w-full h-64 border-2 border-dashed border-[#ccc] rounded-[8px] flex items-center justify-center">
                  <span className="text-[14px] text-[#999]">썸네일 없음</span>
                </div>
              )}
            </div>

            {/* Video URL */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="videoUrl"
                className="text-[16px] font-medium text-[#333]"
              >
                시연 영상 URL
              </Label>
              <Input
                id="videoUrl"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.videoUrl}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
                disabled={disabled}
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] disabled:bg-[#f5f5f5]"
              />
            </div>

            {/* GitHub URL */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="githubUrl"
                className="text-[16px] font-medium text-[#333]"
              >
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                disabled={disabled}
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] disabled:bg-[#f5f5f5]"
              />
            </div>

            {/* Attachments */}
            <div className="flex flex-col gap-2">
              <Label className="text-[16px] font-medium text-[#333]">
                첨부파일
              </Label>
              {isEditing && (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors">
                  <FileText className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-[14px] text-[#666]">
                    <span className="font-semibold">파일 추가</span>
                  </p>
                  <p className="text-[12px] text-[#999] mt-1">
                    PDF, DOCX, PPTX, ZIP 등
                  </p>
                </label>
              )}
              {formData.attachments.length > 0 && (
                <div className="space-y-2 mt-4 w-full">
                  {formData.attachments.map((file, index) => (
                    <Card
                      key={index}
                      className="w-full p-3 flex flex-row items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-full flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-[14px] font-medium">{file.name}</p>
                          <p className="text-[12px] text-[#999]">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAttachment(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons (bottom) */}
          {isEditing && (
            <div className="flex justify-end gap-2 pt-6 border-t border-[#e5e5e5]">
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                취소
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                저장
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
