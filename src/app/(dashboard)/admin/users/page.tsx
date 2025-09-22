'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  MoreVertical
} from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { Badge } from '@/app/components/ui/badge'
import { formatDate } from '@/app/lib/utils'

const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'customer',
    status: 'active',
    joinedDate: '2024-01-15',
    lastLogin: '2024-06-10T14:30:00',
    bookings: 12,
    totalSpent: 3456.78
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    role: 'customer',
    status: 'active',
    joinedDate: '2024-02-20',
    lastLogin: '2024-06-12T09:15:00',
    bookings: 8,
    totalSpent: 2345.67
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 456-7890',
    role: 'admin',
    status: 'active',
    joinedDate: '2023-11-05',
    lastLogin: '2024-06-13T16:45:00',
    bookings: 23,
    totalSpent: 5678.90
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 321-6547',
    role: 'customer',
    status: 'inactive',
    joinedDate: '2024-03-10',
    lastLogin: '2024-05-28T11:20:00',
    bookings: 3,
    totalSpent: 789.45
  }
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleDeleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default">Admin</Badge>
      case 'customer':
        return <Badge variant="outline">Customer</Badge>
      case 'agent':
        return <Badge variant="secondary">Agent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage your airline customers and user accounts</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airline-red-500"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airline-red-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {filteredUsers.length} users found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-airline-red-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-airline-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-600">ID: {user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        Joined: {formatDate(user.joinedDate)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Last login: {formatDate(user.lastLogin)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center font-medium">
                      {user.bookings}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">
                      ${user.totalSpent.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'inactive')}>
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'active')}>
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria' 
                  : 'No users in the system yet'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">
                  {users.reduce((sum, user) => sum + user.bookings, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${users.reduce((sum, user) => sum + user.totalSpent, 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">$</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}