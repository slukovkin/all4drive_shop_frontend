import { Injectable, signal } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '../../auth/service/auth.service'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible = new BehaviorSubject(false)

  titleSing = signal<string>('')
  productSign = signal<any>('')

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  openModal(title: string, params?: any) {
    if (this.authService.isAdminSig()) {
      this.titleSing.set(title)
      this.productSign.set(params)
      this.isVisible.next(true)
    }
  }

  closeModal() {
    this.isVisible.next(false)
  }
}
