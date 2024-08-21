import { Component } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { NgForOf } from '@angular/common'
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-incoming-invoice',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './incoming-invoice.component.html',
  styleUrl: './incoming-invoice.component.scss',
})
export class IncomingInvoiceComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly productService: ProductService,
  ) {
    this.productService.getAllProduct()
  }
}
