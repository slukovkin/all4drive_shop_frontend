import {Component, inject} from '@angular/core';
import {ProductService} from "../service/product.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: any = []
  productService = inject(ProductService)

  constructor() {
    this.productService.getAllProduct()
      .subscribe(product => this.products = product)
  }

}
