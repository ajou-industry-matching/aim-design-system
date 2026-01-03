"use client";

import { PortfolioCard } from "@/components/home/portfolio-card";
import { EmptyState } from "./empty-state";
import { Skeleton } from "@/components/ui/skeleton";

interface Portfolio {
  id: string;
  thumbnail: string;
  tags: string[];
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  views: number;
}

interface SearchResultsProps {
  results: Portfolio[];
  isLoading?: boolean;
  query: string;
}

/**
 * SearchResults 컴포넌트
 * 검색 결과를 그리드로 표시
 *
 * 상태:
 * - 로딩 중: Skeleton UI
 * - 결과 없음: EmptyState
 * - 결과 있음: PortfolioCard 그리드
 *
 * 성능:
 * - PortfolioCard는 Link로 감싸져 있어 prefetch 지원
 *
 * 접근성:
 * - role="region"으로 검색 결과 영역 구분
 * - aria-label로 영역 설명
 */
export function SearchResults({ results, isLoading = false, query }: SearchResultsProps) {
  // 로딩 상태
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
        role="region"
        aria-label="검색 결과 로딩 중"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="aspect-[360/203] w-full rounded-t-xl" />
            <div className="border border-t-0 border-[#e5e5e5] p-6 space-y-4 rounded-b-xl">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-24" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 결과 없음
  if (results.length === 0) {
    return <EmptyState query={query} />;
  }

  // 검색 결과 표시
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      role="region"
      aria-label="검색 결과"
    >
      {results.map((portfolio) => (
        <PortfolioCard key={portfolio.id} {...portfolio} />
      ))}
    </div>
  );
}
