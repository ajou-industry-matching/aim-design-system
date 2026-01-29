"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Search, Plus } from "lucide-react";

// Mock data
const mockNotices = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  number: i + 1,
  title: `공지사항 ${i + 1}`,
  date: new Date(2025, 0, 20 - (i % 20)).toLocaleDateString("ko-KR"),
  views: 100 + ((i * 23) % 900),
  author: "관리자",
}));

const ITEMS_PER_PAGE = 10;

export default function AdminNoticesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotices = mockNotices.filter((notice) =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNotices = filteredNotices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleRowClick = (id: string) => {
    router.push(`/create/notice?edit=${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-bold text-[#111]">공지사항 관리</h1>
          <p className="text-[14px] text-[#666]">
            공지사항을 작성하고 관리할 수 있습니다.
          </p>
        </div>
        <Button
          onClick={() => router.push("/create/notice")}
          className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2"
        >
          <Plus size={18} />
          공지사항 작성
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
          <Input
            placeholder="제목 검색..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full border-collapse">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                순번
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                제목
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                작성자
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                등록일
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                조회수
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentNotices.map((notice) => (
              <TableRow
                key={notice.id}
                onClick={() => handleRowClick(notice.id)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {notice.number}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                  {notice.title}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {notice.author}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {notice.date}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {notice.views}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredNotices.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
