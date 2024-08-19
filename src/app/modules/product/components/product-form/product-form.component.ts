import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ProductService } from '../../service/product.service'
import { IProduct, ProductCreationAttributes } from '../../types/product.interfaces'
import { ModalService } from '../../../modal/service/modal.service'


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  @Input() product?: IProduct

  @Input() id?: number

  productForm: FormGroup

  constructor(
    private readonly modalService: ModalService,
    public readonly productService: ProductService,
  ) {
    this.productForm = new FormGroup({
      code: new FormControl('',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      article: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      picture: new FormControl(''),
      brand: new FormControl(''),
      price: new FormControl(''),
      qty: new FormControl(''),
      imageUrl: new FormControl(''),
    })
  }

  ngOnInit() {
    if (this.id) {
      this.productService.getProductById(this.id)
        .subscribe((product: IProduct) => this.product = product)
    }
  }

  submit() {
    if (this.productForm.valid) {
      const product: ProductCreationAttributes = {
        code: Number(this.productForm.controls['code'].value),
        article: this.productForm.controls['article'].value.toUpperCase(),
        title: this.productForm.controls['title'].value.charAt(0).toUpperCase() +
          this.productForm.controls['title'].value.slice(1).toLowerCase(),
        brand: this.productForm.controls['brand'].value.charAt(0).toUpperCase() +
          this.productForm.controls['title'].value.slice(1).toLowerCase(),
        price: Number(this.productForm.controls['price'].value),
        qty: Number(this.productForm.controls['qty'].value),
        imageUrl: this.productForm.controls['picture'].value,
      }
      this.productService.create(product)
      this.productForm.reset()
      this.modalService.closeModal()
    } else {
      console.log('Not valid')
    }
  }
}
