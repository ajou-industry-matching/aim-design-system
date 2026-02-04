"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NoticeContentEditor } from "@/components/notice/notice-content-editor";
import { ArrowLeft, Trash2, FileText, X } from "lucide-react";

interface NoticeFormData {
  title: string;
  author: string;
  content: string;
  attachments: File[];
}

// Mock function to get notice data
const getNotice = (id: string) => {
  return {
    id,
    title: `공지사항 ${id}`,
    author: "관리자",
    content: `<h1>공지사항 ${id}</h1><p>공지사항 내용입니다.</p>`,
    attachments: [],
  };
};

export default function AdminNoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noticeId = params.id as string;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<NoticeFormData>({
    title: "",
    author: "",
    content: "",
    attachments: [],
  });

  // Load existing notice data
  useEffect(() => {
    const existingNotice = getNotice(noticeId);
    setFormData({
      title: existingNotice.title,
      author: existingNotice.author,
      content: existingNotice.content,
      attachments: existingNotice.attachments || [],
    });
  }, [noticeId]);

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

  const handleSave = () => {
    // TODO: API 호출로 공지사항 업데이트
    setIsEditing(false);
    alert("공지사항이 수정되었습니다.");
  };

  const handleDelete = () => {
    if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      // TODO: API 호출로 공지사항 삭제
      router.push("/admin/notices");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-10">
        {/* Admin Header with Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/admin/notices")}
              className="h-[40px] w-[40px]"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="font-bold text-[40px] leading-[1.3] tracking-[-1px] text-[#333]">
                공지사항 수정
              </h1>
              <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]">
                공지사항을 수정하세요
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
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                수정
              </Button>
            )}
            <Button
              onClick={handleDelete}
              variant="outline"
              className="border border-red-500 text-red-500 hover:bg-red-500/5 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2"
            >
              <Trash2 size={18} />
              삭제
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-10">
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
                disabled={!isEditing}
                className={`h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] ${!isEditing ? "bg-[#f5f5f5]" : ""}`}
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
                disabled={!isEditing}
                className={`h-[48px] px-4 border border-[#ccc] rounded-[8px] text-[16px] ${!isEditing ? "bg-[#f5f5f5]" : ""}`}
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
              {isEditing && (
                <p className="text-[14px] text-[#666]">
                  / 를 입력하여 다양한 포맷을 사용할 수 있습니다
                </p>
              )}
              <NoticeContentEditor
                content={formData.content}
                onChange={(content) =>
                  setFormData({ ...formData, content: content })
                }
                editable={isEditing}
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
              {isEditing && (
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
              )}

              {formData.attachments.length > 0 ? (
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
              ) : (
                !isEditing && (
                  <p className="text-[14px] text-[#666]">
                    첨부파일이 없습니다.
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
