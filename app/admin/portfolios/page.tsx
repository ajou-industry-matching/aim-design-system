"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/components/ui/pagination";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

// --- Mock Portfolio Data ---
const mockPortfolios = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  number: i + 1,
  title: [
    "AI 기반 학습 도우미 플랫폼",
    "캠퍼스 네비게이션 앱",
    "블록체인 투표 시스템",
    "IoT 스마트 팜 관리",
    "실시간 채팅 애플리케이션",
  ][i % 5],
  author: ["김철수", "이영희", "박민수", "최지은", "정우성"][i % 5],
  category: ["AI/ML", "모바일 앱", "블록체인", "IoT", "웹 개발"][i % 5],
  status: i % 4 === 2 ? ("under_review" as const) : ("published" as const),
  views: 100 + ((i * 47) % 2000),
  createdAt: new Date(2024, 0, 20 - (i % 20)).toLocaleDateString("ko-KR"),
}));

// --- Mock Tag Data ---
const MOCK_ALL_TAGS = [
  { name: "React", count: 45 },
  { name: "TypeScript", count: 38 },
  { name: "JavaScript", count: 32 },
  { name: "Next.js", count: 28 },
  { name: "Python", count: 25 },
  { name: "AI/ML", count: 22 },
  { name: "Spring Boot", count: 20 },
  { name: "Vue.js", count: 18 },
  { name: "Node.js", count: 16 },
  { name: "Flutter", count: 14 },
  { name: "Docker", count: 12 },
  { name: "AWS", count: 10 },
  { name: "Firebase", count: 9 },
  { name: "UI/UX", count: 8 },
  { name: "Swift", count: 7 },
  { name: "Kotlin", count: 5 },
  { name: "데이터 분석", count: 4 },
  { name: "블록체인", count: 3 },
  { name: "IoT", count: 2 },
  { name: "게임 개발", count: 1 },
];

const ITEMS_PER_PAGE = 10;

export default function AdminPortfoliosPage() {
  const router = useRouter();

  // Portfolio tab state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Tag tab state
  const [allTags, setAllTags] = useState(MOCK_ALL_TAGS);
  const [newTagName, setNewTagName] = useState("");
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [editingTagName, setEditingTagName] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  // --- Portfolio handlers ---
  const filteredPortfolios = mockPortfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPortfolios.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPortfolios = filteredPortfolios.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleRowClick = (id: string) => {
    router.push(`/admin/portfolios/${id}`);
  };

  // --- Tag handlers ---
  const handleCreateTag = () => {
    if (
      newTagName.trim() &&
      !allTags.some((t) => t.name === newTagName.trim())
    ) {
      setAllTags([...allTags, { name: newTagName.trim(), count: 0 }]);
      setNewTagName("");
    }
  };

  const handleDeleteTag = (tagName: string) => {
    if (
      confirm(`"${tagName}" 태그를 삭제하시겠습니까? 모든 포트폴리오에서 제거됩니다.`)
    ) {
      setAllTags(allTags.filter((t) => t.name !== tagName));
    }
  };

  const handleStartEditTag = (index: number) => {
    setEditingTagIndex(index);
    setEditingTagName(allTags[index].name);
  };

  const handleSaveEditTag = () => {
    if (editingTagIndex === null) return;
    const oldName = allTags[editingTagIndex].name;
    const newName = editingTagName.trim();
    if (!newName || (newName !== oldName && allTags.some((t) => t.name === newName)))
      return;

    setAllTags(
      allTags.map((t, i) =>
        i === editingTagIndex ? { ...t, name: newName } : t,
      ),
    );
    setEditingTagIndex(null);
    setEditingTagName("");
  };

  const filteredTags = allTags.filter((t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-bold text-[#111]">포트폴리오 관리</h1>
        <p className="text-[14px] text-[#666]">
          포트폴리오와 태그를 관리할 수 있습니다.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="portfolios">
        <TabsList className="h-[44px] bg-[#f2f2f2] rounded-lg p-1">
          <TabsTrigger
            value="portfolios"
            className="px-6 text-[14px] font-medium data-[state=active]:bg-white data-[state=active]:text-[#111] data-[state=active]:shadow-sm text-[#666]"
          >
            포트폴리오 관리
          </TabsTrigger>
          <TabsTrigger
            value="tags"
            className="px-6 text-[14px] font-medium data-[state=active]:bg-white data-[state=active]:text-[#111] data-[state=active]:shadow-sm text-[#666]"
          >
            태그 관리
          </TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolios" className="space-y-4 mt-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <Input
                placeholder="제목 또는 작성자 검색..."
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
                    제목
                  </TableHead>
                  <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                    작성자
                  </TableHead>
                  <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                    조회수
                  </TableHead>
                  <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                    등록일
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPortfolios.map((portfolio) => (
                  <TableRow
                    key={portfolio.id}
                    onClick={() => handleRowClick(portfolio.id)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                      {portfolio.number}
                    </TableCell>
                    <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                      {portfolio.title}
                    </TableCell>
                    <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                      {portfolio.author}
                    </TableCell>
                    <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                      {portfolio.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                      {portfolio.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredPortfolios.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </TabsContent>

        {/* Tag Management Tab */}
        <TabsContent value="tags" className="space-y-4 mt-4">
          {/* Add new tag */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="새 태그 이름 입력..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
              className="max-w-[300px]"
            />
            <Button
              onClick={handleCreateTag}
              className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2"
            >
              <Plus size={18} />
              태그 추가
            </Button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
              <Input
                placeholder="태그 검색..."
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <span className="text-[14px] text-[#666]">
              총 <span className="font-semibold text-[#111]">{allTags.length}</span>개
            </span>
          </div>

          {/* Tag Table */}
          <div className="w-full border-collapse">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[70px]">
                    순번
                  </TableHead>
                  <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                    태그명
                  </TableHead>
                  <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[150px]">
                    사용 수
                  </TableHead>
                  <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                    관리
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.map((tag, index) => {
                  const originalIndex = allTags.findIndex(
                    (t) => t.name === tag.name,
                  );
                  return (
                    <TableRow key={tag.name}>
                      <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px]">
                        {editingTagIndex === originalIndex ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editingTagName}
                              onChange={(e) =>
                                setEditingTagName(e.target.value)
                              }
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleSaveEditTag()
                              }
                              className="h-8 max-w-[200px]"
                            />
                            <Button
                              onClick={handleSaveEditTag}
                              size="sm"
                              className="h-8 bg-[#004a9c] hover:bg-[#004a9c]/90 text-white"
                            >
                              저장
                            </Button>
                            <Button
                              onClick={() => setEditingTagIndex(null)}
                              size="sm"
                              variant="outline"
                              className="h-8"
                            >
                              취소
                            </Button>
                          </div>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-[#003876] text-[#003876]"
                          >
                            #{tag.name}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                        {tag.count}개 포트폴리오
                      </TableCell>
                      <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                        {editingTagIndex !== originalIndex && (
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666] hover:text-[#004a9c]"
                              onClick={() => handleStartEditTag(originalIndex)}
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-[#666] hover:text-red-500"
                              onClick={() => handleDeleteTag(tag.name)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
