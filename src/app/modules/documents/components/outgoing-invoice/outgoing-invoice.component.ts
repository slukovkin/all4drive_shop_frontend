import { Component } from '@angular/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AsyncPipe, Location, NgForOf, NgIf } from '@angular/common'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { ProductService } from '../../../product/service/product.service'
import { SettingService } from '../../../settings/service/setting.service'
import { StoreService } from '../../../store/store.service'
import { CurrencyService } from '../../../currency/components/services/currency.service'
import { ModalService } from '../../../modal/service/modal.service'
import { ModalComponent } from '../../../modal/components/modal.component'
import { SelectProductComponent } from '../select-product/select-product.component'
import { DocumentService } from '../../services/document.service'
import { CustomerService } from '../../../customer/services/customer.service'
import { ICustomer } from '../../../customer/components/customer/types/customer.interface'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { IInvoice } from '../../types/invoice.interface'
import { OutgoingInvoiceService } from '../../services/outgoing-invoice.service'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'

@Component({
  selector: 'app-outgoing-invoice',
  standalone: true,
  imports: [FaIconComponent, FormsModule, NgForOf, MatOption, MatSelect, AsyncPipe, ModalComponent, NgIf, ReactiveFormsModule, SelectProductComponent, EurToUahPipe, StopPropagationDirective],
  templateUrl: './outgoing-invoice.component.html',
  styleUrl: './outgoing-invoice.component.scss',
})
export class OutgoingInvoiceComponent {

  editIcon = faPenToSquare
  deleteIcon = faTrash
  data = Date.now().toString()

  outgoingForm: FormGroup

  constructor(
    public readonly productService: ProductService,
    public readonly settingService: SettingService,
    public readonly storeService: StoreService,
    public readonly currencyService: CurrencyService,
    public readonly modalService: ModalService,
    public readonly outgoingInvoiceService: OutgoingInvoiceService,
    public readonly customerService: CustomerService,
    public documentService: DocumentService,
    private readonly _location: Location,
  ) {
    this.settingService.getAllSettings()
    this.productService.getAllProduct()
    this.storeService.getAllStore()
    this.currencyService.getAllCurrencies()

    this.outgoingForm = new FormGroup({
      invoice: new FormControl(this.outgoingInvoiceService.lastOutgoingInvoiceNumber$() ?? 'РН-0000001', [Validators.required]),
      data_doc: new FormControl(this.data),
      firm: new FormControl('', [Validators.required]),
      customer: new FormControl('', [Validators.required]),
      note: new FormControl(''),
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
      const invoice: IInvoice = {
        doc_number: this.outgoingForm.controls['invoice'].value,
        type: 'out',
        customerId: this.outgoingForm.controls['customer'].value,
        date: this.outgoingForm.controls['data_doc'].value,
        amount: this.sum(),
        status: false,
      }
      this.documentService.invoice$.set(invoice)
      this.saveProductInStore()
    } else {
      console.log('Form invalid', this.outgoingForm.value)
    }
  }

  unselectProduct(id: number) {
    this.documentService.productsToInvoice$.set(this.documentService.productsToInvoice$().filter(product => product.id !== id))
  }

  saveProductInStore() {
    this.outgoingInvoiceService.changeInvoice$.set(true)
    this.outgoingInvoiceService.removeProductFromStore()
  }

  sum(): number {
    const products = this.documentService.productsToInvoice$()
    return products.reduce((sum, curr) => sum += curr.priceOut * curr.qty, 0)
  }

  clearProducts() {
    this.documentService.productsToInvoice$.set([])
    this._location.back()
  }
}
