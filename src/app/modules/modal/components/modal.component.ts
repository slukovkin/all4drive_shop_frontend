import { Component, Input } from '@angular/core'
import { ModalService } from '../service/modal.service'
import { TitleCasePipe, UpperCasePipe } from '@angular/common'
import { IProduct } from '../../product/types/product.interfaces'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    TitleCasePipe,
    UpperCasePipe,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title?: string
  @Input() product?: IProduct | null

  constructor(
    public readonly modalService: ModalService,
  ) {
  }
}
