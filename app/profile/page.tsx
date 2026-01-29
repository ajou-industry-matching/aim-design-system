"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Grid3x3, Heart } from "lucide-react";
import { PortfolioCard } from "@/components/home/portfolio-card";

// Mock user data
const mockUser = {
  name: "김철수",
  email: "chulsoo.kim@ajou.ac.kr",
  affiliation: "아주대학교 소프트웨어학과",
  userType: "학생" as "기업" | "학생" | "교수",
  bio: "웹 개발과 UI/UX 디자인에 관심이 많은 학생입니다.",
  portfolioCount: 12,
  likedCount: 8,
};

// Mock portfolio data
const mockMyPortfolios = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/seed/react-web/800/600",
    tags: ["#React", "#Frontend"],
    title: "React 기반 웹 애플리케이션",
    description:
      "Next.js와 TypeScript를 활용한 현대적인 웹 개발 프로젝트입니다.",
    author: "김철수",
    date: "2025.12.15.",
    likes: 45,
    comments: 23,
    views: 890,
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/seed/uiux-design/800/600",
    tags: ["#UI/UX", "#Figma"],
    title: "반응형 디자인 시스템",
    description:
      "Figma를 활용한 일관된 UI/UX 디자인 시스템 구축 프로젝트입니다.",
    author: "김철수",
    date: "2025.12.14.",
    likes: 38,
    comments: 15,
    views: 672,
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/seed/flutter-mobile/800/600",
    tags: ["#Flutter", "#Mobile"],
    title: "크로스 플랫폼 모바일 앱",
    description: "Flutter로 개발한 iOS/Android 동시 지원 앱 개발 사례입니다.",
    author: "김철수",
    date: "2025.12.10.",
    likes: 52,
    comments: 19,
    views: 756,
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/seed/data-visualization/800/600",
    tags: ["#Data", "#Visualization"],
    title: "데이터 시각화 대시보드",
    description:
      "D3.js와 React를 활용한 인터랙티브 데이터 시각화 프로젝트입니다.",
    author: "김철수",
    date: "2025.12.06.",
    likes: 36,
    comments: 14,
    views: 623,
  },
  {
    id: "5",
    thumbnail: "https://picsum.photos/seed/ai-chatbot/800/600",
    tags: ["#AI", "#Chatbot"],
    title: "AI 기반 챗봇 서비스",
    description:
      "자연어 처리 기술을 활용한 대화형 AI 챗봇 개발 프로젝트입니다.",
    author: "김철수",
    date: "2025.12.05.",
    likes: 41,
    comments: 17,
    views: 734,
  },
  {
    id: "6",
    thumbnail: "https://picsum.photos/seed/web3-dapp/800/600",
    tags: ["#Blockchain", "#Web3"],
    title: "스마트 컨트랙트 DApp",
    description: "Ethereum 기반의 탈중앙화 애플리케이션 개발 프로젝트입니다.",
    author: "김철수",
    date: "2025.12.01.",
    likes: 48,
    comments: 21,
    views: 934,
  },
  {
    id: "7",
    thumbnail: "https://picsum.photos/seed/realtime-chat/800/600",
    tags: ["#React", "#Node.js"],
    title: "실시간 채팅 애플리케이션",
    description: "WebSocket을 활용한 실시간 메시징 플랫폼입니다.",
    author: "김철수",
    date: "2025.12.03.",
    likes: 42,
    comments: 18,
    views: 812,
  },
  {
    id: "8",
    thumbnail: "https://picsum.photos/seed/unity-game/800/600",
    tags: ["#Unity", "#Game"],
    title: "3D 액션 게임 프로토타입",
    description: "Unity 엔진을 사용한 3D 액션 게임 개발 프로젝트입니다.",
    author: "김철수",
    date: "2025.12.07.",
    likes: 55,
    comments: 32,
    views: 1456,
  },
  {
    id: "9",
    thumbnail: "https://picsum.photos/seed/ai-python/800/600",
    tags: ["#Python", "#AI"],
    title: "딥러닝 이미지 분류 모델",
    description:
      "TensorFlow와 Keras를 사용한 이미지 분류 딥러닝 프로젝트입니다.",
    author: "김철수",
    date: "2025.12.13.",
    likes: 62,
    comments: 28,
    views: 1234,
  },
];

