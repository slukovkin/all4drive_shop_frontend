import { Component } from '@angular/core'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ModalService } from '../../../modules/modal/service/modal.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public readonly modalService: ModalService,
    public authService: AuthService) {
  }

  addProduct() {
    this.modalService.openModal()
  }

  exit() {
    this.authService.logout()
  }

}
