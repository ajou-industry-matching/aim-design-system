"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, Bookmark, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

type Portfolio = {
  id: string
  title: string
  shortDescription: string
  category: string
  tags: string[]
  author: {
    id: string
    name: string
    avatar: string
    department: string
    year: string
  }
  stats: {
    views: number
    likes: number
    comments: number
  }
  createdAt: string
}

type Props = {
  portfolio: Portfolio
}

export function PortfolioHeader({ portfolio }: Props) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(portfolio.stats.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    toast.success(isLiked ? "좋아요를 취소했습니다" : "좋아요를 눌렀습니다")
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? "저장을 취소했습니다" : "포트폴리오를 저장했습니다")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("링크가 클립보드에 복사되었습니다")
  }

  return (
    <div className="space-y-6">
      {/* Title and Category */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="default">{portfolio.category}</Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {portfolio.stats.views.toLocaleString()}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{portfolio.title}</h1>
        <p className="text-lg text-muted-foreground">{portfolio.shortDescription}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {portfolio.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Author and Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Author Info */}
        <Link
          href={`/profile/${portfolio.author.id}`}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={portfolio.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{portfolio.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{portfolio.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {portfolio.author.department} · {portfolio.author.year}
            </p>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant={isLiked ? "default" : "outline"} size="sm" onClick={handleLike} className="gap-2">
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {likes}
          </Button>
          <Button variant={isSaved ? "default" : "outline"} size="sm" onClick={handleSave} className="gap-2">
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            저장
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            공유
          </Button>
        </div>
      </div>
    </div>
  )
}
