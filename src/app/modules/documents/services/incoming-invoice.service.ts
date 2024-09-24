import { Injectable, signal } from '@angular/core'
import { IProductInStore } from '../types/product-in-store.interface'
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
export class IncomingInvoiceService {
  changeInvoice$ = signal(false)
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
    return this.http.get<string | null>(Constants.BASE_URL + Constants.METHODS.GET_LAST_INCOMING_INVOICE_NUMBER)
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


  saveProductInStore() {
    const products = this.documentService.products$()

    products.forEach((product: IProductInStore) => {
      this.http.post(Constants.BASE_URL + Constants.METHODS.ADD_PRODUCTS_IN_STORE, product)
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
    this.http.post<IInvoice>(Constants.BASE_URL + Constants.METHODS.CREATE_INCOMING_INVOICE,
      this.documentService.invoice$())
      .subscribe(() => {
        this.documentService.invoice$.set(null)
        this.documentService.productsToInvoice$.set(null)
        this.documentService.products$.set([])
        this.getLastInvoiceNumber()
        this.toast.success('Products successfully saved')
        this.router.navigate(['products']).then()
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
