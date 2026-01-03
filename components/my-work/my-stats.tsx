import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Heart, MessageSquare, FileText } from "lucide-react"

// Mock stats data
const stats = [
  {
    title: "총 포트폴리오",
    value: "12",
    icon: FileText,
    description: "발행된 포트폴리오",
  },
  {
    title: "총 조회수",
    value: "8,432",
    icon: Eye,
    description: "지난 30일",
  },
  {
    title: "총 좋아요",
    value: "567",
    icon: Heart,
    description: "모든 포트폴리오",
  },
  {
    title: "총 댓글",
    value: "234",
    icon: MessageSquare,
    description: "받은 댓글",
  },
]

export function MyStats() {
  return (
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
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
