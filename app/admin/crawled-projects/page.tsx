"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Search } from "lucide-react";
import {
  formatCrawledDate,
  formatMembers,
  mockCrawledProjects,
} from "@/lib/crawled-projects";

const ITEMS_PER_PAGE = 10;

export default function AdminCrawledProjectsPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // 제목 기준 검색
  const filteredProjects = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return mockCrawledProjects;
    return mockCrawledProjects.filter((project) =>
      project.title.toLowerCase().includes(keyword)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // 제목 클릭 시 포트폴리오 수정 페이지로 이동
  const handleTitleClick = (crawledProjectId: number) => {
    router.push(`/admin/portfolios/${crawledProjectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#111]">크롤링 데이터 관리</h1>
        <p className="text-[14px] text-[#666]">
          수집된 프로젝트를 조회하고 포트폴리오 내용을 수정할 수 있습니다.
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
          <Input
            placeholder="프로젝트명 검색..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full border-collapse">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                순번
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                프로젝트명
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[160px]">
                구분
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                학기
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[140px]">
                참여자
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                수집일
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProjects.map((project, index) => (
              <TableRow
                key={project.crawledProjectId}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                  <button
                    type="button"
                    onClick={() => handleTitleClick(project.crawledProjectId)}
                    className="cursor-pointer text-left"
                  >
                    {project.title}
                  </button>
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center">
                  <span className="rounded-xl border border-[#003876] px-3 py-1 text-[12px] font-medium leading-[1.33] tracking-[-0.3px] text-[#003876]">
                    {project.category}
                  </span>
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {project.term}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {formatMembers(project.members)}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {formatCrawledDate(project.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 검색 결과 없음 */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-16">
          <Search className="h-8 w-8 text-[#d9d9d9]" />
          <p className="text-[14px] leading-[1.43] tracking-[-0.35px] text-[#666]">
            &lsquo;{searchQuery}&rsquo;에 대한 검색 결과가 없습니다.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredProjects.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
