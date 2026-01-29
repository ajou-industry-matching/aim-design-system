"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Megaphone, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock stats data
const stats = [
  {
    title: "총 사용자",
    value: "2,847",
    icon: Users,
    color: "bg-[#004a9c]/10 text-[#004a9c]",
  },
  {
    title: "총 공지사항",
    value: "156",
    icon: Megaphone,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "총 포트폴리오",
    value: "1,234",
    icon: FileText,
    color: "bg-green-500/10 text-green-500",
  },
];

// Mock recent users
const recentUsers = [
  {
    id: "1",
    name: "김철수",
    email: "user1@ajou.ac.kr",
    role: "학생",
    date: "2025.01.20",
  },
  {
    id: "2",
    name: "이영희",
    email: "user2@ajou.ac.kr",
    role: "교수",
    date: "2025.01.19",
  },
  {
    id: "3",
    name: "박민수",
    email: "user3@ajou.ac.kr",
    role: "학생",
    date: "2025.01.19",
  },
  {
    id: "4",
    name: "최지원",
    email: "user4@ajou.ac.kr",
    role: "기업",
    date: "2025.01.18",
  },
  {
    id: "5",
    name: "정서연",
    email: "user5@ajou.ac.kr",
    role: "학생",
    date: "2025.01.18",
  },
];

// Mock recent notices
const recentNotices = [
  {
    id: "1",
    title: "2025학년도 1학기 포트폴리오 공모전 안내",
    date: "2025.01.20",
  },
  { id: "2", title: "시스템 정기 점검 안내", date: "2025.01.19" },
  { id: "3", title: "신규 기능 업데이트 안내", date: "2025.01.18" },
  { id: "4", title: "개인정보 처리방침 개정 안내", date: "2025.01.17" },
  { id: "5", title: "겨울방학 운영시간 안내", date: "2025.01.16" },
];

// Quick access cards
const quickAccess = [
  {
    title: "공지사항 관리",
    description: "공지사항을 작성하고 관리합니다",
    href: "/admin/notices",
    icon: Megaphone,
  },
  {
    title: "사용자 관리",
    description: "플랫폼 사용자를 관리합니다",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "소프콘 관리",
    description: "포트폴리오를 관리합니다",
    href: "/admin/portfolios",
    icon: FileText,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[40px] font-bold leading-[1.3] tracking-[-1px] text-[#1a1a1a] mb-2">
          대시보드
        </h1>
        <p className="text-[16px] leading-[1.5] tracking-[-0.4px] text-[#666]">
          플랫폼 전체 현황을 확인하세요
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="border border-[#e5e5e5] rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] leading-[1.43] tracking-[-0.35px] text-[#666] mb-2">
                    {stat.title}
                  </p>
                  <p className="text-[32px] font-bold leading-[1.25] tracking-[-0.8px] text-[#1a1a1a]">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
              최근 가입한 사용자
            </h2>
            <Link href="/admin/users">
              <Button
                variant="ghost"
                className="text-[14px] text-[#004a9c] hover:bg-[#004a9c]/5"
              >
                전체보기
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          <Card className="border border-[#e5e5e5] rounded-lg p-6">
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="text-[14px] font-medium leading-[1.43] tracking-[-0.35px] text-[#1a1a1a]">
                      {user.name}
                    </p>
                    <p className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#666]">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${
                        user.role === "교수"
                          ? "bg-[#004a9c]/10 text-[#004a9c]"
                          : user.role === "학생"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-purple-500/10 text-purple-500"
                      }`}
                    >
                      {user.role}
                    </span>
                    <span className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999]">
                      {user.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Notices */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[24px] font-semibold leading-[1.33] tracking-[-0.6px] text-[#1a1a1a]">
              최근 공지사항
            </h2>
            <Link href="/admin/notices">
              <Button
                variant="ghost"
                className="text-[14px] text-[#004a9c] hover:bg-[#004a9c]/5"
              >
                전체보기
                <ArrowRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          <Card className="border border-[#e5e5e5] rounded-lg p-6">
            <div className="space-y-4">
              {recentNotices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/create/notice?edit=${notice.id}`}
                  className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] last:border-0 last:pb-0 hover:bg-[#f9f9f9] -mx-2 px-2 rounded transition-colors"
                >
                  <p className="text-[14px] leading-[1.43] tracking-[-0.35px] text-[#1a1a1a] flex-1">
                    {notice.title}
                  </p>
                  <span className="text-[12px] leading-[1.33] tracking-[-0.3px] text-[#999] ml-4">
                    {notice.date}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
