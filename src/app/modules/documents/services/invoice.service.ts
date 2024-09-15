import { Injectable, signal } from '@angular/core'
import { IProductInStore, IProductSelect } from '../types/product-in-store.interface'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { catchError } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { DocumentService } from './document.service'

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {

  changeInvoiceSign = signal(false)
  productsSign = signal<IProductSelect[]>([])

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService,
    private readonly documentService: DocumentService,
    private readonly router: Router,
  ) {
  }

  removeProductFromStore() {
    const products = this.documentService.productsToInvoice()
    products.forEach((product) => {
      const payload: IProductInStore = {
        productId: product.id,
        storeId: product.storeId,
        qty: product.qty / -1,
        priceIn: product.priceIn,
        priceOut: product.priceOut,
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
        this.documentService.productsToInvoice.set([])
        this.router.navigate(['products'])
      })
    })
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
          this.router.navigate(['products'])
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
          this.router.navigate(['products'])
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
