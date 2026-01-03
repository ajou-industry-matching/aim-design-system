"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Heart, Bookmark, BookmarkX } from "lucide-react"
import { toast } from "sonner"

// Mock saved portfolios data
const mockSaved = [
  {
    id: "4",
    title: "온라인 쇼핑몰 플랫폼",
    description: "Next.js와 Stripe를 활용한 전자상거래 웹사이트",
    thumbnail: "https://picsum.photos/id/20/800/600",
    category: "웹 개발",
    author: {
      name: "최지훈",
      avatar: "https://picsum.photos/id/342/100/100",
    },
    stats: { views: 543, likes: 42 },
  },
  {
    id: "5",
    title: "디자인 시스템 구축",
    description: "재사용 가능한 UI 컴포넌트 라이브러리",
    thumbnail: "https://picsum.photos/id/326/800/600",
    category: "UI/UX 디자인",
    author: {
      name: "윤서아",
      avatar: "https://picsum.photos/id/177/100/100",
    },
    stats: { views: 821, likes: 67 },
  },
]

export function MySaved() {
  const [saved, setSaved] = useState(mockSaved)

  const handleUnsave = (id: string) => {
    setSaved(saved.filter((s) => s.id !== id))
    toast.success("저장을 취소했습니다")
  }

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">저장한 포트폴리오가 없습니다</h3>
        <p className="text-muted-foreground mb-4">마음에 드는 포트폴리오를 저장해보세요</p>
        <Button asChild>
          <Link href="/explore">포트폴리오 탐색하기</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((portfolio) => (
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
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleUnsave(portfolio.id)}>
                <BookmarkX className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{portfolio.description}</p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={portfolio.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{portfolio.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{portfolio.author.name}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {portfolio.stats.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {portfolio.stats.likes}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
