import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { IProduct, IProductInStockAttributes, ProductCreationAttributes } from '../types/product.interfaces'
import { catchError, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  products: IProductInStockAttributes[] = []
  searchByArticle = signal<string>('')

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService) {
  }

  getAllProduct() {
    this.http.get<IProductInStockAttributes[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_PRODUCTS)
      .pipe(
        tap((products) => {
          this.products = products
        }),
      )
      .subscribe()
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(Constants.BASE_URL + Constants.METHODS.GET_PRODUCT_BY_ID + id)
  }

  create(product: ProductCreationAttributes) {
    return this.http.post<IProductInStockAttributes>(Constants.BASE_URL + Constants.METHODS.CREATE_PRODUCT, product)
      .pipe(
        tap((product) => this.products.push(product)),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Product successfully saved')
      })
  }

  update(product: IProduct) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_PRODUCT_BY_ID + product.id, product)
      .pipe(
        tap(() => this.getAllProduct()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() =>
        this.toast.success('Product update successfully'),
      )
  }

  remove(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_PRODUCT_BY_ID + id)
      .pipe(
        tap(() => this.getAllProduct()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() =>
        this.toast.success('Product deleted successfully'),
      )
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
