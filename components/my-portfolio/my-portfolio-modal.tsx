"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Check, Plus, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/** 크롤링된 프로젝트에 부여되는 이수 구분 태그 */
const PROJECT_CATEGORIES = [
  "소프트웨어",
  "사이버보안",
  "AI융합",
  "미디어",
  "자기주도연구",
  "자기주도프로젝트",
] as const;

type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

interface CrawledProject {
  id: string;
  thumbnail: string;
  title: string;
  category: ProjectCategory;
  /** 이미 내 포트폴리오로 복사된 프로젝트 여부 */
  isImported: boolean;
}

/**
 * 목업 데이터
 * TODO: 크롤링 데이터 API 연동 시 교체.
 * 실제 연동 시 서버에서 본인 프로젝트 여부를 검증한 결과만 내려받는다.
 */
const mockCrawledProjects: CrawledProject[] = [
  {
    id: "crawled-1",
    thumbnail: "https://picsum.photos/seed/ajou-capstone/800/600",
    title: "캡스톤디자인 - 교내 중고거래 플랫폼",
    category: "소프트웨어",
    isImported: false,
  },
  {
    id: "crawled-2",
    thumbnail: "https://picsum.photos/seed/ajou-security/800/600",
    title: "웹 취약점 자동 진단 도구 개발",
    category: "사이버보안",
    isImported: false,
  },
  {
    id: "crawled-3",
    thumbnail: "https://picsum.photos/seed/ajou-ai/800/600",
    title: "LLM 기반 학사 상담 챗봇",
    category: "AI융합",
    isImported: true,
  },
  {
    id: "crawled-4",
    thumbnail: "https://picsum.photos/seed/ajou-media/800/600",
    title: "인터랙티브 미디어 아트 전시 프로젝트",
    category: "미디어",
    isImported: false,
  },
  {
    id: "crawled-5",
    thumbnail: "https://picsum.photos/seed/ajou-research/800/600",
    title: "그래프 신경망 기반 추천 알고리즘 연구",
    category: "자기주도연구",
    isImported: false,
  },
  {
    id: "crawled-6",
    thumbnail: "https://picsum.photos/seed/ajou-project/800/600",
    title: "아주대 학식 알리미 모바일 앱",
    category: "자기주도프로젝트",
    isImported: false,
  },
];

interface MyPortfolioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * MyPortfolioModal 컴포넌트
 * 헤더 프로필 드롭다운의 "내 포트폴리오" 메뉴에서 열리는 모달
 *
 * 기능:
 * - 크롤링으로 수집된 본인 프로젝트 목록 조회 (목업)
 * - 프로젝트명 검색
 * - 카드 단위로 내 포트폴리오에 비공개 상태로 가져오기
 */
export function MyPortfolioModal({ open, onOpenChange }: MyPortfolioModalProps) {
  const [query, setQuery] = useState("");
  const [importedIds, setImportedIds] = useState<string[]>(
    mockCrawledProjects.filter((project) => project.isImported).map((project) => project.id)
  );

  // 제목 기준 검색
  const filteredProjects = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return mockCrawledProjects;
    return mockCrawledProjects.filter((project) =>
      project.title.toLowerCase().includes(keyword)
    );
  }, [query]);

  const handleImport = (id: string) => {
    setImportedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // 모달을 닫을 때 검색어 초기화
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setQuery("");
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[720px] max-h-[85vh] gap-0 p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-[#111] text-[20px] font-bold leading-[1.4] tracking-[-0.5px]">
            내 포트폴리오
          </DialogTitle>
          <DialogDescription className="text-[#666] text-[14px] leading-[1.43] tracking-[-0.35px]">
            수집된 프로젝트 중 본인 프로젝트로 확인된 항목입니다. 가져오면 내 프로필에 비공개
            상태로 복사되며, 내용을 추가한 뒤 공개로 전환할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        {/* 검색 */}
        <div className="px-6 pb-4">
          <div className="flex h-[44px] items-center gap-2 rounded-lg border border-[#e5e5ec] bg-white px-4 focus-within:border-[#004a9c] transition-colors">
            <Search className="h-4 w-4 shrink-0 text-[#808080]" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="프로젝트명으로 검색"
              className="flex-1 bg-transparent text-[14px] leading-[1.43] tracking-[-0.35px] text-[#1a1a1a] outline-none placeholder:text-[#808080]"
            />
          </div>
        </div>

        {/* 프로젝트 목록 */}
        <div className="max-h-[calc(85vh-320px)] overflow-y-auto px-6 pb-4">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredProjects.map((project) => {
                const isImported = importedIds.includes(project.id);

                return (
                  <div key={project.id} className="flex flex-col">
                    {/* 썸네일 */}
                    <div className="relative aspect-[360/203] w-full overflow-hidden rounded-t-xl border border-b-0 border-[#e5e5e5]">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>

                    {/* 카드 내용 */}
                    <div className="flex flex-1 flex-col gap-3 rounded-b-xl border border-[#e5e5e5] bg-white p-4">
                      {/* 태그 */}
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-xl border border-[#003876] px-3 py-1 text-[12px] font-medium leading-[1.33] tracking-[-0.3px] text-[#003876]">
                          {project.category}
                        </span>
                      </div>

                      {/* 프로젝트명 */}
                      <h3 className="line-clamp-2 flex-1 text-[16px] font-semibold leading-[1.4] tracking-[-0.4px] text-[#333]">
                        {project.title}
                      </h3>

                      {/* 가져오기 */}
                      {isImported ? (
                        <div className="flex h-[36px] items-center justify-center gap-1 rounded-lg bg-[#f5f5f5] text-[13px] font-medium text-[#808080]">
                          <Check className="h-4 w-4" />
                          가져옴
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleImport(project.id)}
                          className="h-[36px] w-full rounded-lg bg-[#004a9c] text-[13px] font-medium text-white hover:bg-[#004a9c]/90"
                        >
                          <Plus className="h-4 w-4" />
                          가져오기
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* 검색 결과 없음 */
            <div className="flex flex-col items-center justify-center gap-2 py-16">
              <Search className="h-8 w-8 text-[#d9d9d9]" />
              <p className="text-[14px] leading-[1.43] tracking-[-0.35px] text-[#666]">
                &lsquo;{query}&rsquo;에 대한 검색 결과가 없습니다.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t border-[#e5e5ec] px-6 py-4">
          <div className="flex items-center gap-1 text-[12px] leading-[1.33] tracking-[-0.3px] text-[#808080]">
            <Lock className="h-3.5 w-3.5" />
            가져온 포트폴리오는 비공개로 저장됩니다
          </div>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="h-[40px] rounded-lg border-[#004a9c] px-6 text-[14px] font-medium text-[#004a9c] hover:bg-[#004a9c]/5"
          >
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
