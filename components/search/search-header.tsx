"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  query: string;
  resultCount: number;
}

/**
 * SearchHeader 컴포넌트
 * 검색 페이지 상단의 검색바와 결과 정보를 표시
 *
 * 기능:
 * - 검색어 표시
 * - 검색 결과 개수 표시
 * - 재검색 기능
 *
 * 접근성:
 * - aria-live로 결과 개수 변경 알림
 * - 검색바 레이블 제공
 */
export function SearchHeader({ query, resultCount }: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();

  // query prop이 변경되면 로컬 state 업데이트
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-[#f9f9f9]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="포트폴리오를 검색해보세요"
            className="w-full h-[50px] pl-12 pr-4 bg-[#0056b3] text-[#f9f9f9] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] rounded-full outline-none placeholder:text-[#f9f9f9] focus:ring-2 focus:ring-[#3385db] transition-shadow"
            aria-label="포트폴리오 검색"
          />
        </div>
      </form>

      {/* Search Results Info */}
      <div className="flex items-end justify-between">
        <h1 className="text-[#333] text-[40px] font-bold leading-[1.3] tracking-[-1px]">
          &quot;{query}&quot;에 대한 검색 결과
        </h1>
        <p
          className="text-[#808080] text-[18px] leading-[1.56] tracking-[-0.45px] pb-1"
          aria-live="polite"
          aria-atomic="true"
        >
          총 <span className="font-semibold text-[#004a9c]">{resultCount}</span>개
        </p>
      </div>
    </div>
  );
}
