import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Heart } from "lucide-react"

// Mock related portfolios
const relatedPortfolios = [
  {
    id: "2",
    title: "날씨 예측 AI 모델",
    description: "딥러닝을 활용한 기상 예측 시스템",
    thumbnail: "https://picsum.photos/id/120/800/600",
    category: "AI/ML",
    author: {
      name: "송하늘",
      avatar: "https://picsum.photos/id/433/100/100",
    },
    stats: { views: 592, likes: 48 },
  },
  {
    id: "3",
    title: "헬스케어 데이터 시각화",
    description: "건강 데이터 분석 및 인사이트 대시보드",
    thumbnail: "https://picsum.photos/id/180/800/600",
    category: "AI/ML",
    author: {
      name: "정수연",
      avatar: "https://picsum.photos/id/65/100/100",
    },
    stats: { views: 432, likes: 38 },
  },
  {
    id: "4",
    title: "소셜 미디어 분석 도구",
    description: "트렌드 분석 및 감성 분석 플랫폼",
    thumbnail: "https://picsum.photos/id/201/800/600",
    category: "AI/ML",
    author: {
      name: "오바다",
      avatar: "https://picsum.photos/id/665/100/100",
    },
    stats: { views: 389, likes: 31 },
  },
]

type Props = {
  currentPortfolioId: string
  category: string
}

export function RelatedPortfolios({ currentPortfolioId, category }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">관련 포트폴리오</h2>
      <p className="text-muted-foreground">{category} 카테고리의 다른 프로젝트들을 확인해보세요</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPortfolios
          .filter((p) => p.id !== currentPortfolioId)
          .map((portfolio) => (
            <Link key={portfolio.id} href={`/portfolio/${portfolio.id}`}>
              <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={portfolio.thumbnail || "/placeholder.svg"}
                    alt={portfolio.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 text-xs">{portfolio.category}</Badge>
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold line-clamp-1">{portfolio.title}</h3>
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
            </Link>
          ))}
      </div>
    </section>
  )
}
