"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, UserX, Shield, Search } from "lucide-react"
import { toast } from "sonner"

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "김철수",
    email: "kim@ajou.ac.kr",
    avatar: "/placeholder-user.jpg",
    department: "소프트웨어학과",
    role: "user",
    portfolios: 12,
    joinedAt: "2023-09-01",
  },
  {
    id: "2",
    name: "이영희",
    email: "lee@ajou.ac.kr",
    avatar: "/placeholder-user.jpg",
    department: "미디어학과",
    role: "user",
    portfolios: 8,
    joinedAt: "2023-10-15",
  },
  {
    id: "3",
    name: "관리자",
    email: "admin@ajou.ac.kr",
    avatar: "/placeholder-user.jpg",
    department: "관리자",
    role: "admin",
    portfolios: 0,
    joinedAt: "2023-01-01",
  },
]

export function UserManagementTable() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSuspend = (id: string) => {
    toast.success("사용자가 정지되었습니다")
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="이름 또는 이메일 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>사용자</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>학과</TableHead>
              <TableHead>역할</TableHead>
              <TableHead>포트폴리오</TableHead>
              <TableHead>가입일</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                    {user.role === "admin" ? "관리자" : "사용자"}
                  </Badge>
                </TableCell>
                <TableCell>{user.portfolios}</TableCell>
                <TableCell>{new Date(user.joinedAt).toLocaleDateString("ko-KR")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        관리자로 승격
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleSuspend(user.id)}>
                        <UserX className="mr-2 h-4 w-4" />
                        계정 정지
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
