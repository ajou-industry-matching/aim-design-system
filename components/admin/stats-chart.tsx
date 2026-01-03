"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "1월", portfolios: 45, users: 120 },
  { name: "2월", portfolios: 52, users: 145 },
  { name: "3월", portfolios: 61, users: 178 },
  { name: "4월", portfolios: 78, users: 210 },
  { name: "5월", portfolios: 89, users: 245 },
  { name: "6월", portfolios: 102, users: 289 },
]

export function StatsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 통계</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="portfolios" fill="hsl(var(--primary))" name="포트폴리오" />
            <Bar dataKey="users" fill="hsl(var(--muted-foreground))" name="사용자" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
