import { Component, inject } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { JsonPipe, NgForOf } from '@angular/common'
import { ProductCardComponent } from '../product-card/product-card.component'
import { IProduct } from '../../types/product.interfaces'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    JsonPipe,
    ProductCardComponent,
    NgForOf,
    MatFormField,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatHeaderRowDef,
    MatLabel,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  productService = inject(ProductService)

  products: IProduct[] = []

  displayedColumns: string[] = ['image', 'code', 'article', 'title', 'brand', 'qty', 'price', 'action']
  dataSource = new MatTableDataSource()

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }


  constructor() {
    this.productService.getAllProduct()
      .subscribe((products) => {
        this.dataSource.data = products
        console.log(products)
      })
  }

  delete(id: number) {

  }
}
