import { Card, CardContent } from '@/app/components/ui/card'
import { ReactNode } from 'react'
import { cn } from '@/app/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export default function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <p className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}