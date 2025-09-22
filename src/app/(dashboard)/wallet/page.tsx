'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit,
  Wallet,
  Shield,
  CheckCircle,
  Download,
  ArrowRight,
  History,
  MapPin
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'

interface PaymentMethod {
  id: string
  type: 'credit_card' | 'paypal' | 'bank_transfer'
  last4: string
  brand: string
  expiry: string
  isDefault: boolean
  name: string
}

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  type: 'flight' | 'refund' | 'upgrade'
}

export default function WalletPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true,
      name: 'John Doe'
    },
    {
      id: '2',
      type: 'credit_card',
      last4: '8888',
      brand: 'Mastercard',
      expiry: '09/24',
      isDefault: false,
      name: 'John Doe'
    }
  ])

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-06-15',
      description: 'Flight Booking - NYC to LON',
      amount: -299.00,
      status: 'completed',
      type: 'flight'
    },
    {
      id: '2',
      date: '2024-05-22',
      description: 'Seat Upgrade - Business Class',
      amount: -150.00,
      status: 'completed',
      type: 'upgrade'
    },
    {
      id: '3',
      date: '2024-05-10',
      description: 'Refund - Cancelled Flight',
      amount: 199.00,
      status: 'completed',
      type: 'refund'
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    isDefault: false
  })

  const handleAddCard = () => {
    if (newCard.number && newCard.name && newCard.expiry && newCard.cvv) {
      const last4 = newCard.number.slice(-4)
      const newPaymentMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'credit_card',
        last4,
        brand: 'Visa', 
        expiry: newCard.expiry,
        isDefault: newCard.isDefault,
        name: newCard.name
      }

      if (newCard.isDefault) {
        setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: false })))
      }

      setPaymentMethods(prev => [...prev, newPaymentMethod])
      setNewCard({ number: '', name: '', expiry: '', cvv: '', isDefault: false })
      setIsAddDialogOpen(false)
    }
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(pm => ({
        ...pm,
        isDefault: pm.id === id
      }))
    )
  }

  const handleDelete = (id: string) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h1>
          <p className="text-gray-600">Manage your payment methods and billing preferences</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Methods Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-airline-red-50 to-airline-red-100">
                  <CardTitle className="flex items-center">
                    <Wallet className="w-6 h-6 mr-2 text-airline-red-600" />
                    Your Payment Methods
                  </CardTitle>
                  <CardDescription>
                    Manage your saved payment methods for faster bookings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <Card className="border-2 border-gray-100 hover:border-airline-red-300 transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-airline-red-500 to-airline-red-600 rounded-lg flex items-center justify-center">
                                  <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {method.brand} •••• {method.last4}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Expires {method.expiry} • {method.name}
                                  </p>
                                  {method.isDefault && (
                                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-1">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Default
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {!method.isDefault && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSetDefault(method.id)}
                                    className="text-airline-red-600 hover:text-airline-red-700 hover:bg-airline-red-50"
                                  >
                                    Set Default
                                  </Button>
                                )}
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(method.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}

                    {paymentMethods.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Wallet className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No payment methods
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Add your first payment method to get started
                        </p>
                      </div>
                    )}

                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full h-12">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Payment Method
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Payment Method</DialogTitle>
                          <DialogDescription>
                            Add a new credit or debit card to your account
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              value={newCard.number}
                              onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                              className="h-12"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cardholder Name
                            </label>
                            <Input
                              placeholder="John Doe"
                              value={newCard.name}
                              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                              className="h-12"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <Input
                                placeholder="MM/YY"
                                value={newCard.expiry}
                                onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                                className="h-12"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <Input
                                placeholder="123"
                                type="password"
                                value={newCard.cvv}
                                onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                className="h-12"
                              />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="default-card"
                              checked={newCard.isDefault}
                              onChange={(e) => setNewCard({ ...newCard, isDefault: e.target.checked })}
                              className="h-4 w-4 text-airline-red-600 focus:ring-airline-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="default-card" className="ml-2 block text-sm text-gray-900">
                              Set as default payment method
                            </label>
                          </div>
                          <Button onClick={handleAddCard} className="w-full h-12">
                            Add Card
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Transaction History Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-airline-red-50 to-airline-red-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <History className="w-6 h-6 mr-2 text-airline-red-600" />
                        Transaction History
                      </CardTitle>
                      <CardDescription>Your recent payment transactions</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.amount < 0 ? 'bg-red-100' : 'bg-green-100'
                          }`}>
                            <CreditCard className={`w-5 h-5 ${
                              transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-medium">{transaction.description}</h4>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {transaction.amount < 0 ? '-$' : '$'}{Math.abs(transaction.amount).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">{transaction.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Secure Payments</h4>
                        <p className="text-sm text-gray-600">256-bit encryption</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">PCI Compliant</h4>
                        <p className="text-sm text-gray-600">Level 1 certified</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Billing Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">Primary Address</span>
                    </div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-sm text-gray-600">123 Main Street</p>
                    <p className="text-sm text-gray-600">New York, NY 10001</p>
                    <p className="text-sm text-gray-600">United States</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Edit Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Having issues with your payments? Our support team is here to help.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Promo Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-0 bg-gradient-to-r from-airline-red-600 to-airline-red-700 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">SkyJet Credit Card</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Earn miles on every purchase and enjoy exclusive benefits
                  </p>
                  <Button variant="secondary" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}