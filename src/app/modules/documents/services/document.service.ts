import { Injectable, signal } from '@angular/core'
import { OrderService } from '../../order/service/order.service'
import { IOrder } from '../../order/types/order.interface'
import { tap } from 'rxjs'
import { IProductInBasket } from '../../product/types/product.interfaces'

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  orders?: IOrder[]
  products: IProductInBasket[] = []
  productsToInvoice = signal<IProductInBasket[]>([])

  constructor(
    private readonly orderService: OrderService,
  ) {
  }

  getAllOrder() {
    this.orders = []
    this.products = []
    return this.orderService.getAllOrders()
      .pipe(
        tap((orders: IOrder[]) => {
          this.orders = orders
        }),
      )
      .subscribe()
  }
}
