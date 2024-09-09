import { Injectable, signal } from '@angular/core'
import { IProductInStore, IProductSelect } from '../types/product-in-store.interface'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'

@Injectable({
  providedIn: 'root',
})
export class IncomingService {

  productsSign = signal<IProductSelect[]>([])

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

  addSelectProductToArray(product: IProductSelect) {
    this.productsSign.set([...this.productsSign(), product])
    console.log(this.productsSign())
  }
}
