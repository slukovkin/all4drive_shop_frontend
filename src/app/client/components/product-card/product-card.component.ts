import { Component, Input } from '@angular/core'
import { EurToUahPipe } from '../../../shared/pipes/eur-to-uah.pipe'
import { UahToEurPipe } from '../../../shared/pipes/uah-to-eur.pipe'
import { OrderService } from '../../../modules/order/service/order.service'
import { IProductInStockAttributes } from '../../../modules/product/types/product.interfaces'
import { AsyncPipe, NgIf } from '@angular/common'
import { BasketComponent } from '../basket/basket.component'
import { ModalComponent } from '../../../modules/modal/components/modal.component'
import { ModalService } from '../../../modules/modal/service/modal.service'
import { ProductService } from '../../../modules/product/service/product.service'
import { BasketModalComponent } from '../basket-modal/basket-modal.component'
import { OrderComponent } from '../order/order.component'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    EurToUahPipe,
    UahToEurPipe,
    AsyncPipe,
    BasketComponent,
    ModalComponent,
    NgIf,
    BasketModalComponent,
    OrderComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: IProductInStockAttributes

  constructor(
    private readonly orderService: OrderService,
    public readonly productService: ProductService,
    public readonly modalService: ModalService,
  ) {
  }

  addProduct(product?: IProductInStockAttributes) {
    if (product) {
      this.orderService.addProductInOrder(product)
    }
  }
}
