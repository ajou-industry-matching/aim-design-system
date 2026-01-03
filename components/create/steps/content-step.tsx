"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { PortfolioContentEditor } from "@/components/portfolio/portfolio-content-editor"
import type { PortfolioFormData } from "../portfolio-creation-form"

type Props = {
  formData: PortfolioFormData
  updateFormData: (data: Partial<PortfolioFormData>) => void
}

export function ContentStep({ formData, updateFormData }: Props) {
  const [techInput, setTechInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      updateFormData({ techStack: [...formData.techStack, techInput.trim()] })
      setTechInput("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    updateFormData({ techStack: formData.techStack.filter((t) => t !== tech) })
  }

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      updateFormData({ features: [...formData.features, featureInput.trim()] })
      setFeatureInput("")
    }
  }

  const handleRemoveFeature = (feature: string) => {
    updateFormData({ features: formData.features.filter((f) => f !== feature) })
  }

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">프로젝트 간단 설명 *</Label>
        <Textarea
          id="description"
          placeholder="프로젝트를 간단히 요약해주세요 (2-3줄 정도)"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          rows={4}
        />
      </div>

      {/* Markdown Content - Novel Editor */}
      <div className="space-y-2">
        <Label htmlFor="markdownContent">프로젝트 상세 설명 *</Label>
        <p className="text-sm text-muted-foreground">
          / 를 입력하여 다양한 포맷을 사용할 수 있습니다
        </p>
        <PortfolioContentEditor
          content={formData.markdownContent}
          onChange={(content) => updateFormData({ markdownContent: content })}
          editable={true}
        />
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <Label htmlFor="techStack">기술 스택 *</Label>
        <div className="flex gap-2">
          <Input
            id="techStack"
            placeholder="예: React, Next.js, TypeScript"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
          />
          <Button type="button" onClick={handleAddTech} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <button onClick={() => handleRemoveTech(tech)} className="ml-1 hover:bg-muted rounded-full">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div className="space-y-2">
        <Label htmlFor="features">주요 기능</Label>
        <div className="flex gap-2">
          <Input
            id="features"
            placeholder="주요 기능을 입력하세요"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
          />
          <Button type="button" onClick={handleAddFeature} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.features.length > 0 && (
          <ul className="mt-2 space-y-1">
            {formData.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">•</span>
                <span className="flex-1">{feature}</span>
                <button
                  onClick={() => handleRemoveFeature(feature)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Challenges */}
      <div className="space-y-2">
        <Label htmlFor="challenges">도전 과제 및 해결 방법</Label>
        <Textarea
          id="challenges"
          placeholder="프로젝트 진행 중 겪었던 어려움과 해결 방법을 공유해주세요"
          value={formData.challenges}
          onChange={(e) => updateFormData({ challenges: e.target.value })}
          rows={4}
        />
      </div>

      {/* Learnings */}
      <div className="space-y-2">
        <Label htmlFor="learnings">배운 점</Label>
        <Textarea
          id="learnings"
          placeholder="프로젝트를 통해 배운 점이나 인사이트를 공유해주세요"
          value={formData.learnings}
          onChange={(e) => updateFormData({ learnings: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}
