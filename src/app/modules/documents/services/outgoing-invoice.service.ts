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
export class OutgoingInvoiceService {
  changeInvoice$ = signal(false)
  products$ = signal<IProductSelect[]>([])
  lastOutgoingInvoiceNumber$ = signal<string | null>(null)

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService,
    private readonly documentService: DocumentService,
    private readonly router: Router,
  ) {
    this.getLastOutgoingInvoiceNumber()
  }

  getLastOutgoingInvoiceNumber() {
    return this.http.get<string | null>(Constants.BASE_URL + Constants.METHODS.GET_LAST_OUTGOING_INVOICE_NUMBER)
      .pipe(
        catchError((err) => {
          this.lastOutgoingInvoiceNumber$.set(err.error.text)
          throw 'Не понятная ошибка при парсинге номера накладной'
        }),
        tap(i => {
          if (i === null) {
            this.lastOutgoingInvoiceNumber$.set(null)
          } else {
            this.lastOutgoingInvoiceNumber$.set(i)
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
        ).subscribe()
    })
    this.saveInvoice()
  }

  saveInvoice() {
    this.http.post<IInvoice>(Constants.BASE_URL + Constants.METHODS.CREATE_OUTGOING_INVOICE,
      this.documentService.invoice$())
      .subscribe(() => {
        this.documentService.invoice$.set(null)
        this.documentService.productsToInvoice$.set([])
        this.products$.set([])
        this.getLastOutgoingInvoiceNumber()
        this.toast.success('Products successfully saved')
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
