import { Component } from '@angular/core'
import { NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ModalService } from '../../../modules/modal/service/modal.service'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private readonly modalService: ModalService) {
  }

  addProduct() {
    this.modalService.openModal()
  }
}
