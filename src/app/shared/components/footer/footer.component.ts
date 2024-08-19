import { Component } from '@angular/core'
import { NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ModalService } from '../../../modules/modal/service/modal.service'
import { AuthService } from '../../../modules/auth/service/auth.service'

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
  constructor(
    public readonly authService: AuthService,
    private readonly modalService: ModalService) {
  }

  addProduct() {
    this.modalService.openModal()
  }
}
