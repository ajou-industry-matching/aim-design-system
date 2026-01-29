"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NoticeContentEditor } from "@/components/notice/notice-content-editor";
import { Pencil, Trash2 } from "lucide-react";

// Mock function to get notice data
const getNotice = (id: string) => {
  return {
    id,
    title: "[공지] 국제 암호포럼 공지사항",
    date: "2025.11.11.",
    author: "김재준",
    content: `<h1>안녕하세요 국제 암호 포럼</h1><p>공지사항 올려드립니다.</p><p></p><p>예시 텍스트 입니다.</p><p></p><p>텍스트가 길어지면 화면 height도 증가 됩니다.</p>`,
    attachment: "홍보포스터.jpg",
  };
};

export default function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const notice = getNotice(id);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Check admin mode from localStorage on mount
  useEffect(() => {
    const adminMode = localStorage.getItem("isAdminMode");
    setIsAdminMode(adminMode === "true");
  }, []);

  const handleEdit = () => {
    // TODO: 공지사항 수정 페이지로 이동 (edit 모드로)
    router.push(`/create/notice?edit=${id}`);
  };

  const handleDelete = () => {
    if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      // TODO: API 호출로 공지사항 삭제
      alert("공지사항이 삭제되었습니다.");
      router.push("/notice");
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1440px] py-20">
        <div className="flex flex-col gap-10 items-center w-full">
          {/* Content */}
          <div className="flex flex-col gap-[60px] items-center w-full">
            {/* Page Title */}
            <h1 className="text-[#1a1a1a] text-[40px] font-bold leading-[1.3] tracking-[-1px] text-center w-full">
              공지사항
            </h1>

            {/* Notice Content */}
            <table className="w-full border-collapse">
              <tbody>
                {/* Title Header */}
                <tr>
                  <td
                    colSpan={4}
                    className="bg-[#f2f2f2] border-2 border-[#e5e5e5] border-b border-x-0 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center"
                  >
                    {notice.title}
                  </td>
                </tr>

                {/* Meta Information */}
                <tr>
                  {/* Date */}
                  <td className="bg-[#f2f2f2] border border-[#e5e5e5] border-t-0 border-x-0 h-12 px-5 py-3 w-[180px] text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px]">
                    작성일
                  </td>
                  <td className="bg-white border border-[#e5e5e5] border-t-0 border-x-0 h-12 px-5 py-3 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                    {notice.date}
                  </td>

                  {/* Author */}
                  <td className="bg-[#f2f2f2] border border-[#e5e5e5] border-t-0 border-x-0 h-12 px-5 py-3 w-[180px] text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px]">
                    작성자
                  </td>
                  <td className="bg-white border border-[#e5e5e5] border-t-0 h-12 border-x-0 px-5 py-3 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                    {notice.author}
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td
                    colSpan={4}
                    className="bg-white border border-[#e5e5e5] border-t-0 border-x-0 px-5 py-3 min-h-[400px] align-top"
                  >
                    <NoticeContentEditor
                      content={notice.content}
                      editable={false}
                    />
                  </td>
                </tr>

                {/* File Attachment */}
                {notice.attachment && (
                  <tr>
                    <td className="bg-[#f2f2f2] border border-[#e5e5e5] border-t-0 border-x-0 border-l-0 h-12 px-5 py-3 w-[180px] text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px]">
                      파일첨부
                    </td>
                    <td
                      colSpan={3}
                      className="bg-white border border-[#e5e5e5] border-t-0 border-x-0 h-12 px-5 py-3"
                    >
                      <a
                        href="#"
                        className="text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] underline hover:text-[#004a9c]"
                      >
                        {notice.attachment}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/notice")}
              className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-12 w-[150px] rounded-lg px-8 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.4px]"
            >
              목록
            </Button>
            {isAdminMode && (
              <>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5 h-12 rounded-lg px-6 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] gap-2"
                >
                  <Pencil size={18} />
                  수정
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="outline"
                  className="border border-red-500 text-red-500 hover:bg-red-500/5 h-12 rounded-lg px-6 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] gap-2"
                >
                  <Trash2 size={18} />
                  삭제
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
