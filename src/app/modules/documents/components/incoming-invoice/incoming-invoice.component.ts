import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ProductService } from '../../../product/service/product.service';

@Component({
  selector: 'app-incoming-invoice',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './incoming-invoice.component.html',
  styleUrl: './incoming-invoice.component.scss',
})
export class IncomingInvoiceComponent {
  editIcon = faPenToSquare;
  deleteIcon = faTrash;

  incomForm = new FormGroup({
    number_doc: new FormControl(''),
    data_doc: new FormControl(Date.now()),
  });

  constructor(public readonly productService: ProductService) {
    this.productService.getAllProduct();
  }
}
