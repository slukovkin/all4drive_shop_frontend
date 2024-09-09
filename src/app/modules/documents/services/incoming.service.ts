import { Injectable, signal } from '@angular/core'
import { IProductInStore } from '../types/product-in-store.interface'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'

@Injectable({
  providedIn: 'root',
})
export class IncomingService {

  productsSign = signal<IProductInStore[]>([])

  constructor(private readonly http: HttpClient) {
  }

  saveProductInStore() {
    const products = this.productsSign()
    products.forEach((product: IProductInStore) => {
      this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE, product)
        .subscribe()
    })
    this.productsSign.set([])
  }

  addSelectProductToArray(product: IProductInStore) {
    this.productsSign.set([...this.productsSign(), product])
    console.log(this.productsSign())
  }
}
