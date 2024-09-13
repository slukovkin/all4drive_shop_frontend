import { Component } from '@angular/core'
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FilterPipe } from '../../../shared/pipes/filter.pipe'
import { GetCategoryTitleByIdPipe } from '../../../shared/pipes/get-category-title-by-id.pipe'
import { StopPropagationDirective } from '../../../shared/directives/stop-propagation.directive'
import { ModalService } from '../../../modules/modal/service/modal.service'
import { OrderService } from '../../../modules/order/service/order.service'
import { EurToUahPipe } from '../../../shared/pipes/eur-to-uah.pipe'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CurrencyPipe,
    FaIconComponent,
    FilterPipe,
    GetCategoryTitleByIdPipe,
    NgForOf,
    NgIf,
    StopPropagationDirective,
    EurToUahPipe,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  deleteIcon = faTrash

  constructor(
    public readonly orderService: OrderService,
    public readonly modalService: ModalService,
  ) {
  }

  delete(id: number) {
    this.orderService.order = this.orderService.order.filter(prod => prod.id !== id)
  }
}