const mockLikedPortfolios = [
  {
    id: "10",
    thumbnail: "https://picsum.photos/seed/hci-vr/800/600",
    tags: ["#연구실", "#HCI"],
    title: "차세대 인간-컴퓨터 상호작용 연구",
    description:
      "VR/AR 기술을 활용한 몰입형 사용자 인터페이스 연구 프로젝트입니다.",
    author: "HCI Lab",
    date: "2025.12.11.",
    likes: 92,
    comments: 45,
    views: 2134,
  },
  {
    id: "11",
    thumbnail: "https://picsum.photos/seed/cloud-saas/800/600",
    tags: ["#기업", "#클라우드"],
    title: "클라우드 기반 SaaS 플랫폼",
    description: "AWS를 활용한 확장 가능한 B2B SaaS 솔루션 개발 사례입니다.",
    author: "클라우드이노베이션",
    date: "2025.12.05.",
    likes: 61,
    comments: 27,
    views: 1342,
  },
  {
    id: "12",
    thumbnail: "https://picsum.photos/seed/iot-smart/800/600",
    tags: ["#IoT", "#SmartHome"],
    title: "IoT 스마트홈 시스템",
    description: "사물인터넷 기술을 활용한 지능형 홈 자동화 시스템입니다.",
    author: "스마트홈랩",
    date: "2025.12.08.",
    likes: 78,
    comments: 34,
    views: 1567,
  },
  {
    id: "13",
    thumbnail: "https://picsum.photos/seed/blockchain-tech/800/600",
    tags: ["#기업", "#블록체인"],
    title: "NFT 마켓플레이스 플랫폼",
    description:
      "블록체인 기반 디지털 자산 거래 플랫폼 개발 및 운영 사례입니다.",
    author: "블록체인솔루션즈",
    date: "2025.12.09.",
    likes: 76,
    comments: 38,
    views: 1789,
  },
  {
    id: "14",
    thumbnail: "https://picsum.photos/seed/robotics-ai/800/600",
    tags: ["#연구실", "#로보틱스"],
    title: "자율주행 로봇 시스템 개발",
    description: "AI와 센서 융합 기술을 활용한 실내 자율주행 로봇 연구입니다.",
    author: "Robotics Lab",
    date: "2025.12.08.",
    likes: 85,
    comments: 42,
    views: 1923,
  },
  {
    id: "15",
    thumbnail: "https://picsum.photos/seed/bigdata-network/800/600",
    tags: ["#연구실", "#빅데이터"],
    title: "소셜 네트워크 분석 연구",
    description:
      "대규모 그래프 데이터 분석 및 커뮤니티 탐지 알고리즘 연구입니다.",
    author: "Data Science Lab",
    date: "2025.12.04.",
    likes: 68,
    comments: 35,
    views: 1678,
  },
  {
    id: "16",
    thumbnail: "https://picsum.photos/seed/voice-recognition/800/600",
    tags: ["#AI", "#Voice"],
    title: "음성 인식 시스템",
    description: "딥러닝 기반 음성 인식 및 자연어 처리 시스템입니다.",
    author: "음성인식연구소",
    date: "2025.12.02.",
    likes: 71,
    comments: 29,
    views: 1423,
  },
  {
    id: "17",
    thumbnail: "https://picsum.photos/seed/ar-shopping/800/600",
    tags: ["#AR", "#Mobile"],
    title: "AR 기반 쇼핑 애플리케이션",
    description:
      "증강현실 기술을 활용한 혁신적인 온라인 쇼핑 경험 제공 앱입니다.",
    author: "AR쇼핑",
    date: "2025.12.01.",
    likes: 64,
    comments: 22,
    views: 1156,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"my-posts" | "liked">("my-posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const currentPortfolios =
    activeTab === "my-posts" ? mockMyPortfolios : mockLikedPortfolios;

  // Check admin mode from localStorage on mount
  useEffect(() => {
    const adminMode = localStorage.getItem("isAdminMode");
    setIsAdminMode(adminMode === "true");
  }, []);

  const handleSaveProfile = () => {
    // TODO: API 호출로 프로필 업데이트
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-[1440px] py-16 px-4">
        {/* Profile Header */}
        <div className="flex gap-[100px] mb-12 items-start">
          {/* Profile Picture */}
          <div className="w-[150px] h-[150px] rounded-full bg-[#004a9c] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[48px] font-bold">
              {mockUser.name.charAt(0)}
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1">
            {/* Username and Buttons */}
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-[20px] font-normal text-[#111]">
                {mockUser.name}
              </h1>
              <Button
                onClick={() => setIsEditModalOpen(true)}
                variant="outline"
                className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                프로필 편집
              </Button>
              <Button
                asChild
                className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2"
              >
                <Link href="/create/portfolio">
                  <Upload size={18} />
                  포트폴리오 업로드
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 mb-4">
              <div className="text-[16px] text-[#111]">
                게시물{" "}
                <span className="font-semibold">{mockUser.portfolioCount}</span>
              </div>
              <div className="text-[16px] text-[#111]">
                좋아요{" "}
                <span className="font-semibold">{mockUser.likedCount}</span>
              </div>
            </div>

            {/* Email and Type */}
            <div className="mb-3 flex items-center gap-3">
              <div className="text-[14px] font-semibold text-[#111]">
                {mockUser.email}
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#004a9c]/10 text-[#004a9c] text-[12px] font-medium">
                {mockUser.userType}
              </div>
              {isAdminMode && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[12px] font-medium">
                  관리자
                </div>
              )}
            </div>

            {/* Affiliation and Bio */}
            <div className="text-[14px] text-[#111] mb-1">
              {mockUser.affiliation}
            </div>
            <div className="text-[14px] text-[#666]">{mockUser.bio}</div>
          </div>
        </div>

        {/* Tab Menu */}
        <div className="border-t border-[#e5e5ec] mb-8">
          <div className="flex justify-start">
            <button
              onClick={() => setActiveTab("my-posts")}
              className={`flex items-center gap-2 px-8 py-4 border-t-2 transition-colors ${
                activeTab === "my-posts"
                  ? "border-[#004a9c] text-[#004a9c]"
                  : "border-transparent text-[#999] hover:text-[#666]"
              }`}
            >
              <Grid3x3 size={20} />
              <span className="text-[14px] font-medium">내 게시글</span>
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={`flex items-center gap-2 px-8 py-4 border-t-2 transition-colors ${
                activeTab === "liked"
                  ? "border-[#004a9c] text-[#004a9c]"
                  : "border-transparent text-[#999] hover:text-[#666]"
              }`}
            >
              <Heart size={20} />
              <span className="text-[14px] font-medium">좋아요한 게시글</span>
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPortfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} {...portfolio} />
          ))}
        </div>

        {/* Empty State */}
        {currentPortfolios.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[16px] text-[#999]">
              {activeTab === "my-posts"
                ? "아직 작성한 포트폴리오가 없습니다."
                : "아직 좋아요한 게시글이 없습니다."}
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b border-[#e5e5e5] p-4 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#111]">
                프로필 편집
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-[#999] hover:text-[#111] text-[24px]"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              </div>

              {/* Affiliation */}
              <div className="space-y-2">
                <Label htmlFor="affiliation">소속</Label>
                <Input
                  id="affiliation"
                  type="text"
                  value={editedUser.affiliation}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      affiliation: e.target.value,
                    })
                  }
                />
              </div>

              {/* User Type */}
              <div className="space-y-2">
                <Label htmlFor="userType">회원 종류</Label>
                <select
                  id="userType"
                  value={editedUser.userType}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      userType: e.target.value as "기업" | "학생" | "교수",
                    })
                  }
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  <option value="학생">학생</option>
                  <option value="교수">교수</option>
                  <option value="기업">기업</option>
                </select>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">자기소개</Label>
                <Textarea
                  id="bio"
                  value={editedUser.bio}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, bio: e.target.value })
                  }
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#e5e5e5] p-4 flex justify-end gap-2">
              <Button
                onClick={() => setIsEditModalOpen(false)}
                variant="outline"
                className="border border-[#004a9c] text-[#004a9c] hover:bg-[#004a9c]/5 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                취소
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                저장
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
