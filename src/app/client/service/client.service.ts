import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  isVisible = new BehaviorSubject(false)

  openModal() {
    this.isVisible.next(true)
  }

  closeModal() {
    this.isVisible.next(false)
  }
}
