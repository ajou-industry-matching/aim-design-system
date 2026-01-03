import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Building2, Eye } from "lucide-react"
import { RecentActivity } from "@/components/admin/recent-activity"
import { StatsChart } from "@/components/admin/stats-chart"

// Mock stats data
const stats = [
  {
    title: "총 사용자",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "총 포트폴리오",
    value: "1,234",
    change: "+8.2%",
    icon: FileText,
  },
  {
    title: "총 조직",
    value: "156",
    change: "+5.1%",
    icon: Building2,
  },
  {
    title: "월간 조회수",
    value: "45.2K",
    change: "+23.4%",
    icon: Eye,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">플랫폼 전체 현황을 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> 지난 달 대비
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <StatsChart />
        <RecentActivity />
      </div>
    </div>
  )
}
