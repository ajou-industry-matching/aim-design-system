import { UserManagementTable } from "@/components/admin/user-management-table"

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">사용자 관리</h1>
        <p className="text-muted-foreground">플랫폼의 모든 사용자를 관리하세요</p>
      </div>

      <UserManagementTable />
    </div>
  )
}
