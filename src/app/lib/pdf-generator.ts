import { jsPDF } from 'jspdf'
import autoTable, { UserOptions } from 'jspdf-autotable'

export interface BookingData {
  bookingId: string
  bookingDate: string
  status: string
  totalAmount: number
  currency: string
  flight: {
    airline: string
    flightNumber: string
    origin: string
    destination: string
    departure: string
    arrival: string
    duration: string
  }
  passengers: Array<{
    firstName: string
    lastName: string
    type: string
    seat: string
    baggage: string
  }>
  payment: {
    method: string
    transactionId: string
    paidAt: string
  }
  contact: {
    email: string
    phone: string
  }
}

export interface ReceiptData {
  receiptId: string
  issueDate: string
  booking: BookingData
  breakdown: Array<{
    description: string
    amount: number
    quantity: number
    total: number
  }>
  subtotal: number
  tax: number
  total: number
}

class PDFGenerator {
  private doc: jsPDF

  constructor() {
    this.doc = new jsPDF()
  }

  // Access lastAutoTable Y position safely
  private get lastTableY(): number {
    // @ts-expect-error: jsPDF-AutoTable adds lastAutoTable dynamically
    return this.doc.lastAutoTable?.finalY ?? 0
  }

  // -------------------- Public Methods --------------------

  public async generateBookingConfirmation(bookingData: BookingData): Promise<Blob> {
    this.doc = new jsPDF()
    this.addHeader('Booking Confirmation')
    this.addBookingDetails(bookingData)
    this.addFlightDetails(bookingData.flight)
    this.addPassengerDetails(bookingData.passengers)
    this.addPaymentDetails(bookingData.payment)
    this.addFooter()
    return this.doc.output('blob')
  }

  public async generateReceipt(receiptData: ReceiptData): Promise<Blob> {
    this.doc = new jsPDF()
    this.addHeader('Payment Receipt')
    this.addReceiptDetails(receiptData)
    this.addBreakdownTable(receiptData.breakdown, receiptData.subtotal, receiptData.tax, receiptData.total)
    this.addBookingReference(receiptData.booking)
    this.addFooter(true)
    return this.doc.output('blob')
  }

