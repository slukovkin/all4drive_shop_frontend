import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Location, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {IProduct, ProductCreationAttributes} from "../../types/product.interfaces";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() product?: IProduct
  form: FormGroup

  constructor(
    private location: Location,
    public readonly productService: ProductService
  ) {
    this.form = new FormGroup({
      code: new FormControl('',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ]),
      article: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      picture: new FormControl('')
    })
  }

  submit() {
    if (this.form.valid) {
      const product: ProductCreationAttributes = {
        code: Number(this.form.controls['code'].value),
        article: this.form.controls['article'].value.toUpperCase(),
        title: this.form.controls['title'].value.charAt(0).toUpperCase() +
          this.form.controls['title'].value.slice(1).toLowerCase(),
      }
      this.productService.create(product)
      this.form.reset()
      this.location.back()
    } else {
      console.log('Not valid')
    }
  }

  back() {
    this.location.back()
  }
}
