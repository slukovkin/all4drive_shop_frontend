import { Component, Input } from '@angular/core'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { UahToEurPipe } from '../../../../shared/pipes/uah-to-eur.pipe'
import { OrderService } from '../../../order/service/order.service'
import { IProductFullDataInStore } from '../../types/product-in-store'
import { IProductInStockAttributes } from '../../types/product.interfaces'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    EurToUahPipe,
    UahToEurPipe,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: IProductInStockAttributes

  constructor(
    private readonly orderService: OrderService,
  ) {
  }

  addProduct(product: IProductFullDataInStore) {
    this.orderService.addProductInOrder(product)
  }
}
