import { Injectable, signal } from '@angular/core'
import { IProduct } from '../../product/types/product.interfaces'

@Injectable({
  providedIn: 'root',
})
export class IncomingService {

  productsSign = signal<IProduct[]>([])

  constructor() {
  }

  addSelectProductToArray(product: IProduct) {
    this.productsSign.set([...this.productsSign(), product])
    console.log(this.productsSign())
  }
}
