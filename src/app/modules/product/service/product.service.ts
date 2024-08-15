import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BASE_URL} from '../../../shared/constants/constants';
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
    return this.http.get<IProduct[]>(`${BASE_URL}/products`)
      .subscribe((products) => this.productsSign.set(products))
  }

  create(product: ProductCreationAttributes) {
    return this.http.post<IProduct>(`${BASE_URL}/products`, product)
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

  remove(id: number) {
    console.log('Product id => ' + id)
    this.http.delete(`${BASE_URL}/products/${id}`)
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
