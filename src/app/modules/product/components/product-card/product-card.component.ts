import { Component, EventEmitter, Input, Output, signal } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { IProduct } from '../../types/product.interfaces'
import { Router } from '@angular/router'
import { PassingParamsDirective } from '../../../../shared/directives/passing-params.directive'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    PassingParamsDirective,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: IProduct

  @Output() clickEvent = new EventEmitter<number>()
  productUpdateSign = signal<IProduct>(this.product)

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
  ) {
  }

  updateEvent(id: number): void {
    this.clickEvent.emit(id)
    this.router.navigate(['new_product'])
  }

  // update(product: IProduct) {
  //   this.productUpdateSign.set(product)
  //   this.router.navigate(['new_product'])
  // }

  remove(id: number) {
    this.productService.remove(id)
  }
}
