"use client";

import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, use, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ExternalLink,
  FileText,
  Download,
  Send,
  Lock,
  CornerDownRight,
} from "lucide-react";
import { PortfolioContentEditor } from "@/components/portfolio/portfolio-content-editor";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock attachments data
const MOCK_ATTACHMENTS = [
  {
    id: "1",
    name: "프로젝트_발표자료.pdf",
    size: "2.5 MB",
    type: "PDF",
    uploadedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "시연영상_풀버전.mp4",
    size: "45.3 MB",
    type: "Video",
    uploadedAt: "2024-01-15",
  },
  {
    id: "3",
    name: "기술문서.docx",
    size: "1.2 MB",
    type: "Document",
    uploadedAt: "2024-01-16",
  },
];

// Comment type
type Comment = {
  id: string;
  author: {
    name: string;
    avatar: string;
    department: string;
  };
  content: string;
  createdAt: string;
  isPrivate: boolean;
  isHidden?: boolean;
  replies: Comment[];
};

// Mock comments data
const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    author: {
      name: "이영희",
      avatar: "/placeholder-user.jpg",
      department: "미디어학과",
    },
    content:
      "정말 인상적인 프로젝트네요! 추천 알고리즘 부분이 특히 흥미롭습니다.",
    createdAt: "2024-01-18",
    isPrivate: false,
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
        isPrivate: false,
        replies: [],
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
    content:
      "UI/UX도 깔끔하고 기능도 잘 구현되어 있네요. 많은 도움이 되었습니다!",
    createdAt: "2024-01-19",
    isPrivate: false,
    replies: [],
  },
  {
    id: "3",
    author: {
      name: "김철수",
      avatar: "/placeholder-user.jpg",
      department: "디자인학과",
    },
    content:
      "비공개 피드백: 코드 리뷰 관련해서 따로 연락드릴게요.",
    createdAt: "2024-01-20",
    isPrivate: true,
    replies: [
      {
        id: "3-1",
        author: {
          name: "현재 사용자",
          avatar: "/placeholder-user.jpg",
          department: "소프트웨어학과",
        },
        content: "네, 감사합니다! 슬랙으로 연락주세요.",
        createdAt: "2024-01-20",
        isPrivate: true,
        replies: [],
      },
    ],
  },
  {
    id: "4",
    author: {
      name: "익명",
      avatar: "",
      department: "",
    },
    content: "비공개 댓글입니다.",
    createdAt: "2024-01-21",
    isPrivate: true,
    isHidden: true,
    replies: [],
  },
];

// Sample markdown content for demonstration
const SAMPLE_MARKDOWN_CONTENT = `
<h1>프로젝트 개요</h1>
<p>EveryQuest는 FC온라인 유저들을 위한 혁신적인 게임 분석 도구입니다. 매칭된 상대방을 빠르게 분석하고, 승리를 위한 맞춤형 전략을 제공합니다.</p>

<h2>주요 기능</h2>

<h3>1. 전술 리포트</h3>
<p>최근 전적을 기반으로 한 자동 분석 시스템:</p>
<ul>
  <li><strong>내 전술 분석</strong>: 포메이션, 플레이 스타일, 강점과 약점 파악</li>
  <li><strong>상대 전술 분석</strong>: 상대방의 경기 패턴 및 전략 분석</li>
  <li><strong>실시간 업데이트</strong>: 매 경기 후 자동으로 데이터 갱신</li>
</ul>

<h3>2. 경기 전 프리뷰</h3>
<blockquote>
매치 전 준비를 완벽하게 도와주는 프리뷰 기능
</blockquote>
<p>다음과 같은 정보를 제공합니다:</p>
<ol>
  <li>예상 포메이션 분석</li>
  <li>키 플레이어 체크리스트</li>
  <li>주의해야 할 포인트</li>
  <li>전략 추천</li>
</ol>

<h3>3. 승리 퀘스트 시스템</h3>
<p>매칭된 상대를 이기기 위한 맞춤형 퀘스트를 제공합니다:</p>
<ul>
  <li>메인 퀘스트 5-6개</li>
  <li>도전 과제 1-2개</li>
  <li>경기 중 실천 가능한 액션 아이템</li>
</ul>

<img src="/assets/thumbnail.png" alt="EveryQuest 스크린샷" />

<h2>기술 스택</h2>
<p>프로젝트에 사용된 주요 기술들:</p>

<pre><code>// Frontend
- React 18
- TypeScript
- Next.js 14
- Tailwind CSS

// Backend
- Node.js
- Express
- PostgreSQL
- Redis

// Data Analysis
- Python
- Pandas
- scikit-learn</code></pre>

<h2>전적 대시보드</h2>
<p>핵심 지표를 한눈에 확인할 수 있는 대시보드:</p>
<ul>
  <li>점유율 분석</li>
  <li>패스 유형별 통계</li>
  <li>슈팅 패턴 분석</li>
  <li>실점 패턴 및 태그 자동 추출</li>
</ul>

<h3>굴리트 지수</h3>
<p>현재 <code>시세 추이</code>를 <strong>굴리트 시세</strong>로 시각화하여 제공합니다.</p>

<img src="/assets/thumbnail.png" alt="굴리트 지수 차트" />

<h2>향후 계획</h2>
<p>다음과 같은 기능들을 추가할 예정입니다:</p>
<ol>
  <li>AI 기반 전략 추천 시스템 고도화</li>
  <li>커뮤니티 기능 추가</li>
  <li>모바일 앱 출시</li>
  <li>실시간 경기 분석 기능</li>
</ol>

<blockquote>
"EveryQuest와 함께라면 모든 경기가 승리의 기회입니다!"
</blockquote>

<h2>참고 링크</h2>
<p>더 자세한 정보는 다음 링크를 참고해주세요:</p>
<ul>
  <li><a href="https://github.com/example/everyquest">GitHub Repository</a></li>
  <li><a href="https://youtube.com/watch?v=example">시연 영상</a></li>
  <li><a href="https://everyquest.example.com">프로젝트 홈페이지</a></li>
</ul>
`;

