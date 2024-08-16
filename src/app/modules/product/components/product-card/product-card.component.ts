import {Component, Input, signal} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {IProduct} from "../../types/product.interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: IProduct
  productUpdateSign = signal<IProduct>(this.product)

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
  ) {
  }

  update(product: IProduct) {
    this.productUpdateSign.set(product)
    this.router.navigate(['new_product'])
  }

  remove(id: number) {
    this.productService.remove(id)
  }
}
