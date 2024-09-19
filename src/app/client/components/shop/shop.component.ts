import { Component } from '@angular/core'
import { ProductCardComponent } from '../product-card/product-card.component'
import { IProductInStockAttributes } from '../../../modules/product/types/product.interfaces'
import { ProductService } from '../../../modules/product/service/product.service'
import { CategoryService } from '../../../modules/category/services/category.service'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductCardComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  product?: IProductInStockAttributes[]

  constructor(
    public readonly productService: ProductService,
    public readonly categoryService: CategoryService,
  ) {
    this.productService.getAllProduct()
    this.categoryService.getAllCategories()
  }
}
