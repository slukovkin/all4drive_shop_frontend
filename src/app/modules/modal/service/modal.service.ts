import { Injectable } from '@angular/core'
import { IProduct } from '../../product/types/product.interfaces'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible = new BehaviorSubject(false)

  product?: IProduct

  constructor() {
  }

  updateProduct(product: IProduct) {
    this.product = product
    this.openModal()
  }

  openModal() {
    this.isVisible.next(true)
  }

  closeModal() {
    this.isVisible.next(false)
  }
}
