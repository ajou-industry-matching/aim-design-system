"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";
import {
  mockUsers,
  type BaseRole,
  type AdminRole,
  type MockUser,
} from "@/components/admin/user-management-table";

// 현재 로그인한 관리자 (실제 서비스에서는 auth context에서 가져옴)
const CURRENT_ADMIN_ROLE: AdminRole = "슈퍼관리자";

function getMockUser(id: string): MockUser {
  const found = mockUsers.find((u) => u.id === id);
  if (found) return { ...found };
  return {
    id,
    name: `사용자${id}`,
    email: `user${id}@ajou.ac.kr`,
    baseRole: "학생",
    adminRole: null,
    portfolios: 0,
    lastActivity: new Date(2025, 0, 1).toLocaleDateString("ko-KR"),
    joinedAt: new Date(2023, 0, 1).toLocaleDateString("ko-KR"),
    status: "정상",
  };
}

// 셀렉트 공통 스타일
const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<MockUser>(getMockUser(userId));
  const [isEditing, setIsEditing] = useState(false);

  const isSuperAdmin = CURRENT_ADMIN_ROLE === "슈퍼관리자";

  // 역할 셀렉트 값: 슈퍼관리자면 "슈퍼관리자", 아니면 baseRole
  const roleSelectValue =
    user.adminRole === "슈퍼관리자" ? "슈퍼관리자" : (user.baseRole ?? "학생");

  // 관리자 유형 셀렉트 값: 일반관리자 여부
  const adminTypeValue: "없음" | "일반관리자" =
    user.adminRole === "일반관리자" ? "일반관리자" : "없음";

  const handleRoleChange = (value: string) => {
    if (value === "슈퍼관리자") {
      setUser({ ...user, adminRole: "슈퍼관리자", baseRole: null });
    } else {
      // 슈퍼관리자에서 일반 역할로 변경 시 adminRole 초기화
      const newAdminRole =
        user.adminRole === "슈퍼관리자" ? null : user.adminRole;
      setUser({ ...user, baseRole: value as BaseRole, adminRole: newAdminRole });
    }
  };

  const handleAdminTypeChange = (value: string) => {
    setUser({
      ...user,
      adminRole: value === "일반관리자" ? "일반관리자" : null,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("사용자 정보가 저장되었습니다.");
  };

  const handleDelete = () => {
    if (confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      router.push("/admin/users");
    }
  };

  const handleStatusToggle = () => {
    setUser({ ...user, status: user.status === "정상" ? "비정상" : "정상" });
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
            <h1 className="text-[32px] font-bold text-[#111]">사용자 상세 정보</h1>
            <p className="text-[14px] text-[#666]">
              사용자 정보를 조회하고 수정할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={() => {
                  setUser(getMockUser(userId));
                  setIsEditing(false);
                }}
                variant="outline"
                className="border border-[#e5e5e5] text-[#111] hover:bg-[#f5f5f5] h-[40px] rounded-lg px-6 text-[14px] font-medium"
              >
                취소
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 text-[14px] font-medium"
              >
                저장
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#004a9c] hover:bg-[#004a9c]/90 text-white h-[40px] rounded-lg px-6 text-[14px] font-medium"
            >
              수정
            </Button>
          )}
          <Button
            onClick={handleDelete}
            variant="outline"
            className="border border-red-500 text-red-500 hover:bg-red-500/5 h-[40px] rounded-lg px-6 text-[14px] font-medium gap-2"
          >
            <Trash2 size={18} />
            삭제
          </Button>
        </div>
      </div>

      {/* Basic Info Card */}
      <div className="bg-white border border-[#e5e5e5] rounded-lg p-8">
        <h2 className="text-[20px] font-semibold text-[#111] mb-6">기본 정보</h2>
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

          {/* 역할 */}
          <div className="space-y-2">
            <Label htmlFor="role">역할</Label>
            <select
              id="role"
              value={roleSelectValue}
              onChange={(e) => handleRoleChange(e.target.value)}
              disabled={!isEditing}
              className={selectClass}
            >
              <option value="학생">학생</option>
              <option value="교수">교수</option>
              <option value="기업">기업</option>
              <option value="슈퍼관리자">슈퍼관리자</option>
            </select>
          </div>

          {/* 관리자 유형 — 슈퍼관리자만 편집 가능, 슈퍼관리자 역할 선택 시 비활성화 */}
          <div className="space-y-2">
            <Label htmlFor="adminType">
              관리자 권한
              {!isSuperAdmin && (
                <span className="ml-2 text-[11px] text-[#aaa] font-normal">
                  (슈퍼관리자만 변경 가능)
                </span>
              )}
            </Label>
            <select
              id="adminType"
              value={adminTypeValue}
              onChange={(e) => handleAdminTypeChange(e.target.value)}
              disabled={!isEditing || !isSuperAdmin || user.adminRole === "슈퍼관리자"}
              className={selectClass}
            >
              <option value="없음">없음</option>
              <option value="일반관리자">일반관리자</option>
            </select>
            {user.adminRole === "슈퍼관리자" && isEditing && (
              <p className="text-[11px] text-[#aaa]">
                슈퍼관리자는 역할에서 직접 변경하세요.
              </p>
            )}
          </div>

          {/* Portfolios */}
          <div className="space-y-2">
            <Label htmlFor="portfolios">게시글 수</Label>
            <Input id="portfolios" value={user.portfolios} disabled className="bg-[#f5f5f5]" />
          </div>

          {/* Last Activity */}
          <div className="space-y-2">
            <Label htmlFor="lastActivity">마지막 활동</Label>
            <Input id="lastActivity" value={user.lastActivity} disabled className="bg-[#f5f5f5]" />
          </div>

          {/* Joined At */}
          <div className="space-y-2">
            <Label htmlFor="joinedAt">가입일</Label>
            <Input id="joinedAt" value={user.joinedAt} disabled className="bg-[#f5f5f5]" />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">상태</Label>
            <div className="flex items-center gap-3">
              <Input id="status" value={user.status} disabled className="bg-[#f5f5f5]" />
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
            <Input id="userId" value={user.id} disabled className="bg-[#f5f5f5]" />
          </div>
        </div>
      </div>
    </div>
  );
}
