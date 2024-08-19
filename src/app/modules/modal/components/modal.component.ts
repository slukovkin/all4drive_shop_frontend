import { Component, Input } from '@angular/core'
import { ModalService } from '../service/modal.service'
import { TitleCasePipe } from '@angular/common'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    TitleCasePipe,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() title?: string

  constructor(
    public readonly modalService: ModalService,
  ) {
  }
}
