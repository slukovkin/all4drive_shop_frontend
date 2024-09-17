import { Injectable, signal } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '../../auth/service/auth.service'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isVisible = new BehaviorSubject(false)

  titleSing = signal<string>('')
  itemSign = signal<any>('')

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  openModal(title: string, item?: Object) {
    if (this.authService.isAdmin$()) {
      this.titleSing.set(title)
      this.itemSign.set(item)
      this.isVisible.next(true)
    }
  }

  closeModal() {
    this.isVisible.next(false)
  }
}
