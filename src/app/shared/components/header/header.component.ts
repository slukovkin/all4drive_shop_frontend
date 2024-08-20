import { Component } from '@angular/core'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ModalService } from '../../../modules/modal/service/modal.service'
import { FormsModule } from '@angular/forms'
import { ProductService } from '../../../modules/product/service/product.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  article = ''

  constructor(
    public productService: ProductService,
    public readonly modalService: ModalService,
    public authService: AuthService) {
  }

  filterByArticle() {
    this.productService.searchByArticle.set(this.article)
  }


  exit() {
    this.authService.logout()
  }

}
