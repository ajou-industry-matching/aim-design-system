"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github } from "lucide-react"
import type { PortfolioFormData } from "../portfolio-creation-form"

type Props = {
  formData: PortfolioFormData
}

export function ReviewStep({ formData }: Props) {
  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>미리보기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">{formData.title || "제목 없음"}</h3>
            <div className="flex flex-wrap gap-2">
              {formData.category && <Badge variant="default">{formData.category}</Badge>}
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground">{formData.shortDescription || "설명 없음"}</p>
          </div>

          <Separator />

          {/* Description */}
          {formData.description && (
            <div className="space-y-2">
              <h4 className="font-semibold">프로젝트 설명</h4>
              <p className="text-sm whitespace-pre-wrap">{formData.description}</p>
            </div>
          )}

          {/* Tech Stack */}
          {formData.techStack.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">기술 스택</h4>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {formData.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">주요 기능</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {formData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {formData.challenges && (
            <div className="space-y-2">
              <h4 className="font-semibold">도전 과제 및 해결 방법</h4>
              <p className="text-sm whitespace-pre-wrap">{formData.challenges}</p>
            </div>
          )}

          {/* Learnings */}
          {formData.learnings && (
            <div className="space-y-2">
              <h4 className="font-semibold">배운 점</h4>
              <p className="text-sm whitespace-pre-wrap">{formData.learnings}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {formData.demoUrl && (
              <a
                href={formData.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                데모 보기
              </a>
            )}
            {formData.githubUrl && (
              <a
                href={formData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>공개 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isPublic">공개 포트폴리오</Label>
              <p className="text-sm text-muted-foreground">모든 사용자가 이 포트폴리오를 볼 수 있습니다</p>
            </div>
            <Switch id="isPublic" checked={formData.isPublic} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowComments">댓글 허용</Label>
              <p className="text-sm text-muted-foreground">다른 사용자가 댓글을 남길 수 있습니다</p>
            </div>
            <Switch id="allowComments" checked={formData.allowComments} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
