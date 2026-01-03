"use client";

import { FeatureCard } from "@/components/home/feature-card";
import { PortfolioCard } from "@/components/home/portfolio-card";
import { NoticeCard } from "@/components/home/notice-card";
import { SearchBar } from "@/components/home/search-bar";
import Link from "next/link";
import { useState } from "react";

// Mock data
const mockPortfolios = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/id/24/800/600",
    tags: ["#React", "#Frontend"],
    title: "모던 웹 애플리케이션",
    description: "최신 React와 TypeScript를 활용한 반응형 웹 개발 프로젝트",
    author: "김재준",
    date: "2025.11.03.",
    likes: 12,
    comments: 4433,
    views: 234,
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/id/160/800/600",
    tags: ["#IoT", "#SmartHome"],
    title: "스마트홈 제어 시스템",
    description: "IoT 기기 통합 관리를 위한 모바일 애플리케이션",
    author: "이서연",
    date: "2025.11.01.",
    likes: 25,
    comments: 18,
    views: 456,
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/id/0/800/600",
    tags: ["#AI", "#MachineLearning"],
    title: "AI 기반 학습 도우미",
    description: "머신러닝을 활용한 개인화된 학습 추천 시스템",
    author: "박민준",
    date: "2025.10.28.",
    likes: 34,
    comments: 22,
    views: 678,
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/id/326/800/600",
    tags: ["#Design", "#UIUX"],
    title: "디자인 시스템 구축",
    description: "재사용 가능한 UI 컴포넌트 라이브러리 개발",
    author: "최하은",
    date: "2025.10.25.",
    likes: 42,
    comments: 15,
    views: 891,
  },
];

const mockNotices = [
  {
    id: "1",
    badge: "대외활동",
    title: "국제 암호포럼 공지사항",
    description: "국제 암호포럼....",
    author: "김재준",
    date: "2025.11.03.",
    likes: 12,
    comments: 5,
    views: 234,
  },
  {
    id: "2",
    badge: "공지",
    title: "국제 암호포럼 공지사항",
    description: "국제 암호포럼....",
    author: "김재준",
    date: "2025.11.03.",
    likes: 12,
    comments: 5,
    views: 234,
  },
  {
    id: "3",
    badge: "안내",
    title: "국제 암호포럼 공지사항",
    description: "국제 암호포럼....",
    author: "김재준",
    date: "2025.11.03.",
    likes: 12,
    comments: 5,
    views: 234,
  },
  {
    id: "4",
    badge: "행사",
    title: "국제 암호포럼 공지사항",
    description: "국제 암호포럼....",
    author: "김재준",
    date: "2025.11.03.",
    likes: 12,
    comments: 5,
    views: 234,
  },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("전체보기");

  const filters = ["개인", "기업", "연구실"];

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] py-[90px]">
        {/* Hero Section */}
        <div className="flex flex-col gap-[75px]">
          {/* Feature Cards */}
          <div className="grid grid-cols-4 gap-[10px]">
            <FeatureCard variant="portfolio" />
            <FeatureCard variant="feature" />
            <FeatureCard variant="academic" />
            <FeatureCard variant="career" />
          </div>

          {/* Search Bar */}
          <SearchBar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-[60px] mt-[75px]">
          {/* New Portfolios Section */}
          <section>
            <h2 className="text-[#333] text-[40px] font-bold leading-[1.3] tracking-[-1px] mb-[72px]">
              새로 올라온 포트폴리오
            </h2>
            <div className="grid grid-cols-4 gap-[10px]">
              {mockPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} {...portfolio} />
              ))}
            </div>
          </section>

          {/* Community Section */}
          <section>
            <h2 className="text-[#333] text-[40px] font-bold leading-[1.3] tracking-[-1px] mb-[72px]">
              아주대학교와 함께하세요.
            </h2>

            {/* Filters */}
            <div className="flex items-center gap-[16px] mb-20">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`h-10 px-6 py-[10px] rounded-lg text-[14px] font-medium leading-[1.43] tracking-[-0.35px] transition-colors ${
                    activeFilter === filter
                      ? "bg-[#004a9c] text-white"
                      : "border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="flex flex-col gap-[10px]">
              <div className="grid grid-cols-4 gap-[10px]">
                {mockPortfolios.map((portfolio) => (
                  <PortfolioCard key={`row1-${portfolio.id}`} {...portfolio} />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-[10px]">
                {mockPortfolios.map((portfolio) => (
                  <PortfolioCard key={`row2-${portfolio.id}`} {...portfolio} />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-[10px]">
                {mockPortfolios.map((portfolio) => (
                  <PortfolioCard key={`row3-${portfolio.id}`} {...portfolio} />
                ))}
              </div>
            </div>
          </section>

          {/* Notices Section */}
          <section>
            <div className="flex items-end justify-between mb-[92px]">
              <h2 className="text-[#333] text-[40px] font-bold leading-[1.3] tracking-[-1px]">
                공지사항
              </h2>
              <Link
                href="/notice"
                className="text-[#808080] text-[16px] leading-[1.5] tracking-[-0.4px] hover:text-[#666]"
              >
                더보기
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-[10px]">
              {mockNotices.map((notice) => (
                <NoticeCard key={notice.id} {...notice} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
