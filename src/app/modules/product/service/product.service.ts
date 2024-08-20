import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { IProduct, ProductCreationAttributes } from '../types/product.interfaces'
import { catchError, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // productsSign = signal<IProduct[]>([])
  products: IProduct[] = []

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService) {
  }

  getAllProduct() {
    this.http.get<IProduct[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_PRODUCTS)
      .pipe(
        tap((products: IProduct[]) => {
          this.products = products
        }),
      )
      .subscribe()
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(Constants.BASE_URL + Constants.METHODS.GET_PRODUCT_BY_ID + id)
  }

  create(product: ProductCreationAttributes) {
    return this.http.post<IProduct>(Constants.BASE_URL + Constants.METHODS.GET_ALL_PRODUCTS, product)
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
      ).subscribe((product) => {
        this.toast.success('Product update successfully')
      })
  }

  remove(id: number) {
    return this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_PRODUCT_BY_ID + id)
      .pipe(
        tap(() => this.getAllProduct()),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe((product) => {
        this.toast.success('Product deleted successfully')
      })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}
