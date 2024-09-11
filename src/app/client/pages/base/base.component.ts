import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { ProductCardComponent } from '../../../modules/product/components/product-card/product-card.component'
import { ProductService } from '../../../modules/product/service/product.service'
import { RouterLink } from '@angular/router'
import { PromotionComponent } from '../../components/promotion/promotion.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { IProduct } from '../../../modules/product/types/product.interfaces'

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    HeaderComponent,
    ProductCardComponent,
    RouterLink,
    PromotionComponent,
    FooterComponent,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {

  product?: IProduct

  constructor(
    public readonly productService: ProductService,
  ) {
    this.productService.getAllProduct()
  }
}
