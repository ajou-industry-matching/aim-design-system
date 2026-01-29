"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";

// Mock user data
const getMockUser = (id: string) => ({
  id,
  name: `사용자${id}`,
  email: `user${id}@ajou.ac.kr`,
  role: parseInt(id) < 3 ? "관리자" : parseInt(id) < 10 ? "교수" : parseInt(id) < 30 ? "학생" : "기업",
  portfolios: Math.floor((parseInt(id) * 7 + 3) % 20),
  lastActivity: new Date(2025, 0, 20 - (parseInt(id) % 30)).toLocaleDateString("ko-KR"),
  joinedAt: new Date(2023 + (parseInt(id) % 2), (parseInt(id) % 12), (parseInt(id) % 28) + 1).toLocaleDateString("ko-KR"),
  status: parseInt(id) % 10 === 0 ? "비정상" : "정상",
});

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState(getMockUser(userId));
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // TODO: API 호출로 사용자 업데이트
    setIsEditing(false);
    alert("사용자 정보가 저장되었습니다.");
  };

  const handleDelete = () => {
    if (confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      // TODO: API 호출로 사용자 삭제
      router.push("/admin/users");
    }
  };

  const handleStatusToggle = () => {
    setUser({
      ...user,
      status: user.status === "정상" ? "비정상" : "정상",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/users")}
            className="h-[40px] w-[40px]"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-[32px] font-bold text-[#111]">
              사용자 상세 정보
            </h1>
            <p className="text-[14px] text-[#666]">
              사용자 정보를 조회하고 수정할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                취소
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
              >
                저장
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px]"
            >
              수정
            </Button>
          )}
          <Button
            onClick={handleDelete}
            variant="outline"
            className="border border-red-500 text-red-500 hover:bg-red-500/5 h-[40px] rounded-lg px-6 py-[10px] text-[14px] font-medium leading-[1.43] tracking-[-0.35px] gap-2"
          >
            <Trash2 size={18} />
            삭제
          </Button>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
        <h2 className="text-[20px] font-semibold text-[#111] mb-6">
          기본 정보
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">권한</Label>
            <select
              id="role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              disabled={!isEditing}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50"
            >
              <option value="학생">학생</option>
              <option value="교수">교수</option>
              <option value="기업">기업</option>
              <option value="관리자">관리자</option>
            </select>
          </div>

          {/* Portfolios */}
          <div className="space-y-2">
            <Label htmlFor="portfolios">게시글 수</Label>
            <Input
              id="portfolios"
              value={user.portfolios}
              disabled
              className="bg-[#f5f5f5]"
            />
          </div>

          {/* Last Activity */}
          <div className="space-y-2">
            <Label htmlFor="lastActivity">마지막 활동</Label>
            <Input
              id="lastActivity"
              value={user.lastActivity}
              disabled
              className="bg-[#f5f5f5]"
            />
          </div>

          {/* Joined At */}
          <div className="space-y-2">
            <Label htmlFor="joinedAt">가입일</Label>
            <Input
              id="joinedAt"
              value={user.joinedAt}
              disabled
              className="bg-[#f5f5f5]"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">상태</Label>
            <div className="flex items-center gap-3">
              <Input
                id="status"
                value={user.status}
                disabled
                className="bg-[#f5f5f5]"
              />
              {isEditing && (
                <Button
                  onClick={handleStatusToggle}
                  variant="outline"
                  className={`h-[36px] rounded-lg px-4 text-[14px] font-medium ${
                    user.status === "정상"
                      ? "border-red-500 text-red-500 hover:bg-red-500/5"
                      : "border-green-500 text-green-500 hover:bg-green-500/5"
                  }`}
                >
                  {user.status === "정상" ? "정지" : "활성화"}
                </Button>
              )}
            </div>
          </div>

          {/* User ID */}
          <div className="space-y-2">
            <Label htmlFor="userId">사용자 ID</Label>
            <Input
              id="userId"
              value={user.id}
              disabled
              className="bg-[#f5f5f5]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
