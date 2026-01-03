"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Eye, Trash2, Flag, Search } from "lucide-react"
import { toast } from "sonner"

// Mock data
const mockPortfolios = [
  {
    id: "1",
    title: "AI 기반 학습 도우미 플랫폼",
    author: "김철수",
    category: "AI/ML",
    status: "published",
    views: 1234,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "캠퍼스 네비게이션 앱",
    author: "이영희",
    category: "모바일 앱",
    status: "published",
    views: 987,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "블록체인 투표 시스템",
    author: "박민수",
    category: "블록체인",
    status: "under_review",
    views: 0,
    createdAt: "2024-01-20",
  },
]

export function PortfolioManagementTable() {
  const [portfolios, setPortfolios] = useState(mockPortfolios)
  const [searchQuery, setSearchQuery] = useState("")

  const handleDelete = (id: string) => {
    setPortfolios(portfolios.filter((p) => p.id !== id))
    toast.success("포트폴리오가 삭제되었습니다")
  }

  const filteredPortfolios = portfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="포트폴리오 또는 작성자 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>조회수</TableHead>
              <TableHead>생성일</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPortfolios.map((portfolio) => (
              <TableRow key={portfolio.id}>
                <TableCell className="font-medium">{portfolio.title}</TableCell>
                <TableCell>{portfolio.author}</TableCell>
                <TableCell>
                  <Badge variant="outline">{portfolio.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={portfolio.status === "published" ? "default" : "secondary"}>
                    {portfolio.status === "published" ? "발행됨" : "검토 중"}
                  </Badge>
                </TableCell>
                <TableCell>{portfolio.views.toLocaleString()}</TableCell>
                <TableCell>{new Date(portfolio.createdAt).toLocaleDateString("ko-KR")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        보기
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        신고 처리
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(portfolio.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
