import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { 
  Plus, 
  FileText, 
  Users, 
  Settings,
  BarChart3,
  Plane
} from 'lucide-react'

const actions = [
  {
    title: 'Add Flight',
    description: 'Create new flight schedule',
    icon: Plus,
    action: () => console.log('Add Flight')
  },
  {
    title: 'Generate Report',
    description: 'Create financial reports',
    icon: FileText,
    action: () => console.log('Generate Report')
  },
  {
    title: 'Manage Users',
    description: 'User administration',
    icon: Users,
    action: () => console.log('Manage Users')
  },
  {
    title: 'System Settings',
    description: 'Configure system preferences',
    icon: Settings,
    action: () => console.log('System Settings')
  },
  {
    title: 'View Analytics',
    description: 'Business intelligence',
    icon: BarChart3,
    action: () => console.log('View Analytics')
  },
  {
    title: 'Flight Operations',
    description: 'Manage flights',
    icon: Plane,
    action: () => console.log('Flight Operations')
  }
]

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
                onClick={action.action}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{action.title}</span>
                <span className="text-xs text-muted-foreground">{action.description}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}