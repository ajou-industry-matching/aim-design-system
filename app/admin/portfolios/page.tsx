import { PortfolioManagementTable } from "@/components/admin/portfolio-management-table"

export default function AdminPortfoliosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">포트폴리오 관리</h1>
        <p className="text-muted-foreground">모든 포트폴리오를 관리하고 검토하세요</p>
      </div>

      <PortfolioManagementTable />
    </div>
  )
}
