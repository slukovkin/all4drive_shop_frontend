import {Component, inject} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {JsonPipe, NgForOf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    JsonPipe,
    ProductCardComponent,
    NgForOf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productService = inject(ProductService)

  constructor() {
    this.productService.getAllProduct()
  }
}
