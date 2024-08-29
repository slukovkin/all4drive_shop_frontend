import { Component } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { ProductCardComponent } from '../../../modules/product/components/product-card/product-card.component'
import { ProductService } from '../../../modules/product/service/product.service'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../modules/auth/service/auth.service'

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    HeaderComponent,
    ProductCardComponent,
    RouterLink,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {

  constructor(
    public readonly productService: ProductService,
    public readonly authService: AuthService,
  ) {
    this.productService.getAllProduct()
  }
}
