import { Component, Input } from '@angular/core'
import { IProduct } from '../../types/product.interfaces'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { UahToEurPipe } from '../../../../shared/pipes/uah-to-eur.pipe'

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
  @Input() product?: IProduct
}
