import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BASE_URL} from '../../../shared/constants/constants';
import {IProduct, ProductCreationAttributes} from "../types/product.interfaces";
import {ProductResponse} from "../types/product-response.interface";
import {catchError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrService) {
  }

  getAllProduct() {
    return this.http.get<IProduct[]>(`${BASE_URL}/products`)
  }

  create(product: ProductCreationAttributes) {
    return this.http.post<ProductResponse>(`${BASE_URL}/products`, product)
      .pipe(
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        })
      ).subscribe(() => {
        this.toast.success('Product successfully saved')
      });
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message);
  }
}
