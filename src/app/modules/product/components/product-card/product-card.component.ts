import { Component, Input } from '@angular/core'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { UahToEurPipe } from '../../../../shared/pipes/uah-to-eur.pipe'
import { OrderService } from '../../../order/service/order.service'
import { IProductInStockAttributes } from '../../types/product.interfaces'
import { AsyncPipe, NgIf } from '@angular/common'
import { BasketComponent } from '../../../../client/components/basket/basket.component'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ModalService } from '../../../modal/service/modal.service'

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
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: IProductInStockAttributes

  constructor(
    private readonly orderService: OrderService,
    public readonly modalService: ModalService,
  ) {
  }

  addProduct(product: IProductInStockAttributes) {
    this.orderService.addProductInOrder(product)
  }
}
