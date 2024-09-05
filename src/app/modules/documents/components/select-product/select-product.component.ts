import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ProductService } from '../../../product/service/product.service'
import { IProduct } from '../../../product/types/product.interfaces'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ModalService } from '../../../modal/service/modal.service'
import { SelectEditProductComponent } from '../select-edit-product/select-edit-product.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { IncomingService } from '../../services/incoming.service'

@Component({
  selector: 'app-select-product',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    FilterPipe,
    AsyncPipe,
    ModalComponent,
    NgIf,
    SelectEditProductComponent,
    StopPropagationDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './select-product.component.html',
  styleUrl: './select-product.component.scss',
})
export class SelectProductComponent implements OnInit {
  selectForm: FormGroup
  selectedProduct!: IProduct
  search: string = ''

  // products: IProduct[] = []

  constructor(
    public readonly productService: ProductService,
    public readonly modalService: ModalService,
    private readonly incomingService: IncomingService,
  ) {
    this.selectForm = new FormGroup({
      selectQty: new FormControl(null, [Validators.required]),
      selectPriceIn: new FormControl(null, [Validators.required]),
      selectPriceOut: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.selectForm.valid) {
      const product: IProduct = {
        ...this.selectedProduct,
        qty: Number(this.selectForm.value.selectQty),
        price: Number(this.selectForm.value.selectPriceIn),
      }
      // this.addSelectProductToArray(product)
      this.incomingService.addSelectProductToArray(product)
    }
  }

  //
  // addSelectProductToArray(products: IProduct) {
  //   this.products.push(products)
  //   console.log(this.products)
  // }

  select(product: IProduct) {
    this.selectedProduct = product
    this.modalService.closeModal()
  }
}
