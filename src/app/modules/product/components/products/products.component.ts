import { Component } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common'
import { ProductCardComponent } from '../product-card/product-card.component'
import { ModalService } from '../../../modal/service/modal.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ProductFormComponent } from '../product-form/product-form.component'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { UahToEurPipe } from '../../../../shared/pipes/uah-to-eur.pipe'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { AuthService } from '../../../auth/service/auth.service'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'

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
    EurToUahPipe,
    CurrencyPipe,
    UahToEurPipe,
    StopPropagationDirective,
    TitleCasePipe,
    NgClass,
    FilterPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  title = ''

  constructor(
    public authService: AuthService,
    public productService: ProductService,
    public modalService: ModalService,
  ) {
    this.productService.getAllProduct()
  }

  delete(id: number) {
    this.productService.remove(id)
  }
}
