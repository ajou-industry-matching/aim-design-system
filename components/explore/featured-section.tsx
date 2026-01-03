import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Heart } from "lucide-react"

// Mock data - will be replaced with real data
const featuredProjects = [
  {
    id: 1,
    title: "AI 기반 학습 도우미 플랫폼",
    description: "머신러닝을 활용한 개인화된 학습 추천 시스템",
    thumbnail: "https://picsum.photos/id/0/800/600",
    category: "AI/ML",
    author: {
      name: "김철수",
      avatar: "https://picsum.photos/id/64/100/100",
      department: "소프트웨어학과",
    },
    stats: {
      views: 1234,
      likes: 89,
    },
  },
  {
    id: 2,
    title: "캠퍼스 네비게이션 앱",
    description: "AR 기술을 활용한 교내 길찾기 모바일 앱",
    thumbnail: "https://picsum.photos/id/10/800/600",
    category: "모바일 앱",
    author: {
      name: "이영희",
      avatar: "https://picsum.photos/id/65/100/100",
      department: "미디어학과",
    },
    stats: {
      views: 987,
      likes: 76,
    },
  },
  {
    id: 3,
    title: "친환경 에너지 모니터링 시스템",
    description: "IoT 센서를 활용한 실시간 에너지 사용량 분석",
    thumbnail: "https://picsum.photos/id/15/800/600",
    category: "IoT",
    author: {
      name: "박민수",
      avatar: "https://picsum.photos/id/91/100/100",
      department: "전자공학과",
    },
    stats: {
      views: 756,
      likes: 62,
    },
  },
]

export function FeaturedSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">주목할 만한 프로젝트</h2>
        <Link href="/featured" className="text-sm text-primary hover:underline">
          전체 보기
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <Link key={project.id} href={`/portfolio/${project.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                <Badge className="absolute top-3 right-3">{project.category}</Badge>
              </div>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={project.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{project.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{project.author.name}</span>
                      <span className="text-xs text-muted-foreground">{project.author.department}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {project.stats.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {project.stats.likes}
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
