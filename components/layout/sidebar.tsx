'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen, Mic, PenLine, FileText, BarChart2,
  BookMarked, AlertCircle, Settings, Home, GraduationCap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: Home, label: '首页' },
  { href: '/vocabulary', icon: BookOpen, label: '词汇' },
  { href: '/grammar', icon: GraduationCap, label: '语法' },
  { href: '/training/listening', icon: Mic, label: '听力' },
  { href: '/training/reading', icon: FileText, label: '阅读' },
  { href: '/training/writing', icon: PenLine, label: '书写' },
  { href: '/exam', icon: BookMarked, label: '模拟考试' },
  { href: '/error-book', icon: AlertCircle, label: '错题本' },
  { href: '/stats', icon: BarChart2, label: '统计' },
  { href: '/settings', icon: Settings, label: '设置' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r bg-card">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🈶</span>
          <div>
            <div className="font-bold text-sm">HSK 学习平台</div>
            <div className="text-xs text-muted-foreground">Chinese Learning</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
