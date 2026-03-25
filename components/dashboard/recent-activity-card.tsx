'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ClipboardList, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface ExamTemplate {
  id: string
  name: string
  hskLevel: number
  totalScore: number
  passScore: number
  durationMins: number
}

interface ExamRecord {
  id: string
  status: string
  submittedAt: Date | string | null
  totalScore: number | null
  passed: boolean | null
  timeSpentSecs: number | null
  template: ExamTemplate
}

interface RecentActivityCardProps {
  recentExams: ExamRecord[]
}

function formatTime(secs: number | null): string {
  if (!secs) return '-'
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function RecentActivityCard({ recentExams }: RecentActivityCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <ClipboardList className="h-4 w-4 text-primary" />
            最近考试记录
          </CardTitle>
          <Link
            href="/exam"
            className="text-sm text-primary hover:underline"
          >
            查看全部
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {recentExams.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ClipboardList className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">暂无考试记录</p>
            <Link
              href="/exam"
              className="text-sm text-primary hover:underline mt-1 inline-block"
            >
              开始第一次模拟考试
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 pr-4 font-medium">考试名称</th>
                  <th className="text-center py-2 pr-4 font-medium">HSK等级</th>
                  <th className="text-center py-2 pr-4 font-medium">得分</th>
                  <th className="text-center py-2 pr-4 font-medium">结果</th>
                  <th className="text-center py-2 pr-4 font-medium">用时</th>
                  <th className="text-left py-2 font-medium">日期</th>
                </tr>
              </thead>
              <tbody>
                {recentExams.map((exam) => (
                  <tr key={exam.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/exam/${exam.id}/result`}
                        className="hover:underline text-foreground font-medium"
                      >
                        {exam.template.name}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-center">
                      <Badge variant="outline">HSK {exam.template.hskLevel}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-center font-semibold">
                      {exam.totalScore !== null ? (
                        <span>
                          {exam.totalScore}
                          <span className="text-muted-foreground font-normal">
                            /{exam.template.totalScore}
                          </span>
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-3 pr-4 text-center">
                      {exam.passed === true && (
                        <span className="inline-flex items-center gap-1 text-green-500 text-xs font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          通过
                        </span>
                      )}
                      {exam.passed === false && (
                        <span className="inline-flex items-center gap-1 text-red-500 text-xs font-medium">
                          <XCircle className="h-3.5 w-3.5" />
                          未通过
                        </span>
                      )}
                      {exam.passed === null && (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-center text-muted-foreground">
                      {formatTime(exam.timeSpentSecs)}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {exam.submittedAt ? formatDate(exam.submittedAt as string) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
