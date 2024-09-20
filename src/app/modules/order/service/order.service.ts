import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IProductInBasket, IProductInStockAttributes } from '../../product/types/product.interfaces'
import { AuthService } from '../../auth/service/auth.service'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { IOrder } from '../types/order.interface'

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  order: IProductInBasket[] = []
  currentProduct?: IProductInStockAttributes

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
  }

  create(order: IOrder) {
    return this.http.post<IOrder>(Constants.BASE_URL + Constants.METHODS.CREATE_ORDER, order).subscribe()
  }

  getAllOrders() {
    return this.http.get<IOrder[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_ORDERS)
  }

  addProductInOrder(product: IProductInStockAttributes) {
    const token = localStorage.getItem('token')
    if (token) {
      this.authService.checkToken(token)
        .subscribe()
      if (this.authService.isAuth$()) {
        this.currentProduct = product
        this.router.navigate(['basket'])
      } else {
        this.router.navigate(['login'])
      }
    } else {
      this.router.navigate(['login'])
    }
  }

  deleteOrder(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_ORDER_BY_ID + id)
  }
}
