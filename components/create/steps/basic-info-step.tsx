"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"
import type { PortfolioFormData } from "../portfolio-creation-form"

const categories = ["웹 개발", "모바일 앱", "UI/UX 디자인", "데이터 분석", "AI/ML", "게임 개발", "IoT", "블록체인"]

type Props = {
  formData: PortfolioFormData
  updateFormData: (data: Partial<PortfolioFormData>) => void
}

export function BasicInfoStep({ formData, updateFormData }: Props) {
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        updateFormData({ tags: [...formData.tags, tagInput.trim()] })
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    updateFormData({ tags: formData.tags.filter((t) => t !== tag) })
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">프로젝트 제목 *</Label>
        <Input
          id="title"
          placeholder="예: AI 기반 학습 도우미 플랫폼"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">카테고리 *</Label>
        <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
          <SelectTrigger id="category">
            <SelectValue placeholder="카테고리를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <Label htmlFor="shortDescription">짧은 설명 *</Label>
        <Textarea
          id="shortDescription"
          placeholder="프로젝트를 한 문장으로 설명해주세요 (최대 150자)"
          value={formData.shortDescription}
          onChange={(e) => updateFormData({ shortDescription: e.target.value })}
          maxLength={150}
          rows={3}
        />
        <p className="text-xs text-muted-foreground text-right">{formData.shortDescription.length} / 150</p>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">태그</Label>
        <Input
          id="tags"
          placeholder="태그를 입력하고 Enter를 누르세요"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:bg-muted rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
