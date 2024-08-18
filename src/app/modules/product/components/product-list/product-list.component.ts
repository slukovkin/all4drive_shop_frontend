import { Component, inject } from '@angular/core'
import { ProductService } from '../../service/product.service'
import { NgForOf } from '@angular/common'
import { ProductCardComponent } from '../product-card/product-card.component'
import { IProduct } from '../../types/product.interfaces'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSortModule } from '@angular/material/sort'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgForOf,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
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
