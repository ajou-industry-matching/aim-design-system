"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchHeader } from "@/components/search/search-header";
import { SearchResults } from "@/components/search/search-results";
import { ExploreFilters } from "@/components/explore/explore-filters";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data - 실제로는 API나 데이터베이스에서 가져옴
const mockPortfolios = [
  {
    id: "1",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#React", "#Frontend"],
    title: "React 기반 웹 애플리케이션",
    description: "Next.js와 TypeScript를 활용한 현대적인 웹 개발 프로젝트입니다.",
    author: "김재준",
    date: "2025.11.03.",
    likes: 12,
    comments: 4433,
    views: 234,
  },
  {
    id: "2",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#웹개발", "#UI/UX"],
    title: "반응형 포트폴리오 웹사이트",
    description: "모바일 퍼스트 접근으로 설계된 포트폴리오 사이트입니다.",
    author: "이수진",
    date: "2025.11.02.",
    likes: 24,
    comments: 12,
    views: 456,
  },
  {
    id: "3",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#Node.js", "#Backend"],
    title: "RESTful API 서버 구축",
    description: "Express.js를 사용한 확장 가능한 API 서버 개발 프로젝트입니다.",
    author: "박민호",
    date: "2025.11.01.",
    likes: 18,
    comments: 8,
    views: 321,
  },
  {
    id: "4",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#Python", "#AI/ML"],
    title: "머신러닝 이미지 분류기",
    description: "TensorFlow를 활용한 이미지 분류 딥러닝 모델입니다.",
    author: "최지원",
    date: "2025.10.30.",
    likes: 35,
    comments: 15,
    views: 678,
  },
  {
    id: "5",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#모바일", "#Flutter"],
    title: "크로스 플랫폼 모바일 앱",
    description: "Flutter로 개발한 iOS/Android 동시 지원 앱입니다.",
    author: "정서연",
    date: "2025.10.28.",
    likes: 28,
    comments: 10,
    views: 543,
  },
  {
    id: "6",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#React", "#TypeScript"],
    title: "타입세이프 웹 개발",
    description: "TypeScript를 활용한 안정적인 프론트엔드 개발 사례입니다.",
    author: "강동현",
    date: "2025.10.25.",
    likes: 31,
    comments: 18,
    views: 789,
  },
  {
    id: "7",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#블록체인", "#Web3"],
    title: "스마트 컨트랙트 DApp",
    description: "Ethereum 기반의 탈중앙화 애플리케이션입니다.",
    author: "윤하늘",
    date: "2025.10.23.",
    likes: 42,
    comments: 22,
    views: 891,
  },
  {
    id: "8",
    thumbnail: "/assets/thumbnail.png",
    tags: ["#데이터분석", "#Visualization"],
    title: "데이터 시각화 대시보드",
    description: "D3.js와 React를 활용한 인터랙티브 데이터 시각화입니다.",
    author: "송민지",
    date: "2025.10.20.",
    likes: 26,
    comments: 14,
    views: 612,
  },
];

/**
 * SearchPage 컴포넌트
 * 포트폴리오 검색 결과 페이지
 *
 * URL 파라미터:
 * - q: 검색어
 * - page: 페이지 번호 (선택적)
 *
 * 기능:
 * - 검색어 기반 포트폴리오 필터링
 * - 카테고리/학과 필터링
 * - 정렬 (최신순, 인기순, 조회순)
 * - 페이지네이션
 *
 * 접근성:
 * - 검색 결과는 aria-live로 변경 알림
 * - 키보드 네비게이션 지원
 */
function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(mockPortfolios);

  // 검색 실행 (실제로는 API 호출)
  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    // API 호출 시뮬레이션
    const timer = setTimeout(() => {
      // 간단한 검색 필터링 (실제로는 서버에서 처리)
      const filtered = mockPortfolios.filter(
        (portfolio) =>
          portfolio.title.toLowerCase().includes(query.toLowerCase()) ||
          portfolio.description.toLowerCase().includes(query.toLowerCase()) ||
          portfolio.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );

      setResults(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, page]);

  // 검색어가 없으면 에러 상태 또는 리다이렉트
  if (!query) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold text-[#333] mb-4">
          검색어를 입력해주세요
        </h1>
        <p className="text-[#666]">
          메인 페이지의 검색바에서 원하는 포트폴리오를 검색해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] py-16 px-4">
        {/* Search Header */}
        <SearchHeader query={query} resultCount={results.length} />

        {/* Main Content */}
        <div className="mt-16 space-y-8">
          {/* Filters */}
          <ExploreFilters />

          {/* Results */}
          <SearchResults results={results} isLoading={isLoading} query={query} />

          {/* Pagination - 결과가 많을 때만 표시 */}
          {!isLoading && results.length > 12 && (
            <div className="flex justify-center mt-12">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(results.length / 12)}
                onPageChange={(newPage) => {
                  // URL 업데이트
                  const url = new URL(window.location.href);
                  url.searchParams.set("page", newPage.toString());
                  window.history.pushState({}, "", url);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * SearchPage with Suspense
 * useSearchParams를 사용하므로 Suspense로 감싸야 함
 */
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-16">
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
