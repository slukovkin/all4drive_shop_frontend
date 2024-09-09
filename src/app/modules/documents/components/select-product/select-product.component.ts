import { Component } from '@angular/core'
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
import { IProductInStore } from '../../types/product-in-store.interface'

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
export class SelectProductComponent {
  selectForm: FormGroup
  selectedProduct!: IProduct
  search: string = ''

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

  onSubmit() {
    if (this.selectForm.valid) {
      const product: IProductInStore = {
        productId: this.selectedProduct.id,
        storeId: 1,
        qty: Number(this.selectForm.value.selectQty),
        priceIn: Number(this.selectForm.value.selectPriceIn),
        priceOut: Number(this.selectForm.value.selectPriceOut),
      }
      // this.addSelectProductToArray(product)
      this.incomingService.addSelectProductToArray(product)
    }
  }

  select(product: IProduct) {
    this.selectedProduct = product
    this.modalService.closeModal()
  }
}
