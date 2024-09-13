import { Component } from '@angular/core'
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FilterPipe } from '../../../shared/pipes/filter.pipe'
import { GetCategoryTitleByIdPipe } from '../../../shared/pipes/get-category-title-by-id.pipe'
import { StopPropagationDirective } from '../../../shared/directives/stop-propagation.directive'
import { ModalService } from '../../../modules/modal/service/modal.service'
import { OrderService } from '../../../modules/order/service/order.service'
import { EurToUahPipe } from '../../../shared/pipes/eur-to-uah.pipe'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { CustomerService } from '../../../modules/customer/services/customer.service'
import { ICustomer } from '../../../modules/customer/components/customer/types/customer.interface'

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CurrencyPipe,
    FaIconComponent,
    FilterPipe,
    GetCategoryTitleByIdPipe,
    NgForOf,
    NgIf,
    StopPropagationDirective,
    EurToUahPipe,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  deleteIcon = faTrash
  isOrder = false
  user: ICustomer | null = null
  orderForm: FormGroup


  constructor(
    public readonly orderService: OrderService,
    public readonly modalService: ModalService,
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
  ) {
    this.customerService.getAllCustomers()
    if (this.authService.user?.user.id) {
      this.user = this.customerService.getCustomerById(this.authService.user.user.id)
    }

    this.orderForm = new FormGroup(({
      firstname: new FormControl(this.user?.firstname ?? '', [Validators.required]),
      lastname: new FormControl(this.user?.lastname ?? '', [Validators.required]),
      phone: new FormControl(this.user?.phone ?? '', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      post: new FormControl('', [Validators.required]),
    }))
  }

  delete(id: number) {
    this.orderService.order = this.orderService.order.filter(prod => prod.id !== id)
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const user: ICustomer = {
        id: this.authService.user?.user.id!,
        firstname: this.orderForm.value.firstname!,
        lastname: this.orderForm.value.lastname!,
        email: this.authService.user?.user.email!,
        phone: this.orderForm.value.phone!,
      }
      if (!this.user?.firstname) {
        this.customerService.update(user)
      }
      console.log('Заказ => ', this.orderService.order, 'Пользователь => ', user)
      // const order: IOrder = {
      //   userId: user.id!,
      //   productList: this.orderService.order,
      // }
      // this.orderService.create(order)
    }
  }

}