// Mock data - will be replaced with real data fetching
const getPortfolio = async (id: string) => {
  return {
    id,
    title: "EveryQuest",
    description: `EveryQuest는 FC온라인 공경 매칭된 유저를 빠르게 요약해주고, 이기기 위한 맞춤형 퀘스트를 제공합니다.

- 전술 리포트(내 전술/상대 전술): 최근 전적 기반 포메이션·플레이 스타일·강/약점 자동 요약
- 경기 전 프리뷰: 예상 포메이션/키 플레이어/주의 포인트 체크리스트
- 승리 퀘스트 제안: 매칭된 구단주를 이기기 위한 맞춤 퀘스트 5–6개 + 도전 과제 1–2개 (경기 중 실천형) - 전적 대시보드: 점유율, 패스/슈팅 유형, 실점 패턴 등 핵심 지표와 태그 자동 추출
- 굴리트 지수: 현재 시세 추이를 굴리트 시세로 시각화하여 제공합니다.`,
    thumbnail: "https://picsum.photos/id/119/800/600",
    images: [
      "https://picsum.photos/id/119/800/600",
      "https://picsum.photos/id/164/800/600",
      "https://picsum.photos/id/180/800/600",
    ],
    videoUrl: "https://youtube.com/watch?v=example",
    githubUrl: "https://github.com/example/everyquest",
    tags: ["React", "Frontend"],
    stats: {
      likes: 193,
      comments: 18,
    },
    markdownContent: SAMPLE_MARKDOWN_CONTENT,
  };
};

