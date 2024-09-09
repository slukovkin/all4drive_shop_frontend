import { Injectable, signal } from '@angular/core'
import { IProductInStore, IProductSelect } from '../types/product-in-store.interface'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { catchError } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class IncomingService {

  changeInvoiceSign = signal(false)
  productsSign = signal<IProductSelect[]>([])

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService) {
  }

  saveProductInStore() {
    if (this.changeInvoiceSign()) {
      const products = this.productsSign()
      products.forEach((product: IProductInStore) => {
        const payload: IProductInStore = {
          ...product,
          qty: product.qty / -1,
        }
        this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE,
          payload)
          .pipe(
            catchError((err) => {
              this.handleError(err)
              throw (`Error => ${err.message}`)
            }),
          ).subscribe(() => {
          this.toast.success('Products successfully saved')
          this.productsSign.set([])
        })
      })
    } else {
      const products = this.productsSign()
      products.forEach((product: IProductInStore) => {
        this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE, product)
          .pipe(
            catchError((err) => {
              this.handleError(err)
              throw (`Error => ${err.message}`)
            }),
          ).subscribe(() => {
          this.toast.success('Products successfully saved')
          this.productsSign.set([])
        })
      })
    }
  }

  addSelectProductToArray(product: IProductSelect) {
    this.productsSign.set([...this.productsSign(), product])
    console.log(this.productsSign())
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
