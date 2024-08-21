import { Component } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { NgForOf } from '@angular/common'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../../service/product.service'

@Component({
  selector: 'app-outgoing-invoice',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgForOf,
  ],
  templateUrl: './outgoing-invoice.component.html',
  styleUrl: './outgoing-invoice.component.scss',
})
export class OutgoingInvoiceComponent {
  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly productService: ProductService,
  ) {
    this.productService.getAllProduct()
  }
}
