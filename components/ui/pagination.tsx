"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxVisiblePages = 9;

  // Calculate page range to display
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust start if we're near the end
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 h-10 px-4 py-[10px] rounded-md ${
          currentPage === 1
            ? "text-[#ccc] cursor-not-allowed"
            : "text-[#666] hover:bg-gray-50"
        }`}
      >
        <ChevronLeft className={`w-4 h-4 ${currentPage === 1 ? "opacity-30" : ""}`} />
        <span className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
          이전
        </span>
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-md text-[14px] font-medium leading-[1.43] tracking-[-0.35px] transition-colors ${
            page === currentPage
              ? "bg-[#004a9c] text-white"
              : "bg-white border border-[#e5e5e5] text-[#666] hover:border-[#004a9c]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 h-10 px-4 py-[10px] rounded-md ${
          currentPage === totalPages
            ? "text-[#ccc] cursor-not-allowed"
            : "bg-white text-[#666] hover:bg-gray-50"
        }`}
      >
        <span className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px]">
          다음
        </span>
        <ChevronRight className={`w-4 h-4 ${currentPage === totalPages ? "opacity-30" : ""}`} />
      </button>
    </div>
  );
}
