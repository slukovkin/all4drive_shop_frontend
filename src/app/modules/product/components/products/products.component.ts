import { Component } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { ProductCardComponent } from '../product-card/product-card.component'
import { IProduct } from '../../types/product.interfaces'
import { ModalService } from '../../../modal/service/modal.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ProductFormComponent } from '../product-form/product-form.component'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgForOf,
    ModalComponent,
    AsyncPipe,
    NgIf,
    ProductFormComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: IProduct[] = []

  constructor(
    public productService: ProductService,
    public modalService: ModalService,
  ) {
    this.productService.getAllProduct()
      .subscribe((products) => {
        this.products = products
      })
  }
}
