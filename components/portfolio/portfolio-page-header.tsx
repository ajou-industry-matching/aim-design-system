"use client";

interface PortfolioPageHeaderProps {
  totalCount: number;
  sortBy: "latest" | "popular" | "views";
  onSortChange: (sort: "latest" | "popular" | "views") => void;
  searchQuery?: string;
}

const sortOptions = [
  { label: "최신순", value: "latest" as const },
  { label: "인기순", value: "popular" as const },
  { label: "조회순", value: "views" as const },
];

/**
 * PortfolioPageHeader 컴포넌트
 * 포트폴리오 페이지 상단 헤더
 *
 * 기능:
 * - 총 포트폴리오 개수 표시
 * - 검색어 표시 (있는 경우)
 * - 정렬 옵션 (최신순, 인기순, 조회순)
 *
 * 접근성:
 * - aria-live로 개수 변경 알림
 * - 정렬 버튼 키보드 접근
 */
export function PortfolioPageHeader({
  totalCount,
  sortBy,
  onSortChange,
  searchQuery,
}: PortfolioPageHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Title and Count */}
      <div className="flex items-end justify-between">
        <h1 className="text-[#333] text-[40px] font-bold leading-[1.3] tracking-[-1px]">
          {searchQuery ? (
            <>
              &quot;{searchQuery}&quot;에 대한 검색 결과
            </>
          ) : (
            "포트폴리오 탐색"
          )}
        </h1>
        <p
          className="text-[#808080] text-[18px] leading-[1.56] tracking-[-0.45px] pb-1"
          aria-live="polite"
          aria-atomic="true"
        >
          총 <span className="font-semibold text-[#004a9c]">{totalCount}</span>개
        </p>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-3">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`h-10 px-6 py-[10px] rounded-lg text-[14px] font-medium leading-[1.43] tracking-[-0.35px] transition-colors ${
              sortBy === option.value
                ? "bg-[#004a9c] text-white"
                : "border border-[#e5e5e5] text-[#666] hover:border-[#004a9c] hover:text-[#004a9c]"
            }`}
            aria-pressed={sortBy === option.value}
            aria-label={`${option.label}으로 정렬`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
