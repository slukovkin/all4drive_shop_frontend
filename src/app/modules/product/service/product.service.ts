import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from '../../../shared/constants/constants';
import {ProductCreationAttributes} from "../types/product.interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly http: HttpClient) {
  }

  getAllProduct() {
    return this.http.get(`${BASE_URL}/products`)
  }

  create(product: ProductCreationAttributes) {
    console.log(product)
    return this.http.post(`${BASE_URL}/products`, product)
  }
}
