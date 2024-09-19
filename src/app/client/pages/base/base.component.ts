import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { ProductCardComponent } from '../../components/product-card/product-card.component'
import { ProductService } from '../../../modules/product/service/product.service'
import { RouterLink, RouterOutlet } from '@angular/router'
import { PromotionComponent } from '../../components/promotion/promotion.component'
import { FooterComponent } from '../../components/footer/footer.component'
import { IProductInStockAttributes } from '../../../modules/product/types/product.interfaces'
import { AsyncPipe, NgIf } from '@angular/common'
import { ModalComponent } from '../../../modules/modal/components/modal.component'
import { ProductFormComponent } from '../../../modules/product/components/product-form/product-form.component'
import { BasketComponent } from '../../components/basket/basket.component'
import { CategoryService } from '../../../modules/category/services/category.service'
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { NavigationComponent } from '../../components/navigation/navigation.component'
import { ShopComponent } from '../../components/shop/shop.component'

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
    NavigationComponent,
    ShopComponent,
    RouterOutlet,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {

  product?: IProductInStockAttributes[]

  constructor(
    private readonly authService: AuthService,
    public readonly productService: ProductService,
    public readonly categoryService: CategoryService,
  ) {
    const token = localStorage.getItem('token')
    if (token) {
      this.authService.checkToken(token).subscribe()
    }
    this.productService.getAllProduct()
    this.categoryService.getAllCategories()
  }
}
