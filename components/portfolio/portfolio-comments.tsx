"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send } from "lucide-react"
import { toast } from "sonner"

// Comment type definition
type Comment = {
  id: string
  author: {
    name: string
    avatar: string
    department: string
  }
  content: string
  createdAt: string
  replies?: Comment[]
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "이영희",
      avatar: "/placeholder-user.jpg",
      department: "미디어학과",
    },
    content: "정말 인상적인 프로젝트네요! 추천 알고리즘 부분이 특히 흥미롭습니다.",
    createdAt: "2024-01-18",
    replies: [
      {
        id: "1-1",
        author: {
          name: "김철수",
          avatar: "/placeholder-user.jpg",
          department: "소프트웨어학과",
        },
        content: "저도 동의합니다! 특히 데이터 처리 방식이 효율적이네요.",
        createdAt: "2024-01-18",
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "박민수",
      avatar: "/placeholder-user.jpg",
      department: "소프트웨어학과",
    },
    content: "UI/UX도 깔끔하고 기능도 잘 구현되어 있네요. 많은 도움이 되었습니다!",
    createdAt: "2024-01-19",
    replies: [],
  },
]

type Props = {
  portfolioId: string
}

type CommentItemProps = {
  comment: Comment
  replyingTo: string | null
  replyContent: string
  isSubmitting: boolean
  onReplyClick: (id: string) => void
  onReplyContentChange: (content: string) => void
  onReplySubmit: (parentId: string) => void
  onReplyCancel: () => void
  depth?: number
}

function CommentItem({
  comment,
  replyingTo,
  replyContent,
  isSubmitting,
  onReplyClick,
  onReplyContentChange,
  onReplySubmit,
  onReplyCancel,
  depth = 0,
}: CommentItemProps) {
  const isReplying = replyingTo === comment.id

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">{comment.author.department}</span>
              <span className="text-xs text-muted-foreground">
                · {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{comment.content}</p>
          </div>

          {/* Reply Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReplyClick(comment.id)}
              className="h-8 px-3 text-xs hover:bg-accent"
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              답글
            </Button>
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="space-y-2 pt-2">
              <Textarea
                placeholder="답글을 입력하세요..."
                value={replyContent}
                onChange={(e) => onReplyContentChange(e.target.value)}
                rows={2}
                className="text-sm"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onReplyCancel}
                  disabled={isSubmitting}
                >
                  취소
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onReplySubmit(comment.id)}
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  <Send className="h-3 w-3" />
                  {isSubmitting ? "등록 중..." : "답글 등록"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 space-y-3 border-l-2 border-muted pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replyingTo={replyingTo}
              replyContent={replyContent}
              isSubmitting={isSubmitting}
              onReplyClick={onReplyClick}
              onReplyContentChange={onReplyContentChange}
              onReplySubmit={onReplySubmit}
              onReplyCancel={onReplyCancel}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function PortfolioComments({ portfolioId }: Props) {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim()) {
      toast.error("댓글 내용을 입력해주세요")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: "현재 사용자",
          avatar: "/placeholder-user.jpg",
          department: "소프트웨어학과",
        },
        content: newComment,
        createdAt: new Date().toISOString().split("T")[0],
        replies: [],
      }

      setComments([comment, ...comments])
      setNewComment("")
      toast.success("댓글이 등록되었습니다")
    } catch (error) {
      toast.error("댓글 등록에 실패했습니다")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReplySubmit = async (parentId: string) => {
    if (!replyContent.trim()) {
      toast.error("답글 내용을 입력해주세요")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const reply: Comment = {
        id: `${parentId}-${Date.now()}`,
        author: {
          name: "현재 사용자",
          avatar: "/placeholder-user.jpg",
          department: "소프트웨어학과",
        },
        content: replyContent,
        createdAt: new Date().toISOString().split("T")[0],
        replies: [],
      }

      const addReplyToComment = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            }
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies),
            }
          }
          return comment
        })
      }

      setComments(addReplyToComment(comments))
      setReplyContent("")
      setReplyingTo(null)
      toast.success("답글이 등록되었습니다")
    } catch (error) {
      toast.error("답글 등록에 실패했습니다")
    } finally {
      setIsSubmitting(false)
    }
  }

  const countTotalComments = (comments: Comment[]): number => {
    return comments.reduce((total, comment) => {
      return total + 1 + (comment.replies ? countTotalComments(comment.replies) : 0)
    }, 0)
  }

  const totalComments = countTotalComments(comments)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          댓글 {totalComments}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Send className="h-4 w-4" />
              {isSubmitting ? "등록 중..." : "댓글 등록"}
            </Button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replyingTo={replyingTo}
              replyContent={replyContent}
              isSubmitting={isSubmitting}
              onReplyClick={setReplyingTo}
              onReplyContentChange={setReplyContent}
              onReplySubmit={handleReplySubmit}
              onReplyCancel={() => {
                setReplyingTo(null)
                setReplyContent("")
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
