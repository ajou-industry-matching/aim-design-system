"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BasicInfoStep } from "./steps/basic-info-step"
import { ContentStep } from "./steps/content-step"
import { MediaStep } from "./steps/media-step"
import { ReviewStep } from "./steps/review-step"
import { toast } from "sonner"

const steps = [
  { id: 1, name: "기본 정보", description: "프로젝트의 기본 정보를 입력하세요" },
  { id: 2, name: "내용 작성", description: "프로젝트 설명과 기술 스택을 추가하세요" },
  { id: 3, name: "미디어 추가", description: "이미지와 영상을 업로드하세요" },
  { id: 4, name: "검토 및 발행", description: "내용을 확인하고 발행하세요" },
]

export type PortfolioFormData = {
  // Basic Info
  title: string
  category: string
  tags: string[]
  shortDescription: string

  // Content
  description: string
  markdownContent: string // Novel 에디터 본문 내용
  techStack: string[]
  features: string[]
  challenges: string
  learnings: string

  // Media
  thumbnail: File | null
  images: File[]
  videoUrl: string
  demoUrl: string
  githubUrl: string
  attachments: File[] // 첨부파일들

  // Metadata
  isPublic: boolean
  allowComments: boolean
}

export function PortfolioCreationForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<PortfolioFormData>({
    title: "",
    category: "",
    tags: [],
    shortDescription: "",
    description: "",
    markdownContent: "",
    techStack: [],
    features: [],
    challenges: "",
    learnings: "",
    thumbnail: null,
    images: [],
    videoUrl: "",
    demoUrl: "",
    githubUrl: "",
    attachments: [],
    isPublic: true,
    allowComments: true,
  })

  const updateFormData = (data: Partial<PortfolioFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("포트폴리오가 성공적으로 발행되었습니다!")
      router.push("/my-work")
    } catch (error) {
      toast.error("포트폴리오 발행에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg">{steps[currentStep - 1].name}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentStep} / {steps.length}
            </span>
          </div>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && <BasicInfoStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <ContentStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <MediaStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <ReviewStep formData={formData} />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1 || isSubmitting}>
          이전
        </Button>

        {currentStep < steps.length ? (
          <Button onClick={handleNext} disabled={isSubmitting}>
            다음
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "발행 중..." : "발행하기"}
          </Button>
        )}
      </div>
    </div>
  )
}
