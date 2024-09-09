import { Component } from '@angular/core'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { ProductService } from '../../../product/service/product.service'
import { SettingService } from '../../../settings/service/setting.service'
import { StoreService } from '../../../store/store.service'
import { CurrencyService } from '../../../currency/components/services/currency.service'
import { ModalService } from '../../../modal/service/modal.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { ProductFormComponent } from '../../../product/components/product-form/product-form.component'
import { SelectProductComponent } from '../select-product/select-product.component'
import { IncomingService } from '../../services/incoming.service'
import { FilterPipe } from '../../../../shared/pipes/filter.pipe'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { SelectEditProductComponent } from '../select-edit-product/select-edit-product.component'

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
    FormsModule,
    AsyncPipe,
    ModalComponent,
    NgIf,
    ProductFormComponent,
    SelectProductComponent,
    FilterPipe,
    StopPropagationDirective,
    SelectEditProductComponent,
  ],
  templateUrl: './incoming-invoice.component.html',
  styleUrl: './incoming-invoice.component.scss',
})
export class IncomingInvoiceComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash

  incomingForm: FormGroup

  constructor(
    public readonly productService: ProductService,
    public readonly settingService: SettingService,
    public readonly storeService: StoreService,
    public readonly currencyService: CurrencyService,
    public readonly modalService: ModalService,
    public readonly incomingService: IncomingService,
  ) {
    this.settingService.getAllSettings()
    this.productService.getAllProduct()
    this.storeService.getAllStore()
    this.currencyService.getAllCurrencies()

    this.incomingForm = new FormGroup({
      number_doc: new FormControl('ER-'),
      data_doc: new FormControl(Date.now()),
      store: new FormControl(this.settingService.setting?.storeId, [Validators.required]),
      currency: new FormControl(this.settingService.setting?.currencyId, [Validators.required]),
    })
  }

  submit() {
    if (this.incomingForm.valid) {
      console.log(this.incomingForm.value)
    } else {
      console.log('Form invalid')
    }
  }

  unselectProduct(id: number) {
    this.incomingService.productsSign.set(this.incomingService.productsSign().filter(product => product.productId !== id))
  }

  saveProductInStore() {
    this.incomingService.changeInvoiceSign.set(false)
    this.incomingService.saveProductInStore()
  }

  sum(): number {
    const products = this.incomingService.productsSign()
    return products.reduce((prev, curr) => prev += curr.priceIn * curr.qty, 0)
  }

  clearProducts() {
    this.incomingService.productsSign.set([])
  }
}
