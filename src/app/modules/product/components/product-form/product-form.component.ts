import { Component } from '@angular/core'
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
export class ProductFormComponent {
  product?: IProduct
  productForm: FormGroup

  constructor(
    public readonly modalService: ModalService,
    public readonly productService: ProductService,
  ) {
    this.product = this.modalService.productSign()
    this.productForm = new FormGroup({
      code: new FormControl(this.product?.code,
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      article: new FormControl(this.product?.article, [Validators.required]),
      title: new FormControl(this.product?.title, [Validators.required]),
      brand: new FormControl(this.product?.brand),
      price: new FormControl(this.product?.price),
      qty: new FormControl(this.product?.qty),
      picture: new FormControl(this.product?.imageUrl),
    })
  }

  submit() {
    if (this.productForm.valid) {
      const newProduct: ProductCreationAttributes = {
        code: Number(this.productForm.controls['code'].value),
        article: this.productForm.controls['article'].value.toUpperCase(),
        title: this.productForm.controls['title'].value,
        brand: this.productForm.controls['brand'].value,
        price: Number(this.productForm.controls['price'].value),
        qty: Number(this.productForm.controls['qty'].value),
        imageUrl: this.productForm.controls['picture'].value,
      }
      if (this.product?.id) {
        this.productService.update(
          {
            ...newProduct,
            id: this.product.id,
            cross: this.product.cross,
            createdAt: this.product.createdAt,
            updatedAt: this.product.updatedAt,
          },
        )
      } else {
        this.productService.create(newProduct)
      }
      this.productForm.reset()
      this.modalService.closeModal()
    } else {
      console.log('Not valid')
    }
  }
}
