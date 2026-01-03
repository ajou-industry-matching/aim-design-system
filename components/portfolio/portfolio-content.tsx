import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Target, TrendingUp } from "lucide-react"

type Portfolio = {
  description: string
  techStack: string[]
  features: string[]
  challenges?: string
  learnings?: string
  thumbnail: string
  images: string[]
}

type Props = {
  portfolio: Portfolio
}

export function PortfolioContent({ portfolio }: Props) {
  return (
    <div className="space-y-8">
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          src={portfolio.thumbnail || "/placeholder.svg"}
          alt="Portfolio thumbnail"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            프로젝트 소개
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap leading-relaxed">{portfolio.description}</p>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {portfolio.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>주요 기능</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {portfolio.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Additional Images */}
      {portfolio.images.length > 1 && (
        <div className="grid gap-4 md:grid-cols-2">
          {portfolio.images.slice(1).map((image, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <img
                src={image || "/placeholder.svg"}
                alt={`Screenshot ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Challenges */}
      {portfolio.challenges && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              도전 과제 및 해결 방법
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap leading-relaxed">{portfolio.challenges}</p>
          </CardContent>
        </Card>
      )}

      {/* Learnings */}
      {portfolio.learnings && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              배운 점
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap leading-relaxed">{portfolio.learnings}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
