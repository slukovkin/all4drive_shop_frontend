import { Injectable, signal } from '@angular/core'
import { IProductInStore, IProductSelect } from '../types/product-in-store.interface'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { catchError, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { DocumentService } from './document.service'
import { IInvoice } from '../types/invoice.interface'

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  changeInvoice$ = signal(false)
  products$ = signal<IProductSelect[]>([])
  lastInvoiceNumber$ = signal<string | null>(null)

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService,
    private readonly documentService: DocumentService,
    private readonly router: Router,
  ) {
    this.getLastInvoiceNumber()
  }

  getLastInvoiceNumber() {
    return this.http.get<string | null>(Constants.BASE_URL + Constants.METHODS.GET_LAST_INVOICE_NUMBER)
      .pipe(
        catchError((err) => {
          this.lastInvoiceNumber$.set(err.error.text)
          throw 'Не понятная ошибка при парсинге номера накладной'
        }),
        tap(i => {
          if (i === null) {
            this.lastInvoiceNumber$.set(null)
          } else {
            this.lastInvoiceNumber$.set(i)
          }
        }),
      ).subscribe()
  }

  removeProductFromStore() {
    const products = this.documentService.productsToInvoice$()
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
        this.documentService.productsToInvoice$.set([])
        this.router.navigate(['products'])
      })
    })
  }

  saveProductInStore() {
    if (this.changeInvoice$()) {
      const products = this.products$()
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
          this.products$.set([])
          this.router.navigate(['products'])
        })
      })
    } else {
      const products = this.products$()
      if (this.documentService.invoice$()) {

      }
      products.forEach((product: IProductInStore) => {
        this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE, product)
          .pipe(
            catchError((err) => {
              this.handleError(err)
              throw (`Error => ${err.message}`)
            }),
          ).subscribe(() => {
          this.saveInvoice()
        })
      })
    }
  }

  saveInvoice() {
    this.http.post<IInvoice>(Constants.BASE_URL + Constants.METHODS.CREATE_INVOICE,
      this.documentService.invoice$())
      .subscribe(() => {
        this.documentService.invoice$.set(null)

        this.toast.success('Products successfully saved')
        this.products$.set([])
        this.router.navigate(['products'])
      })
  }

  addSelectProductToArray(product: IProductSelect) {
    this.products$.set([...this.products$(), product])
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
