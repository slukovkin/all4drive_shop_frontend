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
import { DocumentService } from '../../services/document.service'
import { CustomerService } from '../../../customer/services/customer.service'
import { ICustomer } from '../../../customer/components/customer/types/customer.interface'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'

@Component({
  selector: 'app-outgoing-invoice',
  standalone: true,
  imports: [FaIconComponent, FormsModule, NgForOf, MatOption, MatSelect, AsyncPipe, ModalComponent, NgIf, ReactiveFormsModule, SelectProductComponent, EurToUahPipe],
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
    public readonly customerService: CustomerService,
    public documentService: DocumentService,
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

  getCustomer(customer: ICustomer): string {
    return `${customer.firstname} ${customer.lastname}`
  }

  searchClient(id: number | null): string {
    if (id) {
      const customer = this.customerService.getCustomerById(id)
      return `${customer.firstname} ${customer.lastname}`
    }
    return ''
  }

  submit() {
    if (this.outgoingForm.valid) {
      console.log(this.outgoingForm.value)
    } else {
      console.log('Form invalid')
    }
  }

  unselectProduct(id: number) {
    this.documentService.productsToInvoice.set(this.documentService.productsToInvoice().filter(product => product.id !== id))
  }

  saveProductInStore() {
    this.invoiceService.changeInvoiceSign.set(true)
    this.invoiceService.removeProductFromStore()
  }

  sum(): number {
    const products = this.documentService.productsToInvoice()
    return products.reduce((prev, curr) => prev += curr.priceOut * curr.qty, 0)
  }

  clearProducts() {
    this.documentService.productsToInvoice.set([])
  }
}
