import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IProductInBasket, IProductInStockAttributes } from '../../product/types/product.interfaces'
import { AuthService } from '../../auth/service/auth.service'

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  order: IProductInBasket[] = []
  currentProduct?: IProductInStockAttributes

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  addProductInOrder(product: IProductInStockAttributes) {
    if (!this.authService.user?.user.id) {
      console.log('userId not found')
      this.router.navigate(['login'])
    } else {
      this.currentProduct = product
      this.router.navigate(['basket'])
    }
  }
}
