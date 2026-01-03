import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Heart } from "lucide-react"

// Mock data - will be replaced with real data
const portfolios = [
  {
    id: 4,
    title: "온라인 쇼핑몰 플랫폼",
    description: "Next.js와 Stripe를 활용한 전자상거래 웹사이트",
    thumbnail: "https://picsum.photos/id/20/800/600",
    category: "웹 개발",
    author: {
      name: "최지훈",
      avatar: "https://picsum.photos/id/64/100/100",
    },
    stats: { views: 543, likes: 42 },
  },
  {
    id: 5,
    title: "헬스케어 데이터 시각화",
    description: "건강 데이터 분석 및 인사이트 대시보드",
    thumbnail: "https://picsum.photos/id/180/800/600",
    category: "데이터 분석",
    author: {
      name: "정수연",
      avatar: "https://picsum.photos/id/65/100/100",
    },
    stats: { views: 432, likes: 38 },
  },
  {
    id: 6,
    title: "모바일 게임 프로토타입",
    description: "Unity 기반 2D 퍼즐 게임",
    thumbnail: "https://picsum.photos/id/119/800/600",
    category: "게임 개발",
    author: {
      name: "강민호",
      avatar: "https://picsum.photos/id/91/100/100",
    },
    stats: { views: 678, likes: 54 },
  },
  {
    id: 7,
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
  {
    id: 8,
    title: "블록체인 투표 시스템",
    description: "스마트 컨트랙트 기반 투명한 투표 플랫폼",
    thumbnail: "https://picsum.photos/id/1/800/600",
    category: "블록체인",
    author: {
      name: "임태양",
      avatar: "https://picsum.photos/id/342/100/100",
    },
    stats: { views: 456, likes: 35 },
  },
  {
    id: 9,
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
    id: 10,
    title: "스마트 홈 제어 앱",
    description: "IoT 기기 통합 관리 모바일 애플리케이션",
    thumbnail: "https://picsum.photos/id/160/800/600",
    category: "모바일 앱",
    author: {
      name: "한별이",
      avatar: "https://picsum.photos/id/554/100/100",
    },
    stats: { views: 734, likes: 59 },
  },
  {
    id: 11,
    title: "소셜 미디어 분석 도구",
    description: "트렌드 분석 및 감성 분석 플랫폼",
    thumbnail: "https://picsum.photos/id/201/800/600",
    category: "데이터 분석",
    author: {
      name: "오바다",
      avatar: "https://picsum.photos/id/665/100/100",
    },
    stats: { views: 389, likes: 31 },
  },
]

export function PortfolioGrid() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">모든 포트폴리오</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {portfolios.map((portfolio) => (
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
