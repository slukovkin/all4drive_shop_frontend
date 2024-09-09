import { Component } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { ProductService } from '../../../product/service/product.service'
import { SettingService } from '../../../settings/service/setting.service'
import { StoreService } from '../../../store/store.service'
import { CurrencyService } from '../../../currency/components/services/currency.service'
import { ModalService } from '../../../modal/service/modal.service'
import { InvoiceService } from '../../services/invoice.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { SelectProductComponent } from '../select-product/select-product.component'

@Component({
  selector: 'app-outgoing-invoice',
  standalone: true,
  imports: [FaIconComponent, FormsModule, NgForOf, MatOption, MatSelect, AsyncPipe, ModalComponent, NgIf, ReactiveFormsModule, SelectProductComponent],
  templateUrl: './outgoing-invoice.component.html',
  styleUrl: './outgoing-invoice.component.scss',
})
export class OutgoingInvoiceComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash

  outgoingForm: FormGroup

  constructor(
    public readonly productService: ProductService,
    public readonly settingService: SettingService,
    public readonly storeService: StoreService,
    public readonly currencyService: CurrencyService,
    public readonly modalService: ModalService,
    public readonly invoiceService: InvoiceService,
  ) {
    this.settingService.getAllSettings()
    this.productService.getAllProduct()
    this.storeService.getAllStore()
    this.currencyService.getAllCurrencies()

    this.outgoingForm = new FormGroup({
      number_doc: new FormControl('ER-'),
      data_doc: new FormControl(Date.now()),
      store: new FormControl(this.settingService.setting?.storeId, [Validators.required]),
      currency: new FormControl(this.settingService.setting?.currencyId, [Validators.required]),
    })
  }

  submit() {
    if (this.outgoingForm.valid) {
      console.log(this.outgoingForm.value)
    } else {
      console.log('Form invalid')
    }
  }

  unselectProduct(id: number) {
    this.invoiceService.productsSign.set(this.invoiceService.productsSign().filter(product => product.productId !== id))
  }

  saveProductInStore() {
    this.invoiceService.changeInvoiceSign.set(true)
    this.invoiceService.saveProductInStore()
  }

  sum(): number {
    const products = this.invoiceService.productsSign()
    return products.reduce((prev, curr) => prev += curr.priceIn * curr.qty, 0)
  }

  clearProducts() {
    this.invoiceService.productsSign.set([])
  }
}
