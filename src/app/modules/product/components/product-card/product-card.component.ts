import {Component, Input} from '@angular/core';
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any

  constructor(
    private readonly productService: ProductService
  ) {
  }

  remove(id: number) {
    this.productService.remove(id)
  }
}
