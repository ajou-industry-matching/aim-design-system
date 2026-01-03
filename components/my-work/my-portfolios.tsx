"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Eye, Heart, MessageSquare, MoreVertical, Edit, Trash2, Share2, FileText, Plus } from "lucide-react"
import { toast } from "sonner"

// Mock portfolios data
const mockPortfolios = [
  {
    id: "1",
    title: "AI 기반 학습 도우미 플랫폼",
    description: "머신러닝을 활용한 개인화된 학습 추천 시스템",
    thumbnail: "https://picsum.photos/id/0/800/600",
    category: "AI/ML",
    stats: { views: 1234, likes: 89, comments: 23 },
    createdAt: "2024-01-15",
    isPublic: true,
  },
  {
    id: "2",
    title: "캠퍼스 네비게이션 앱",
    description: "AR 기술을 활용한 교내 길찾기 모바일 앱",
    thumbnail: "https://picsum.photos/id/10/800/600",
    category: "모바일 앱",
    stats: { views: 987, likes: 76, comments: 18 },
    createdAt: "2024-01-10",
    isPublic: true,
  },
  {
    id: "3",
    title: "친환경 에너지 모니터링 시스템",
    description: "IoT 센서를 활용한 실시간 에너지 사용량 분석",
    thumbnail: "https://picsum.photos/id/15/800/600",
    category: "IoT",
    stats: { views: 756, likes: 62, comments: 15 },
    createdAt: "2024-01-05",
    isPublic: true,
  },
]

export function MyPortfolios() {
  const [portfolios, setPortfolios] = useState(mockPortfolios)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setPortfolios(portfolios.filter((p) => p.id !== id))
    setDeleteId(null)
    toast.success("포트폴리오가 삭제되었습니다")
  }

  const handleShare = (id: string) => {
    const url = `${window.location.origin}/portfolio/${id}`
    navigator.clipboard.writeText(url)
    toast.success("링크가 클립보드에 복사되었습니다")
  }

  if (portfolios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">포트폴리오가 없습니다</h3>
        <p className="text-muted-foreground mb-4">첫 번째 포트폴리오를 만들어보세요</p>
        <Button asChild>
          <Link href="/create">
            <Plus className="mr-2 h-4 w-4" />새 포트폴리오
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="overflow-hidden group">
            <Link href={`/portfolio/${portfolio.id}`}>
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={portfolio.thumbnail || "/placeholder.svg"}
                  alt={portfolio.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <Badge className="absolute top-2 right-2 text-xs">{portfolio.category}</Badge>
              </div>
            </Link>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/portfolio/${portfolio.id}`} className="flex-1">
                  <h3 className="font-semibold line-clamp-1 hover:underline">{portfolio.title}</h3>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/edit/${portfolio.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        수정
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare(portfolio.id)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      공유
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(portfolio.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{portfolio.description}</p>

              <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {portfolio.stats.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {portfolio.stats.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {portfolio.stats.comments}
                  </div>
                </div>
                <span>{new Date(portfolio.createdAt).toLocaleDateString("ko-KR")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>포트폴리오 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 포트폴리오를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
