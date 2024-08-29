import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../../components/header/header.component'
import { ProductCardComponent } from '../../../modules/product/components/product-card/product-card.component'
import { ProductService } from '../../../modules/product/service/product.service'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { HttpClient } from '@angular/common/http'

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
export class BaseComponent implements OnInit {

  isAdmin: boolean = false
  isAuthenticated: boolean = false

  constructor(
    private readonly http: HttpClient,
    public readonly productService: ProductService,
    public readonly authService: AuthService,
  ) {
    this.productService.getAllProduct()
    // this.http.post<any>('http://localhost:5000/auth/role', localStorage.getItem('token')).subscribe()
  }

  ngOnInit(): void {
    this.isAuthenticated = !!localStorage.getItem('token')
    this.isAdmin = this.authService.isAdminSig()
  }
}
