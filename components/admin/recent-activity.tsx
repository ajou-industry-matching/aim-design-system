import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: "1",
    user: { name: "김철수", avatar: "/placeholder-user.jpg" },
    action: "새 포트폴리오 발행",
    target: "AI 기반 학습 도우미",
    time: "5분 전",
    type: "portfolio",
  },
  {
    id: "2",
    user: { name: "이영희", avatar: "/placeholder-user.jpg" },
    action: "조직 가입",
    target: "Web Dev Club",
    time: "12분 전",
    type: "organization",
  },
  {
    id: "3",
    user: { name: "박민수", avatar: "/placeholder-user.jpg" },
    action: "회원가입",
    target: "",
    time: "23분 전",
    type: "user",
  },
  {
    id: "4",
    user: { name: "정수연", avatar: "/placeholder-user.jpg" },
    action: "포트폴리오 수정",
    target: "헬스케어 데이터 시각화",
    time: "1시간 전",
    type: "portfolio",
  },
  {
    id: "5",
    user: { name: "최지훈", avatar: "/placeholder-user.jpg" },
    action: "댓글 작성",
    target: "캠퍼스 네비게이션 앱",
    time: "2시간 전",
    type: "comment",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                  {activity.target && (
                    <>
                      {" "}
                      <span className="font-medium">{activity.target}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
