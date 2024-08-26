import { Component } from '@angular/core'
import { ModalComponent } from '../../../modal/components/modal.component'
import { AsyncPipe, NgIf } from '@angular/common'
import { ProductFormComponent } from '../../../product/components/product-form/product-form.component'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { CustomerService } from '../services/customer.service'
import { ICustomer } from '../customer/types/customer.interface'
import { firstCharToUpperCase } from '../../../../shared/utils/transformString'
import { ModalService } from '../../../modal/service/modal.service'

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    ModalComponent,
    AsyncPipe,
    NgIf,
    ProductFormComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  customerForm: FormGroup
  customer?: ICustomer

  constructor(
    private readonly modalService: ModalService,
    public readonly customerService: CustomerService,
  ) {
    this.customer = this.modalService.itemSign()
    this.customerForm = new FormGroup({
      name: new FormControl(this.customer?.name, [Validators.required]),
      surname: new FormControl(this.customer?.surname),
      email: new FormControl(this.customer?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.customer?.phone, [Validators.required]),
      description: new FormControl(this.customer?.description),
    })
  }

  submit() {
    if (this.customerForm.valid) {
      const customer: ICustomer = {
        id: this.customer?.id,
        name: firstCharToUpperCase(this.customerForm.controls['name'].value),
        surname: firstCharToUpperCase(this.customerForm.controls['surname'].value),
        email: this.customerForm.controls['email'].value,
        phone: this.customerForm.controls['phone'].value,
        description: firstCharToUpperCase(this.customerForm.controls['description'].value),
      }
      if (this.customer?.id) {
        this.customerService.update(customer)
      } else {
        this.customerService.create(customer)
      }
      this.customerService.customerSign.set('')
      this.customerForm.reset()
      this.customerService.isShowCustomerForm.set(false)

    }
  }

  exit() {
    this.customerForm.reset()
    this.customerService.customerSign.set('')
    this.customerService.isShowCustomerForm.set(false)
  }
}
