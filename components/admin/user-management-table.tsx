"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

// Mock data
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  name: `사용자${i + 1}`,
  email: `user${i + 1}@ajou.ac.kr`,
  role: i < 3 ? "관리자" : i < 10 ? "교수" : i < 30 ? "학생" : "기업",
  portfolios: Math.floor((i * 7 + 3) % 20),
  lastActivity: new Date(
    2025,
    0,
    20 - (i % 30)
  ).toLocaleDateString("ko-KR"),
  joinedAt: new Date(2023 + (i % 2), (i % 12), (i % 28) + 1).toLocaleDateString(
    "ko-KR"
  ),
  status: i % 10 === 0 ? "비정상" : "정상",
}));

const ITEMS_PER_PAGE = 10;

export function UserManagementTable() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleRowClick = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
          <Input
            placeholder="이름 또는 이메일 검색..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full border-collapse">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                사용자
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center">
                이메일
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                권한
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[120px]">
                게시글
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[140px]">
                마지막 활동
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[140px]">
                가입일
              </TableHead>
              <TableHead className="bg-[#f2f2f2] border-[#e5e5e5] border-b border-t-2 border-l h-12 px-5 py-3 text-[#333] text-[16px] font-semibold leading-[1.5] tracking-[-0.4px] text-center w-[100px]">
                상태
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user.id)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {user.name}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {user.email}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${
                      user.role === "관리자"
                        ? "bg-red-500/10 text-red-500"
                        : user.role === "교수"
                        ? "bg-[#004a9c]/10 text-[#004a9c]"
                        : user.role === "학생"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-purple-500/10 text-purple-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {user.portfolios}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {user.lastActivity}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-l-0 min-h-[56px] px-5 py-4 text-[#333] text-[14px] leading-[1.43] tracking-[-0.35px] text-center">
                  {user.joinedAt}
                </TableCell>
                <TableCell className="bg-white border border-[#e5e5e5] border-t-0 border-r-0 min-h-[56px] px-5 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium ${
                      user.status === "정상"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
