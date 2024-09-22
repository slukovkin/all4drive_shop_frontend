import { Component, Input } from '@angular/core'
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { IOrder } from '../../../order/types/order.interface'
import { JsonPipe } from '@angular/common'
import { IProductInBasket } from '../../../product/types/product.interfaces'
import { CustomerService } from '../../../customer/services/customer.service'
import { ICustomer } from '../../../customer/components/customer/types/customer.interface'
import { Router } from '@angular/router'
import { DocumentService } from '../../services/document.service'
import { OutgoingInvoiceService } from '../../services/outgoing-invoice.service'

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    FaIconComponent,
    StopPropagationDirective,
    JsonPipe,
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() order?: IOrder

  editIcon = faPenToSquare
  deleteIcon = faTrash
  visible = faEye
  customer?: ICustomer

  constructor(
    private customerService: CustomerService,
    private documentService: DocumentService,
    private outgoingInvoiceService: OutgoingInvoiceService,
    private router: Router) {
    this.customerService.getAllCustomers()
  }

  detail(products: IProductInBasket[]) {
    this.documentService.products = products
    this.router.navigate(['order-detail']).then()
  }

  findCustomer(userId: number) {
    this.customer = this.customerService.getCustomerById(userId)
    if (this.customer) {
      return `${this.customer.firstname} ${this.customer.lastname}`
    }
    return ''
  }

  sumOrder(prodList: IProductInBasket[]): number {
    return prodList.reduce((_, next) =>
      next.qty * next.priceOut, 0)
  }

  addOrderInOutgoingInvoice(order: IOrder) {
    this.documentService.isOrder$.set(true)
    this.outgoingInvoiceService.getLastOutgoingInvoiceNumber()
    this.documentService.productsToInvoice$.set(order)
    this.router.navigate(['outgoing_invoice']).then()
  }

  delete(id: number) {
    this.documentService.deleteOrder(id)
  }
}
