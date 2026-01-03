"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, ImageIcon, LinkIcon, FileText } from "lucide-react"
import { useState } from "react"
import type { PortfolioFormData } from "../portfolio-creation-form"

type Props = {
  formData: PortfolioFormData
  updateFormData: (data: Partial<PortfolioFormData>) => void
}

export function MediaStep({ formData, updateFormData }: Props) {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData({ thumbnail: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      updateFormData({ images: [...formData.images, ...files] })

      files.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagesPreviews((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newPreviews = imagesPreviews.filter((_, i) => i !== index)
    updateFormData({ images: newImages })
    setImagesPreviews(newPreviews)
  }

  const handleAttachmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      updateFormData({ attachments: [...formData.attachments, ...files] })
    }
  }

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index)
    updateFormData({ attachments: newAttachments })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Thumbnail */}
      <div className="space-y-2">
        <Label htmlFor="thumbnail">썸네일 이미지 *</Label>
        <p className="text-sm text-muted-foreground">포트폴리오 목록에 표시될 대표 이미지입니다</p>

        {thumbnailPreview ? (
          <Card className="relative overflow-hidden">
            <img
              src={thumbnailPreview || "/placeholder.svg"}
              alt="Thumbnail preview"
              className="w-full h-64 object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => {
                updateFormData({ thumbnail: null })
                setThumbnailPreview(null)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ) : (
          <label
            htmlFor="thumbnail"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭
              </p>
              <p className="text-xs text-muted-foreground">PNG, JPG (최대 10MB)</p>
            </div>
            <input id="thumbnail" type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
          </label>
        )}
      </div>

      {/* Additional Images */}
      <div className="space-y-2">
        <Label htmlFor="images">추가 이미지</Label>
        <p className="text-sm text-muted-foreground">프로젝트의 스크린샷이나 상세 이미지를 추가하세요</p>

        <label
          htmlFor="images"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">이미지 추가</span>
            </p>
          </div>
          <input id="images" type="file" className="hidden" accept="image/*" multiple onChange={handleImagesChange} />
        </label>

        {imagesPreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {imagesPreviews.map((preview, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Video URL */}
      <div className="space-y-2">
        <Label htmlFor="videoUrl">영상 URL</Label>
        <div className="flex gap-2">
          <LinkIcon className="h-4 w-4 mt-3 text-muted-foreground" />
          <Input
            id="videoUrl"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={formData.videoUrl}
            onChange={(e) => updateFormData({ videoUrl: e.target.value })}
          />
        </div>
      </div>

      {/* Demo URL */}
      <div className="space-y-2">
        <Label htmlFor="demoUrl">데모 URL</Label>
        <div className="flex gap-2">
          <LinkIcon className="h-4 w-4 mt-3 text-muted-foreground" />
          <Input
            id="demoUrl"
            type="url"
            placeholder="https://your-demo-site.com"
            value={formData.demoUrl}
            onChange={(e) => updateFormData({ demoUrl: e.target.value })}
          />
        </div>
      </div>

      {/* GitHub URL */}
      <div className="space-y-2">
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <div className="flex gap-2">
          <LinkIcon className="h-4 w-4 mt-3 text-muted-foreground" />
          <Input
            id="githubUrl"
            type="url"
            placeholder="https://github.com/username/repo"
            value={formData.githubUrl}
            onChange={(e) => updateFormData({ githubUrl: e.target.value })}
          />
        </div>
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <Label htmlFor="attachments">첨부파일</Label>
        <p className="text-sm text-muted-foreground">프로젝트 관련 문서, 발표자료 등을 첨부하세요</p>

        <label
          htmlFor="attachments"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center">
            <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">파일 추가</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPTX, ZIP 등</p>
          </div>
          <input
            id="attachments"
            type="file"
            className="hidden"
            multiple
            onChange={handleAttachmentsChange}
          />
        </label>

        {formData.attachments.length > 0 && (
          <div className="space-y-2 mt-4">
            {formData.attachments.map((file, index) => (
              <Card key={index} className="p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveAttachment(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
