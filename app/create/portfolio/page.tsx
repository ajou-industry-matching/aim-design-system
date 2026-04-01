"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PortfolioContentEditor } from "@/components/portfolio/portfolio-content-editor";
import { FileText, X, Upload, ImageIcon } from "lucide-react";

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

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: "",
    description: "",
    markdownContent: "",
    tags: [],
    thumbnail: null,
    images: [],
    videoUrl: "",
    githubUrl: "",
    attachments: [],
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

  const availableTags = [
    "React", "TypeScript", "JavaScript", "Next.js", "Vue.js",
    "Node.js", "Spring Boot", "Python", "Flutter", "Swift",
    "Kotlin", "Docker", "AWS", "Firebase", "UI/UX",
    "AI/ML", "데이터 분석", "블록체인", "IoT", "게임 개발",
  ];

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData({ ...formData, images: [...formData.images, ...files] });

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagesPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagesPreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagesPreviews(newPreviews);
  };

  const handleAttachmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...files],
      });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: newAttachments });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Portfolio Data:", formData);
    alert("포트폴리오가 저장되었습니다! (콘솔 확인)");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] py-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Header */}
          <div>
            <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333] mb-2">
              포트폴리오 작성
            </h1>
            <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]">
              프로젝트를 공유하고 다른 사람들과 소통하세요
            </p>
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
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                required
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
                rows={3}
                className="px-4 py-3 border border-[#ccc] rounded-[8px] text-[16px] resize-none"
                required
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="tags"
                className="text-[16px] font-medium text-[#333]"
              >
                태그
              </Label>
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
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1 bg-[#f0f0f0] text-[#333] rounded-full border border-[#003876]"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </button>
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
              <p className="text-[14px] text-[#666]">
                / 를 입력하여 다양한 포맷을 사용할 수 있습니다
              </p>
              <PortfolioContentEditor
                content={formData.markdownContent}
                onChange={(content) =>
                  setFormData({ ...formData, markdownContent: content })
                }
                editable={true}
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
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-96 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setFormData({ ...formData, thumbnail: null });
                      setThumbnailPreview(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </Card>
              ) : (
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="text-[14px] text-[#666]">
                    <span className="font-semibold">클릭하여 업로드</span> 또는
                    드래그 앤 드롭
                  </p>
                  <p className="text-[12px] text-[#999] mt-1">
                    PNG, JPG (최대 10MB)
                  </p>
                  <input
                    id="thumbnail"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                </label>
              )}
            </div>

            {/* Additional Images */}
            <div className="flex flex-col gap-2">
              <Label className="text-[16px] font-medium text-[#333]">
                추가 이미지
              </Label>
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-[14px] text-[#666]">
                  <span className="font-semibold">이미지 추가</span>
                </p>
                <input
                  id="images"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
              </label>

              {imagesPreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {imagesPreviews.map((preview, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden group"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="object-cover aspect-video"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
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
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
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
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
              />
            </div>

            {/* Attachments */}
            <div className="flex flex-col gap-2">
              <Label className="text-[16px] font-medium text-[#333]">
                첨부파일
              </Label>
              <label
                htmlFor="attachments"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-[14px] text-[#666]">
                  <span className="font-semibold">파일 추가</span>
                </p>
                <p className="text-[12px] text-[#999] mt-1">
                  PDF, DOCX, PPTX, ZIP 등
                </p>
                <input
                  id="attachments"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleAttachmentsChange}
                />
              </label>

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
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-[#e5e5e5]">
            <Button
              type="button"
              onClick={() => router.back()}
              className="h-[48px] px-8 bg-white border border-[#ccc] text-[#666] hover:bg-gray-50 rounded-[8px] text-[16px] font-medium"
            >
              취소
            </Button>
            <Button
              type="submit"
              className="h-[48px] px-8 bg-[#004a9c] hover:bg-[#004a9c]/90 text-white rounded-[8px] text-[16px] font-medium"
            >
              저장하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
