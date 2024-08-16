import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Constants} from '../../../shared/constants/constants';
import {IProduct, ProductCreationAttributes} from "../types/product.interfaces";
import {catchError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsSign = signal<IProduct[]>([])

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService) {
  }

  getAllProduct() {
    return this.http.get<IProduct[]>(Constants.BASE_URL + Constants.METHODS.GET_ALL_PRODUCTS)
      .subscribe((products) => this.productsSign.set(products))
  }

  create(product: ProductCreationAttributes) {
    return this.http.post<IProduct>(Constants.BASE_URL + Constants.METHODS.GET_ALL_PRODUCTS, product)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        })
      ).subscribe((product) => {
        this.productsSign.update((products) => [...products, product])
        this.toast.success('Product successfully saved')
      });
  }

  update(product: IProduct) {
    this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_PRODUCT_BY_ID + product.id, product)
  }

  remove(id: number) {
    this.http.delete(Constants.BASE_URL + Constants.METHODS.DELETE_PRODUCT_BY_ID + id)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        })
      ).subscribe(() => {
      this.productsSign.update(products =>
        products.filter(product => product.id != id)
      )
      this.toast.success('Product deleted successfully')
    });
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message);
  }
}
