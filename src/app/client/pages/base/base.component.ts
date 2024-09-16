import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { ProductCardComponent } from '../../../modules/product/components/product-card/product-card.component'
import { ProductService } from '../../../modules/product/service/product.service'
import { RouterLink } from '@angular/router'
import { PromotionComponent } from '../../components/promotion/promotion.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { IProductInStockAttributes } from '../../../modules/product/types/product.interfaces'
import { AsyncPipe, NgIf } from '@angular/common'
import { ModalComponent } from '../../../modules/modal/components/modal.component'
import { ProductFormComponent } from '../../../modules/product/components/product-form/product-form.component'
import { BasketComponent } from '../../components/basket/basket.component'
import { CategoryService } from '../../../modules/category/services/category.service'
import { SidebarComponent } from '../../components/sidebar/sidebar.component'

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    HeaderComponent,
    ProductCardComponent,
    RouterLink,
    PromotionComponent,
    FooterComponent,
    AsyncPipe,
    ModalComponent,
    NgIf,
    ProductFormComponent,
    BasketComponent,
    SidebarComponent,
    SidebarComponent,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnInit {

  product?: IProductInStockAttributes[]

  constructor(
    public readonly productService: ProductService,
    public readonly categoryService: CategoryService,
  ) {
    this.productService.getAllProduct()
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
  }
}
