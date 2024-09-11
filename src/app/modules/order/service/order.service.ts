import { Injectable, OnInit } from '@angular/core'
import { IOrder, IProductOrder } from '../types/order.interface'
import { HttpClient } from '@angular/common/http'
import { TokenService } from '../../../shared/token/token.service'
import { IUserResponse } from '../../auth/types/response.interface'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class OrderService implements OnInit {

  productList?: IOrder
  user?: IUserResponse | null

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private readonly router: Router,
  ) {
  }

  addProductInOrder(product: IProductOrder) {
    if (this.productList?.userId === null) {
      console.log('userId not found')
      this.router.navigate(['login'])
    }
    this.productList?.productList.push(product)
    console.log(this.productList)
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token) {
      this.tokenService.checkToken(token)
      this.user = this.tokenService.userInSystem()
    }
  }
}
