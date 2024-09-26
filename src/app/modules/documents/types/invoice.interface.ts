import { ICustomer } from '../../customer/types/customer.interface'

export interface IInvoice {
  id?: number;
  doc_number: string
  type: string
  customerId: number
  date: string
  orderId?: number
  amount: number
  status: boolean
  customer?: ICustomer
}
