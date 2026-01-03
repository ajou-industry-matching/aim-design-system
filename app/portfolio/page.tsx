"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PortfolioHorizontalFilters } from "@/components/portfolio/portfolio-horizontal-filters";
import { PortfolioFilterModal } from "@/components/portfolio/portfolio-filter-modal";
import { PortfolioPageHeader } from "@/components/portfolio/portfolio-page-header";
import { PortfolioList } from "@/components/portfolio/portfolio-list";
import { Pagination } from "@/components/ui/pagination";
import { SearchBar } from "@/components/home/search-bar";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data - 실제로는 API나 데이터베이스에서 가져옴
const mockPortfolios = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/seed/react-web/800/600",
    tags: ["#React", "#Frontend"],
    title: "React 기반 웹 애플리케이션",
    description:
      "Next.js와 TypeScript를 활용한 현대적인 웹 개발 프로젝트입니다.",
    author: "김재준",
    date: "2025.12.15.",
    likes: 45,
    comments: 23,
    views: 890,
    category: "웹 개발",
    department: "소프트웨어학과",
    type: "개인",
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/seed/uiux-design/800/600",
    tags: ["#UI/UX", "#Figma"],
    title: "반응형 디자인 시스템",
    description:
      "Figma를 활용한 일관된 UI/UX 디자인 시스템 구축 프로젝트입니다.",
    author: "이수진",
    date: "2025.12.14.",
    likes: 38,
    comments: 15,
    views: 672,
    category: "UI/UX 디자인",
    department: "미디어학과",
    type: "개인",
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/seed/ai-python/800/600",
    tags: ["#Python", "#AI"],
    title: "딥러닝 이미지 분류 모델",
    description:
      "TensorFlow와 Keras를 사용한 이미지 분류 딥러닝 프로젝트입니다.",
    author: "박민호",
    date: "2025.12.13.",
    likes: 52,
    comments: 28,
    views: 1234,
    category: "AI/ML",
    department: "소프트웨어학과",
    type: "개인",
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/seed/ai-business/800/600",
    tags: ["#기업", "#AI솔루션"],
    title: "AI 기반 고객 맞춤 추천 시스템",
    description:
      "머신러닝을 활용한 개인화 추천 엔진 개발 및 상용화 사례입니다.",
    author: "테크스타트업",
    date: "2025.12.12.",
    likes: 68,
    comments: 31,
    views: 1520,
    category: "AI/ML",
    department: "-",
    type: "기업",
  },
  {
    id: "5",
    thumbnail: "https://picsum.photos/seed/hci-vr/800/600",
    tags: ["#연구실", "#HCI"],
    title: "차세대 인간-컴퓨터 상호작용 연구",
    description:
      "VR/AR 기술을 활용한 몰입형 사용자 인터페이스 연구 프로젝트입니다.",
    author: "HCI Lab",
    date: "2025.12.11.",
    likes: 92,
    comments: 45,
    views: 2134,
    category: "UI/UX 디자인",
    department: "소프트웨어학과",
    type: "연구실",
  },
  {
    id: "6",
    thumbnail: "https://picsum.photos/seed/flutter-mobile/800/600",
    tags: ["#Flutter", "#Mobile"],
    title: "크로스 플랫폼 모바일 앱",
    description: "Flutter로 개발한 iOS/Android 동시 지원 앱 개발 사례입니다.",
    author: "최지원",
    date: "2025.12.10.",
    likes: 41,
    comments: 19,
    views: 756,
    category: "모바일 앱",
    department: "소프트웨어학과",
    type: "개인",
  },
  {
    id: "7",
    thumbnail: "https://picsum.photos/seed/blockchain-tech/800/600",
    tags: ["#기업", "#블록체인"],
    title: "NFT 마켓플레이스 플랫폼",
    description:
      "블록체인 기반 디지털 자산 거래 플랫폼 개발 및 운영 사례입니다.",
    author: "블록체인솔루션즈",
    date: "2025.12.09.",
    likes: 76,
    comments: 38,
    views: 1789,
    category: "블록체인",
    department: "-",
    type: "기업",
  },
  {
    id: "8",
    thumbnail: "https://picsum.photos/seed/robotics-ai/800/600",
    tags: ["#연구실", "#로보틱스"],
    title: "자율주행 로봇 시스템 개발",
    description: "AI와 센서 융합 기술을 활용한 실내 자율주행 로봇 연구입니다.",
    author: "Robotics Lab",
    date: "2025.12.08.",
    likes: 85,
    comments: 42,
    views: 1923,
    category: "IoT",
    department: "전자공학과",
    type: "연구실",
  },
  {
    id: "9",
    thumbnail: "https://picsum.photos/seed/unity-game/800/600",
    tags: ["#Unity", "#Game"],
    title: "3D 액션 게임 프로토타입",
    description: "Unity 엔진을 사용한 3D 액션 게임 개발 프로젝트입니다.",
    author: "윤하늘",
    date: "2025.12.07.",
    likes: 55,
    comments: 32,
    views: 1456,
    category: "게임 개발",
    department: "미디어학과",
    type: "개인",
  },
  {
    id: "10",
    thumbnail: "https://picsum.photos/seed/data-visualization/800/600",
    tags: ["#Data", "#Visualization"],
    title: "데이터 시각화 대시보드",
    description:
      "D3.js와 React를 활용한 인터랙티브 데이터 시각화 프로젝트입니다.",
    author: "정서연",
    date: "2025.12.06.",
    likes: 36,
    comments: 14,
    views: 623,
    category: "데이터 분석",
    department: "산업공학과",
    type: "개인",
  },
  {
    id: "11",
    thumbnail: "https://picsum.photos/seed/cloud-saas/800/600",
    tags: ["#기업", "#클라우드"],
    title: "클라우드 기반 SaaS 플랫폼",
    description: "AWS를 활용한 확장 가능한 B2B SaaS 솔루션 개발 사례입니다.",
    author: "클라우드이노베이션",
    date: "2025.12.05.",
    likes: 61,
    comments: 27,
    views: 1342,
    category: "웹 개발",
    department: "-",
    type: "기업",
  },
  {
    id: "12",
    thumbnail: "https://picsum.photos/seed/bigdata-network/800/600",
    tags: ["#연구실", "#빅데이터"],
    title: "소셜 네트워크 분석 연구",
    description:
      "대규모 그래프 데이터 분석 및 커뮤니티 탐지 알고리즘 연구입니다.",
    author: "Data Science Lab",
    date: "2025.12.04.",
    likes: 78,
    comments: 35,
    views: 1678,
    category: "데이터 분석",
    department: "산업공학과",
    type: "연구실",
  },
  {
    id: "13",
    thumbnail: "https://picsum.photos/seed/realtime-chat/800/600",
    tags: ["#React", "#Node.js"],
    title: "실시간 채팅 애플리케이션",
    description: "WebSocket을 활용한 실시간 메시징 플랫폼입니다.",
    author: "한별이",
    date: "2025.12.03.",
    likes: 42,
    comments: 18,
    views: 812,
    category: "웹 개발",
    department: "소프트웨어학과",
    type: "개인",
  },
  {
    id: "14",
    thumbnail: "https://picsum.photos/seed/ios-swift/800/600",
    tags: ["#Swift", "#iOS"],
    title: "iOS 네이티브 앱 개발",
    description: "Swift와 SwiftUI를 사용한 iOS 앱 개발 프로젝트입니다.",
    author: "김태양",
    date: "2025.12.02.",
    likes: 37,
    comments: 16,
    views: 698,
    category: "모바일 앱",
    department: "소프트웨어학과",
    type: "개인",
  },
  {
    id: "15",
    thumbnail: "https://picsum.photos/seed/web3-dapp/800/600",
    tags: ["#Blockchain", "#Web3"],
    title: "스마트 컨트랙트 DApp",
    description: "Ethereum 기반의 탈중앙화 애플리케이션 개발 프로젝트입니다.",
    author: "강동현",
    date: "2025.12.01.",
    likes: 48,
    comments: 21,
    views: 934,
    category: "블록체인",
    department: "소프트웨어학과",
    type: "개인",
  },
];

