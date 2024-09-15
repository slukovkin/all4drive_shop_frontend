import { Injectable } from '@angular/core'
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
          // this.orders.map(order => order.productList.forEach(prod => this.products.push(prod)))
        }),
      )
      .subscribe()
  }
}
