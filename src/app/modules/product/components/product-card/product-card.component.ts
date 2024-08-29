import { Component, Input } from '@angular/core'
import { IProduct } from '../../types/product.interfaces'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product?: IProduct
}