/**
 * PortfolioPageContent 컴포넌트
 * 포트폴리오 탐색 메인 페이지
 *
 * URL 파라미터:
 * - q: 검색어
 * - type: 유형 필터 (쉼표로 구분) - 개인, 기업, 연구실
 * - category: 카테고리 필터 (쉼표로 구분)
 * - dept: 학과 필터 (쉼표로 구분)
 * - sort: 정렬 방식 (latest, popular, views)
 * - page: 페이지 번호
 *
 * 기능:
 * - 검색어 기반 필터링
 * - 사이드바 필터링
 * - 정렬
 * - 페이지네이션
 * - URL 상태 관리
 */
function PortfolioPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 필터 상태 읽기
  const queryParam = searchParams.get("q") || "";
  const typeParam = searchParams.get("type");
  const categoryParam = searchParams.get("category");
  const deptParam = searchParams.get("dept");
  const sortParam = searchParams.get("sort") as
    | "latest"
    | "popular"
    | "views"
    | null;
  const pageParam = parseInt(searchParams.get("page") || "1");

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    typeParam ? typeParam.split(",") : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? categoryParam.split(",") : []
  );
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    deptParam ? deptParam.split(",") : []
  );
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "views">(
    sortParam || "latest"
  );
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPortfolios, setFilteredPortfolios] = useState(mockPortfolios);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const itemsPerPage = 12;

  // URL의 검색어가 변경되면 로컬 state 업데이트
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // URL 업데이트 함수
  const updateURL = (
    query: string,
    types: string[],
    categories: string[],
    departments: string[],
    sort: string,
    page: number
  ) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (types.length > 0) params.set("type", types.join(","));
    if (categories.length > 0) params.set("category", categories.join(","));
    if (departments.length > 0) params.set("dept", departments.join(","));
    if (sort !== "latest") params.set("sort", sort);
    if (page > 1) params.set("page", page.toString());

    const queryString = params.toString();
    router.push(`/portfolio${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  // 필터링 및 정렬 로직
  useEffect(() => {
    setIsLoading(true);

    // 필터링 시뮬레이션
    const timer = setTimeout(() => {
      let filtered = [...mockPortfolios];

      // 검색어 필터
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.author.toLowerCase().includes(lowerQuery) ||
            p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      }

      // 유형 필터
      if (selectedTypes.length > 0) {
        filtered = filtered.filter((p) => selectedTypes.includes(p.type));
      }

      // 카테고리 필터
      if (selectedCategories.length > 0) {
        filtered = filtered.filter((p) =>
          selectedCategories.includes(p.category)
        );
      }

      // 학과 필터 (기업/연구실은 학과가 "-"이므로 제외)
      if (selectedDepartments.length > 0) {
        filtered = filtered.filter((p) =>
          selectedDepartments.includes(p.department)
        );
      }

      // 정렬
      if (sortBy === "popular") {
        filtered.sort((a, b) => b.likes - a.likes);
      } else if (sortBy === "views") {
        filtered.sort((a, b) => b.views - a.views);
      } else {
        // 최신순 (날짜 기준)
        filtered.sort(
          (a, b) =>
            new Date(b.date.replace(/\./g, "-")).getTime() -
            new Date(a.date.replace(/\./g, "-")).getTime()
        );
      }

      setFilteredPortfolios(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    searchQuery,
    selectedTypes,
    selectedCategories,
    selectedDepartments,
    sortBy,
  ]);

  // 필터 변경 시 URL 업데이트
  useEffect(() => {
    updateURL(
      searchQuery,
      selectedTypes,
      selectedCategories,
      selectedDepartments,
      sortBy,
      currentPage
    );
  }, [
    searchQuery,
    selectedTypes,
    selectedCategories,
    selectedDepartments,
    sortBy,
    currentPage,
  ]);

  // 필터 핸들러
  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (departments: string[]) => {
    setSelectedDepartments(departments);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: "latest" | "popular" | "views") => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedDepartments([]);
    setSortBy("latest");
    setCurrentPage(1);
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
    setCurrentPage(1);
  };

  const handleRemoveDepartment = (dept: string) => {
    setSelectedDepartments(selectedDepartments.filter((d) => d !== dept));
    setCurrentPage(1);
  };

  const handleApplyFilters = (categories: string[], departments: string[]) => {
    setSelectedCategories(categories);
    setSelectedDepartments(departments);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 페이지네이션
  const totalPages = Math.ceil(filteredPortfolios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPortfolios = filteredPortfolios.slice(startIndex, endIndex);

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] py-16 px-4">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Horizontal Filters */}
        <div className="mb-8">
          <PortfolioHorizontalFilters
            selectedTypes={selectedTypes}
            selectedCategories={selectedCategories}
            selectedDepartments={selectedDepartments}
            onTypeChange={handleTypeChange}
            onRemoveCategory={handleRemoveCategory}
            onRemoveDepartment={handleRemoveDepartment}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
            onReset={handleReset}
          />
        </div>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Header */}
          <PortfolioPageHeader
            totalCount={filteredPortfolios.length}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            searchQuery={searchQuery}
          />

          {/* Portfolio Grid */}
          <PortfolioList portfolios={currentPortfolios} isLoading={isLoading} />

          {/* Pagination */}
          {!isLoading && filteredPortfolios.length > itemsPerPage && (
            <div className="flex justify-center pt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </main>

        {/* Filter Modal */}
        <PortfolioFilterModal
          open={isFilterModalOpen}
          onOpenChange={setIsFilterModalOpen}
          selectedCategories={selectedCategories}
          selectedDepartments={selectedDepartments}
          onApply={handleApplyFilters}
        />
      </div>
    </div>
  );
}

/**
 * PortfolioPage with Suspense
 * useSearchParams를 사용하므로 Suspense로 감싸야 함
 */
export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white min-h-screen">
          <div className="mx-auto max-w-[1440px] py-16 px-4">
            <Skeleton className="h-12 w-full mb-8" />
            <Skeleton className="h-16 w-full mb-8" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-96" />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <PortfolioPageContent />
    </Suspense>
  );
}
