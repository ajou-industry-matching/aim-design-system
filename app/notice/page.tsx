"use client";

import { useState } from "react";
import Link from "next/link";
import { Pagination } from "@/components/ui/pagination";

// Mock data
const mockNotices = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  number: i + 1,
  title: `Table Rowasdf`,
  date: "2025.11.13.",
  views: Math.floor(Math.random() * 1000),
}));

const ITEMS_PER_PAGE = 10;

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockNotices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNotices = mockNotices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1440px] py-20">
        <div className="flex flex-col gap-[110px] items-center w-full">
          {/* Title and Table */}
          <div className="flex flex-col gap-[60px] items-center w-full">
            {/* Page Title */}
            <h1 className="text-[#1a1a1a] text-[40px] font-bold leading-[1.3] tracking-[-1px] text-center w-full">
              공지사항
            </h1>

            {/* Table */}
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#f2f2f2] border-2 border-[#e5e5e5] border-b h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                    순번
                  </th>
                  <th className="bg-[#f2f2f2] border-2 border-[#e5e5e5] border-b border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                    제목
                  </th>
                  <th className="bg-[#f2f2f2] border-2 border-[#e5e5e5] border-b border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                    등록일
                  </th>
                  <th className="bg-[#f2f2f2] border-2 border-[#e5e5e5] border-b border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentNotices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                      {notice.number}
                    </td>
                    <td className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4">
                      <Link
                        href={`/notice/${notice.id}`}
                        className="text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] hover:text-[#004a9c] block"
                      >
                        {notice.title}
                      </Link>
                    </td>
                    <td className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                      {notice.date}
                    </td>
                    <td className="bg-white border border-[#e5e5e5] border-t-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                      {notice.views}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
