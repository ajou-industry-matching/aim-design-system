"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  query: string;
}

/**
 * EmptyState 컴포넌트
 * 검색 결과가 없을 때 표시되는 컴포넌트
 *
 * 접근성:
 * - aria-label로 상태 설명
 * - 키보드 네비게이션 지원
 */
export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4"
      role="status"
      aria-label={`${query}에 대한 검색 결과가 없습니다`}
    >
      {/* Icon */}
      <div className="mb-6 rounded-full bg-[#f2f2f2] p-6">
        <SearchX className="h-16 w-16 text-[#808080]" strokeWidth={1.5} />
      </div>

      {/* Message */}
      <h3 className="text-[#333] text-[32px] font-bold leading-[1.375] tracking-[-0.8px] mb-3 text-center">
        &quot;{query}&quot;에 대한 검색 결과가 없습니다
      </h3>

      {/* Suggestions */}
      <div className="text-[#666] text-[16px] leading-[1.5] tracking-[-0.4px] mb-8 text-center space-y-2">
        <p>다른 검색어로 시도해보세요</p>
        <p className="text-[14px] text-[#808080]">
          • 철자가 정확한지 확인해주세요<br />
          • 더 일반적인 검색어를 사용해보세요<br />
          • 키워드를 줄여보세요
        </p>
      </div>

      {/* CTA Button */}
      <Link href="/explore">
        <Button
          className="h-12 px-8 bg-[#004a9c] hover:bg-[#0056b3] text-white text-[16px] font-medium rounded-lg"
          aria-label="전체 포트폴리오 탐색 페이지로 이동"
        >
          전체 포트폴리오 보기
        </Button>
      </Link>
    </div>
  );
}
