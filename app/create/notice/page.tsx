"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NoticeContentEditor } from "@/components/notice/notice-content-editor";
import { FileText, X } from "lucide-react";

interface NoticeFormData {
  title: string;
  author: string;
  content: string;
  attachments: File[];
}

export default function CreateNoticePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    author: "",
    content: "",
    attachments: [],
  });

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
    console.log("Notice Data:", formData);
    alert("공지사항이 저장되었습니다! (콘솔 확인)");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] py-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Header */}
          <div>
            <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333] mb-2">
              공지사항 작성
            </h1>
            <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]">
              중요한 공지사항을 작성하고 공유하세요
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
                제목 *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="공지사항 제목을 입력하세요"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                required
              />
            </div>

            {/* Author */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="author"
                className="text-[16px] font-medium text-[#333]"
              >
                작성자 *
              </Label>
              <Input
                id="author"
                type="text"
                placeholder="작성자 이름을 입력하세요"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px]"
                required
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
              <p className="text-[14px] text-[#666]">
                / 를 입력하여 다양한 포맷을 사용할 수 있습니다
              </p>
              <NoticeContentEditor
                content={formData.content}
                onChange={(content) =>
                  setFormData({ ...formData, content: content })
                }
                editable={true}
              />
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
              <label
                htmlFor="attachments"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#ccc] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-[14px] text-[#666]">
                  <span className="font-semibold">파일 추가</span>
                </p>
                <p className="text-[12px] text-[#999] mt-1">
                  PDF, DOCX, PPTX, ZIP, 이미지 등
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
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
