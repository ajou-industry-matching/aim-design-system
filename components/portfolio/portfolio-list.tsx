"use client";

import { PortfolioCard } from "@/components/home/portfolio-card";
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

interface PortfolioListProps {
  portfolios: Portfolio[];
  isLoading?: boolean;
}

/**
 * PortfolioList 컴포넌트
 * 포트폴리오를 그리드 형태로 표시
 *
 * 상태:
 * - 로딩 중: Skeleton UI
 * - 빈 상태: 안내 메시지
 * - 결과 있음: PortfolioCard 그리드 (4열)
 *
 * 성능:
 * - PortfolioCard는 Link로 감싸져 있어 prefetch 지원
 *
 * 접근성:
 * - role="region"으로 포트폴리오 영역 구분
 */
export function PortfolioList({ portfolios, isLoading = false }: PortfolioListProps) {
  // 로딩 상태
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="region"
        aria-label="포트폴리오 목록 로딩 중"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="aspect-[360/203] w-full rounded-t-xl" />
            <div className="border border-t-0 border-[#e5e5e5] p-6 space-y-4 rounded-b-xl bg-white">
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

  // 포트폴리오 없음
  if (portfolios.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 px-4"
        role="status"
        aria-label="포트폴리오가 없습니다"
      >
        <div className="text-center space-y-4">
          <div className="text-[64px] mb-4">📁</div>
          <h3 className="text-[#333] text-[24px] font-bold leading-[1.33] tracking-[-0.6px]">
            포트폴리오가 없습니다
          </h3>
          <p className="text-[#666] text-[16px] leading-[1.5] tracking-[-0.4px]">
            선택한 필터에 해당하는 포트폴리오가 없습니다.<br />
            필터를 조정하거나 초기화해보세요.
          </p>
        </div>
      </div>
    );
  }

  // 포트폴리오 그리드
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="region"
      aria-label="포트폴리오 목록"
    >
      {portfolios.map((portfolio) => (
        <PortfolioCard key={portfolio.id} {...portfolio} />
      ))}
    </div>
  );
}
