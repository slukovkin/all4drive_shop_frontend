import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { AsyncPipe, NgIf } from '@angular/common'
import { ModalService } from '../../../modules/modal/service/modal.service'
import { ClientService } from '../../service/client.service'
import { BasketModalComponent } from '../basket-modal/basket-modal.component'
import { OrderComponent } from '../order/order.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    BasketModalComponent,
    OrderComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor(
    public readonly authService: AuthService,
    public readonly modalService: ModalService,
    public readonly clientService: ClientService,
  ) {
    const token = localStorage.getItem('token')
    if (token) {
      this.authService.checkToken(token)
        .subscribe()
    }
  }
}
