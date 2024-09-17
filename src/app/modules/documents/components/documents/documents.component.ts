import { Component } from '@angular/core'
import { DatePipe, NgIf } from '@angular/common'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { ModalService } from '../../../modal/service/modal.service'
import { AuthService } from '../../../auth/service/auth.service'

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    StopPropagationDirective,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {

  isAdmin = false
  currentDate = Date.now()

  constructor(
    public readonly modalService: ModalService,
    private readonly authService: AuthService,
  ) {
    this.isAdmin = this.authService.isAdmin$()
  }
}
