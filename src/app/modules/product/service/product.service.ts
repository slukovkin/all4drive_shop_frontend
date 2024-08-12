import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getAllProduct() {
    return this.http.get(`${BASE_URL}/products`)
  }
}
