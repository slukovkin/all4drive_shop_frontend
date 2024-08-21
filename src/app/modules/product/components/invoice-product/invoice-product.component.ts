import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { IProduct } from '../../types/product.interfaces'
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-invoice-product',
  standalone: true,
  imports: [
    NgForOf,
  ],
  templateUrl: './invoice-product.component.html',
  styleUrl: './invoice-product.component.scss',
})
export class InvoiceProductComponent implements OnInit {

  products: IProduct[] = []

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.products = this.productService.products
  }
}
