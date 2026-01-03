"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Edit, Trash2, Clock } from "lucide-react"
import { toast } from "sonner"

// Mock drafts data
const mockDrafts = [
  {
    id: "draft-1",
    title: "블록체인 기반 투표 시스템",
    description: "스마트 컨트랙트를 활용한 투명한 투표 플랫폼 (작성 중)",
    category: "블록체인",
    updatedAt: "2024-01-20",
  },
  {
    id: "draft-2",
    title: "실시간 협업 도구",
    description: "WebSocket을 활용한 실시간 문서 편집 도구",
    category: "웹 개발",
    updatedAt: "2024-01-18",
  },
]

export function MyDrafts() {
  const [drafts, setDrafts] = useState(mockDrafts)

  const handleDelete = (id: string) => {
    setDrafts(drafts.filter((d) => d.id !== id))
    toast.success("임시저장된 포트폴리오가 삭제되었습니다")
  }

  if (drafts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">임시저장된 포트폴리오가 없습니다</h3>
        <p className="text-muted-foreground">작성 중인 포트폴리오가 여기에 표시됩니다</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <Card key={draft.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{draft.category}</Badge>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    임시저장
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold">{draft.title}</h3>
                <p className="text-sm text-muted-foreground">{draft.description}</p>
                <p className="text-xs text-muted-foreground">
                  마지막 수정: {new Date(draft.updatedAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/edit/${draft.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    계속 작성
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(draft.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
