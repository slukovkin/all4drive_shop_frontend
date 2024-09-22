import { Component, Input } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ProductService } from '../../../product/service/product.service'
import { IProduct } from '../../../product/types/product.interfaces'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ModalService } from '../../../modal/service/modal.service'
import { SelectEditProductComponent } from '../select-edit-product/select-edit-product.component'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { IncomingInvoiceService } from '../../services/incoming-invoice.service'
import { IProductSelect } from '../../types/product-in-store.interface'

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
  @Input() product?: IProductSelect

  selectForm: FormGroup
  selectedProduct!: IProduct
  search: string = ''

  constructor(
    public readonly productService: ProductService,
    public readonly modalService: ModalService,
    private readonly incomingService: IncomingInvoiceService,
  ) {
    this.selectForm = new FormGroup({
      selectQty: new FormControl(null, [Validators.required]),
      selectPriceIn: new FormControl(null, [Validators.required]),
      selectPriceOut: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    if (this.selectForm.valid) {
      const product: IProductSelect = {
        productId: this.selectedProduct.id,
        code: this.selectedProduct.code,
        article: this.selectedProduct.article,
        title: this.selectedProduct.title,
        brand: this.selectedProduct.brand,
        categoryId: this.selectedProduct.categoryId,
        storeId: 1,
        qty: Number(this.selectForm.value.selectQty),
        priceIn: Number(this.selectForm.value.selectPriceIn),
        priceOut: Number(this.selectForm.value.selectPriceOut),
      }
      this.incomingService.addSelectProductToArray(product)
    }
  }

  select(product: IProduct) {
    this.selectedProduct = product
    this.modalService.closeModal()
  }
}