  public async generateBoardingPass(bookingData: BookingData, passengerIndex: number = 0): Promise<Blob> {
    this.doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [100, 150]
    })

    const passenger = bookingData.passengers[passengerIndex]
    const flight = bookingData.flight

    this.setFontSize(16)
    this.doc.text(flight.airline, 50, 10, { align: 'center' })
    this.setFontSize(10)
    this.doc.text('BOARDING PASS', 50, 15, { align: 'center' })

    this.setFontSize(8)
    this.doc.text('PASSENGER', 10, 25)
    this.setFontSize(10)
    this.doc.text(`${passenger.firstName} ${passenger.lastName}`, 10, 30)

    this.setFontSize(8)
    this.doc.text('FLIGHT', 10, 40)
    this.setFontSize(10)
    this.doc.text(flight.flightNumber, 10, 45)

    this.doc.text('FROM', 40, 40)
    this.doc.text(flight.origin, 40, 45)
    this.doc.text('TO', 70, 40)
    this.doc.text(flight.destination, 70, 45)

    this.doc.text('DATE', 10, 55)
    this.doc.text(new Date(flight.departure).toLocaleDateString(), 10, 60)
    this.doc.text('TIME', 40, 55)
    this.doc.text(new Date(flight.departure).toLocaleTimeString(), 40, 60)
    this.doc.text('GATE', 70, 55)
    this.doc.text('--', 70, 60)

    this.doc.text('SEAT', 10, 70)
    this.setFontSize(12)
    this.doc.text(passenger.seat || '--', 10, 75)

    this.doc.rect(40, 65, 50, 15)
    this.setFontSize(6)
    this.doc.text('BARCODE AREA', 65, 72, { align: 'center' })

    this.setFontSize(5)
    this.doc.text('Please arrive at the gate 30 minutes before departure', 50, 85, { align: 'center' })
    this.doc.text(`Booking Ref: ${bookingData.bookingId}`, 50, 90, { align: 'center' })

    return this.doc.output('blob')
  }

  public downloadPDF(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  public openPDF(blob: Blob) {
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  // -------------------- Private Methods --------------------

  private addHeader(title: string) {
    this.setFontSize(20)
    this.doc.text(title, 105, 20, { align: 'center' })
    this.doc.setLineWidth(0.5)
    this.doc.line(20, 25, 190, 25)
  }

  private addBookingDetails(bookingData: BookingData) {
    this.setFontSize(12)
    this.doc.text('Booking Details', 20, 35)
    this.setFontSize(10)

    const details: [string, string][] = [
      ['Booking ID:', bookingData.bookingId],
      ['Booking Date:', new Date(bookingData.bookingDate).toLocaleDateString()],
      ['Status:', bookingData.status.toUpperCase()],
      ['Total Amount:', `${bookingData.currency} ${bookingData.totalAmount.toFixed(2)}`]
    ]

    let y = 45
    details.forEach(([label, value]) => {
      this.doc.text(label, 20, y)
      this.doc.text(value, 60, y)
      y += 7
    })
  }

  private addFlightDetails(flight: BookingData['flight']) {
    this.setFontSize(12)
    this.doc.text('Flight Details', 20, 80)
    this.setFontSize(10)

    const details: [string, string][] = [
      ['Airline:', flight.airline],
      ['Flight Number:', flight.flightNumber],
      ['Route:', `${flight.origin} to ${flight.destination}`],
      ['Departure:', new Date(flight.departure).toLocaleString()],
      ['Arrival:', new Date(flight.arrival).toLocaleString()],
      ['Duration:', flight.duration]
    ]

    let y = 90
    details.forEach(([label, value]) => {
      this.doc.text(label, 20, y)
      this.doc.text(value, 60, y)
      y += 7
    })
  }

  private addPassengerDetails(passengers: BookingData['passengers']) {
    this.setFontSize(12)
    this.doc.text('Passenger Details', 20, 140)

    const tableData = passengers.map(p => [
      `${p.firstName} ${p.lastName}`,
      p.type,
      p.seat,
      p.baggage
    ])

    const options: UserOptions = {
      startY: 145,
      head: [['Name', 'Type', 'Seat', 'Baggage']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255
      }
    }

    autoTable(this.doc, options)
  }

  private addPaymentDetails(payment: BookingData['payment']) {
    this.setFontSize(12)
    const currentY = this.lastTableY + 20
    this.doc.text('Payment Details', 20, currentY)

    this.setFontSize(10)
    const details: [string, string][] = [
      ['Method:', payment.method],
      ['Transaction ID:', payment.transactionId],
      ['Paid At:', new Date(payment.paidAt).toLocaleString()]
    ]

    let y = currentY + 10
    details.forEach(([label, value]) => {
      this.doc.text(label, 20, y)
      this.doc.text(value, 60, y)
      y += 7
    })
  }

  private addReceiptDetails(receiptData: ReceiptData) {
    this.setFontSize(12)
    this.doc.text('Receipt Details', 20, 35)
    this.setFontSize(10)

    const details: [string, string][] = [
      ['Receipt ID:', receiptData.receiptId],
      ['Issue Date:', new Date(receiptData.issueDate).toLocaleDateString()],
      ['Booking ID:', receiptData.booking.bookingId]
    ]

    let y = 45
    details.forEach(([label, value]) => {
      this.doc.text(label, 20, y)
      this.doc.text(value, 60, y)
      y += 7
    })
  }

  private addBreakdownTable(breakdown: ReceiptData['breakdown'], subtotal: number, tax: number, total: number) {
    const tableData = breakdown.map(item => [
      item.description,
      item.quantity.toString(),
      item.amount.toFixed(2),
      item.total.toFixed(2)
    ])
    tableData.push(['Subtotal', '', '', subtotal.toFixed(2)])
    tableData.push(['Tax', '', '', tax.toFixed(2)])
    tableData.push(['TOTAL', '', '', total.toFixed(2)])

    const options: UserOptions = {
      startY: 70,
      head: [['Description', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255
      },
      footStyles: {
        fillColor: [230, 230, 230],
        textColor: 0
      }
    }

    autoTable(this.doc, options)
  }

  private addBookingReference(booking: BookingData) {
    const currentY = this.lastTableY + 20
    this.setFontSize(10)
    this.doc.text(`Booking Reference: ${booking.bookingId}`, 20, currentY)
  }

  private addFooter(isReceipt: boolean = false) {
    const pageCount = this.doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i)
      this.setFontSize(8)
      this.doc.text(`Page ${i} of ${pageCount}`, 105, 280, { align: 'center' })
      const footerText = isReceipt
        ? 'This is an official receipt. Please retain for your records.'
        : 'This is an electronic booking confirmation. Please present this document at check-in.'
      this.doc.text(footerText, 105, 285, { align: 'center' })
      this.doc.text('SkyWings Airlines • support@skyJet.com • +1 (555) 123-4567', 105, 290, { align: 'center' })
    }
  }

  private setFontSize(size: number) {
    this.doc.setFontSize(size)
    this.doc.setFont('helvetica', 'normal')
  }
}

// -------------------- Exports --------------------

export const pdfGenerator = new PDFGenerator()

export const usePDF = () => {
  return {
    generateBookingConfirmation: (bookingData: BookingData) => pdfGenerator.generateBookingConfirmation(bookingData),
    generateReceipt: (receiptData: ReceiptData) => pdfGenerator.generateReceipt(receiptData),
    generateBoardingPass: (bookingData: BookingData, passengerIndex?: number) => pdfGenerator.generateBoardingPass(bookingData, passengerIndex),
    downloadPDF: (blob: Blob, filename: string) => pdfGenerator.downloadPDF(blob, filename),
    openPDF: (blob: Blob) => pdfGenerator.openPDF(blob)
  }
}

export default pdfGenerator
