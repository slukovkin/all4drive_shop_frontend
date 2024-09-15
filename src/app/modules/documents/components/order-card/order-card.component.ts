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
    private router: Router) {
    this.customerService.getAllCustomers()
  }

  detail(products: IProductInBasket[]) {
    console.log(products)
    this.documentService.products = products
    this.router.navigate(['order-detail'])
  }

  findCustomer(userId: number) {
    this.customer = this.customerService.getCustomerById(userId)
    if (this.customer) {
      return `${this.customer.firstname} ${this.customer.lastname}`
    }
    return ''
  }

  sumOrder(prodList: IProductInBasket[]): number {
    return prodList.reduce((sum, next) =>
        sum += next.qty * next.priceOut
      , 0)
  }

}
