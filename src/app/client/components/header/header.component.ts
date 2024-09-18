import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { DataRowOutlet } from '@angular/cdk/table'
import { AsyncPipe, NgIf } from '@angular/common'
import { ModalComponent } from '../../../modules/modal/components/modal.component'
import { ProductFormComponent } from '../../../modules/product/components/product-form/product-form.component'
import { BasketComponent } from '../basket/basket.component'
import { ModalService } from '../../../modules/modal/service/modal.service'
import { BasketModalComponent } from '../basket-modal/basket-modal.component'
import { ClientService } from '../../service/client.service'
import { OrderComponent } from '../order/order.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    DataRowOutlet,
    AsyncPipe,
    ModalComponent,
    NgIf,
    ProductFormComponent,
    BasketComponent,
    BasketModalComponent,
    OrderComponent,
    FormsModule,
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
