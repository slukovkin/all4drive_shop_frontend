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
  isAdmin = false

  constructor(
    public readonly productService: ProductService,
    public readonly modalService: ModalService,
    private readonly authService: AuthService) {
    this.isAdmin = this.authService.isAdminSig()
  }

  filterByArticle() {
    this.productService.searchByArticle.set(this.article)
  }


  exit() {
    this.authService.logout()
  }
}