// --- Comment Item Component ---
function CommentItemUI({
  comment,
  replyingTo,
  replyContent,
  isPrivateReply,
  isSubmitting,
  onReplyClick,
  onReplyContentChange,
  onPrivateReplyToggle,
  onReplySubmit,
  onReplyCancel,
}: {
  comment: Comment;
  replyingTo: string | null;
  replyContent: string;
  isPrivateReply: boolean;
  isSubmitting: boolean;
  onReplyClick: (id: string) => void;
  onReplyContentChange: (content: string) => void;
  onPrivateReplyToggle: () => void;
  onReplySubmit: (parentId: string) => void;
  onReplyCancel: () => void;
}) {
  const isReplying = replyingTo === comment.id;

  // 비공개 댓글이 다른 사용자에게 보일 때 (내용 숨김)
  if (comment.isHidden) {
    return (
      <div className="rounded-lg border border-[#e5e5e5]">
        <div className="flex items-center gap-2 p-4">
          <Lock className="w-4 h-4 text-[#999]" />
          <span className="text-[14px] text-[#999]">
            비공개 댓글입니다.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#e5e5e5]">
      {/* Parent Comment */}
      <div className="flex gap-3 p-4">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[14px] text-[#333]">
              {comment.author.name}
            </span>
            <span className="text-[12px] text-[#999]">
              {comment.author.department}
            </span>
            <span className="text-[12px] text-[#999]">
              · {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
            </span>
            {comment.isPrivate && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#004a9c]/10 text-[#004a9c] text-[11px] font-medium">
                <Lock className="w-3 h-3" />
                비공개
              </span>
            )}
          </div>
          <p className="text-[14px] leading-[1.5] tracking-[-0.35px] text-[#666]">
            {comment.content}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              onClick={() => onReplyClick(comment.id)}
              className="text-[12px] text-[#999] hover:text-[#004a9c] transition-colors"
            >
              답글쓰기
            </button>
          </div>
        </div>
      </div>

      {/* Replies inside same card */}
      {comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <div
              key={reply.id}
              className="flex gap-3 px-4 py-3 ml-6"
            >
              <CornerDownRight className="w-4 h-4 text-[#ccc] flex-shrink-0 mt-0.5" />
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={reply.author.avatar} />
                <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[13px] text-[#333]">
                    {reply.author.name}
                  </span>
                  <span className="text-[11px] text-[#999]">
                    {reply.author.department}
                  </span>
                  <span className="text-[11px] text-[#999]">
                    · {new Date(reply.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                  {reply.isPrivate && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#004a9c]/10 text-[#004a9c] text-[11px] font-medium">
                      <Lock className="w-3 h-3" />
                      비공개
                    </span>
                  )}
                </div>
                <p className="text-[13px] leading-[1.5] tracking-[-0.35px] text-[#666]">
                  {reply.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Form inside same card */}
      {isReplying && (
        <div className="px-4 py-3 rounded-b-lg">
          <div className="flex gap-3 ml-6">
            <CornerDownRight className="w-4 h-4 text-[#ccc] flex-shrink-0 mt-2.5" />
            <div className="flex-1 flex flex-col gap-2">
              <Textarea
                placeholder="답글을 입력해 주세요..."
                value={replyContent}
                onChange={(e) => onReplyContentChange(e.target.value)}
                rows={2}
                className="resize-none text-[14px]"
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onPrivateReplyToggle}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                    isPrivateReply
                      ? "bg-[#004a9c]/10 text-[#004a9c] border border-[#004a9c]"
                      : "bg-[#f0f0f0] text-[#999] border border-[#e5e5e5]"
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  {isPrivateReply ? "비공개" : "공개"}
                </button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={onReplyCancel}
                    disabled={isSubmitting}
                    className="h-8 px-4 bg-white border border-[#ccc] text-[#666] hover:bg-gray-50 rounded-[8px] text-[13px]"
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    onClick={() => onReplySubmit(comment.id)}
                    disabled={isSubmitting}
                    className="h-8 px-4 bg-[#004a9c] hover:bg-[#004a9c]/90 text-white rounded-[8px] text-[13px] gap-1.5"
                  >
                    <Send className="h-3 w-3" />
                    {isSubmitting ? "등록 중..." : "답글 등록"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState("intro");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(193);
  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(
    SAMPLE_MARKDOWN_CONTENT
  );
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [isPrivateComment, setIsPrivateComment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isPrivateReply, setIsPrivateReply] = useState(false);

  // Refs for scroll
  const introRef = useRef<HTMLDivElement>(null);
  const filesRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  // In a real app, this would be async and fetched from an API
  const portfolio = {
    id: resolvedParams.id,
    title: "EveryQuest",
    description: `EveryQuest는 FC온라인 공경 매칭된 유저를 빠르게 요약해주고, 이기기 위한 맞춤형 퀘스트를 제공합니다.

- 전술 리포트(내 전술/상대 전술): 최근 전적 기반 포메이션·플레이 스타일·강/약점 자동 요약
- 경기 전 프리뷰: 예상 포메이션/키 플레이어/주의 포인트 체크리스트
- 승리 퀘스트 제안: 매칭된 구단주를 이기기 위한 맞춤 퀘스트 5–6개 + 도전 과제 1–2개 (경기 중 실천형) - 전적 대시보드: 점유율, 패스/슈팅 유형, 실점 패턴 등 핵심 지표와 태그 자동 추출
- 굴리트 지수: 현재 시세 추이를 굴리트 시세로 시각화하여 제공합니다.`,
    thumbnail: "https://picsum.photos/id/119/800/600",
    images: [
      "https://picsum.photos/id/119/800/600",
      "https://picsum.photos/id/164/800/600",
      "https://picsum.photos/id/180/800/600",
    ],
    videoUrl: "https://youtube.com/watch?v=example",
    githubUrl: "https://github.com/example/everyquest",
    tags: ["React", "Frontend"],
    stats: {
      likes: 193,
      comments: 18,
    },
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleContentChange = (content: string) => {
    setMarkdownContent(content);
  };

  const scrollToSection = (section: "intro" | "files" | "comments") => {
    setActiveTab(section);
    const refs = {
      intro: introRef,
      files: filesRef,
      comments: commentsRef,
    };
    const targetRef = refs[section];
    if (targetRef.current && tabBarRef.current) {
      const tabBarHeight = tabBarRef.current.offsetHeight;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - tabBarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: "현재 사용자",
          avatar: "/placeholder-user.jpg",
          department: "소프트웨어학과",
        },
        content: newComment,
        createdAt: new Date().toISOString().split("T")[0],
        isPrivate: isPrivateComment,
        replies: [],
      };

      setComments([comment, ...comments]);
      setNewComment("");
      setIsPrivateComment(false);
      alert("댓글이 등록되었습니다");
    } catch (error) {
      alert("댓글 등록에 실패했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    if (!replyContent.trim()) {
      alert("답글 내용을 입력해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const reply: Comment = {
        id: `${parentId}-${Date.now()}`,
        author: {
          name: "현재 사용자",
          avatar: "/placeholder-user.jpg",
          department: "소프트웨어학과",
        },
        content: replyContent,
        createdAt: new Date().toISOString().split("T")[0],
        isPrivate: isPrivateReply,
        replies: [],
      };

      const addReply = (list: Comment[]): Comment[] =>
        list.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...c.replies, reply] }
            : { ...c, replies: addReply(c.replies) }
        );

      setComments(addReply(comments));
      setReplyContent("");
      setReplyingTo(null);
      setIsPrivateReply(false);
      alert("답글이 등록되었습니다");
    } catch (error) {
      alert("답글 등록에 실패했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const countTotalComments = (list: Comment[]): number =>
    list.reduce((sum, c) => sum + 1 + countTotalComments(c.replies), 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="mx-auto max-w-[1440px] py-20 px-6">
        <div className="flex flex-col gap-10">
          {/* Like Button */}
          <div className="flex justify-end">
            <button
              onClick={handleLike}
              className={`flex items-center gap-[6px] h-8 px-4 py-[6px] rounded-full border transition-colors ${
                isLiked
                  ? "border-[#004a9c] bg-[#004a9c] text-white"
                  : "border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
                {likes}
              </span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex gap-10">
            {/* Thumbnail */}
            <div className="relative h-[383px] w-[680px] rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={portfolio.thumbnail}
                alt={portfolio.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between h-[375px] flex-1">
              <div className="flex flex-col gap-5">
                {/* Title */}
                <h1 className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#333]">
                  {portfolio.title}
                </h1>

                {/* Description */}
                <div className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666] whitespace-pre-line">
                  {portfolio.description}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                <Link
                  href={portfolio.videoUrl}
                  target="_blank"
                  className="flex items-center gap-[6px] h-8 px-4 py-[6px] rounded-full border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5 transition-colors"
                >
                  <span className="text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
                    시연영상
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href={portfolio.githubUrl}
                  target="_blank"
                  className="flex items-center gap-[6px] h-8 px-4 py-[6px] rounded-full border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5 transition-colors"
                >
                  <span className="text-[12px] font-medium leading-[1.33] tracking-[-0.3px]">
                    Github
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-20 z-50 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-[1440px] px-6">
          <div ref={tabBarRef} className="flex h-14">
            <button
              onClick={() => scrollToSection("intro")}
              className={`flex-1 flex items-center justify-center px-6 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.4px] ${
                activeTab === "intro"
                  ? "border-b-2 border-[#004a9c] text-[#666]"
                  : "border-b-2 border-[#e5e5e5] text-[#666]"
              }`}
            >
              포트폴리오 소개
            </button>
            <button
              onClick={() => scrollToSection("files")}
              className={`flex-1 flex items-center justify-center px-6 py-3 text-[14px] font-medium leading-[1.43] tracking-[-0.35px] ${
                activeTab === "files"
                  ? "border-b-2 border-[#004a9c] text-[#666]"
                  : "border-b-2 border-[#e5e5e5] text-[#666]"
              }`}
            >
              첨부파일
            </button>
            <button
              onClick={() => scrollToSection("comments")}
              className={`flex-1 flex items-center justify-center px-6 py-3 text-[14px] font-medium leading-[1.43] tracking-[-0.35px] ${
                activeTab === "comments"
                  ? "border-b-2 border-[#004a9c] text-[#666]"
                  : "border-b-2 border-[#e5e5e5] text-[#666]"
              }`}
            >
              댓글 {countTotalComments(comments)}
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mx-auto max-w-[1440px] px-6 pb-20">
        <div className="flex flex-col gap-[80px]">
          {/* Portfolio Introduction Section */}
          <div ref={introRef} className="flex flex-col gap-10 pt-[60px]">
            {/* Edit/Preview Toggle */}
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "default" : "outline"}
                className={
                  isEditing
                    ? "bg-[#004a9c] hover:bg-[#004a9c]/90 text-white"
                    : "border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5"
                }
              >
                {isEditing ? "프리뷰 모드" : "편집 모드"}
              </Button>
              {isEditing && (
                <Button
                  onClick={() => {
                    alert("저장되었습니다!");
                    setIsEditing(false);
                  }}
                  className="bg-[#10A259] hover:bg-[#0F7B4B] text-white"
                >
                  저장하기
                </Button>
              )}
            </div>

            {/* Content Editor/Preview */}
            <div className="flex flex-col gap-5">
              <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                {isEditing ? "포트폴리오 편집" : "포트폴리오"}
              </h2>
              <PortfolioContentEditor
                content={markdownContent}
                onChange={handleContentChange}
                editable={isEditing}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
                태그
              </h2>
              <div className="flex gap-2">
                {portfolio.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center justify-center px-3 py-1 rounded-xl border border-[#003876] text-[#003876] text-[12px] font-medium leading-[1.33] tracking-[-0.3px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div ref={filesRef} className="flex flex-col gap-5 pt-[60px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
              첨부파일
            </h2>
            {MOCK_ATTACHMENTS.length > 0 ? (
              <div className="flex flex-col gap-3">
                {MOCK_ATTACHMENTS.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#004a9c]" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px] text-[#333]">
                          {file.name}
                        </span>
                        <span className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999]">
                          {file.size} · {file.uploadedAt}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#004a9c] hover:bg-[#004a9c]/5"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                첨부된 파일이 없습니다.
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div ref={commentsRef} className="flex flex-col gap-5 pt-[60px]">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
              댓글 {countTotalComments(comments)}
            </h2>

            {/* Comment Form */}
            <form
              onSubmit={handleCommentSubmit}
              className="flex flex-col gap-3"
            >
              <Textarea
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsPrivateComment(!isPrivateComment)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                    isPrivateComment
                      ? "bg-[#004a9c]/10 text-[#004a9c] border border-[#004a9c]"
                      : "bg-[#f0f0f0] text-[#999] border border-[#e5e5e5]"
                  }`}
                >
                  <Lock className="w-3 h-3" />
                  {isPrivateComment ? "비공개" : "공개"}
                </button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "등록 중..." : "댓글 등록"}
                </Button>
              </div>
            </form>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <CommentItemUI
                    key={comment.id}
                    comment={comment}
                    replyingTo={replyingTo}
                    replyContent={replyContent}
                    isPrivateReply={isPrivateReply}
                    isSubmitting={isSubmitting}
                    onReplyClick={(id) => {
                      setReplyingTo(replyingTo === id ? null : id);
                      setReplyContent("");
                      setIsPrivateReply(false);
                    }}
                    onReplyContentChange={setReplyContent}
                    onPrivateReplyToggle={() => setIsPrivateReply(!isPrivateReply)}
                    onReplySubmit={handleReplySubmit}
                    onReplyCancel={() => {
                      setReplyingTo(null);
                      setReplyContent("");
                      setIsPrivateReply(false);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                댓글이 없습니다.
              </div>
            )}
          </div>

          {/* Back to List Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => router.push("/portfolio")}
              className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-12 w-[150px] rounded-lg px-8 py-3 text-[16px] font-medium leading-[1.5] tracking-[-0.4px]"
            >
              목록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
