import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

type Portfolio = {
  demoUrl?: string
  githubUrl?: string
  videoUrl?: string
  createdAt: string
  updatedAt: string
}

type Props = {
  portfolio: Portfolio
}

export function PortfolioSidebar({ portfolio }: Props) {
  return (
    <div className="space-y-6">
      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">프로젝트 링크</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {portfolio.demoUrl && (
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <a href={portfolio.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                데모 보기
              </a>
            </Button>
          )}
          {portfolio.githubUrl && (
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <a href={portfolio.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {portfolio.videoUrl && (
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" asChild>
              <a href={portfolio.videoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                영상 보기
              </a>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">프로젝트 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">생성일:</span>
            <span>{new Date(portfolio.createdAt).toLocaleDateString("ko-KR")}</span>
          </div>
          <Separator />
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">수정일:</span>
            <span>{new Date(portfolio.updatedAt).toLocaleDateString("ko-KR")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
