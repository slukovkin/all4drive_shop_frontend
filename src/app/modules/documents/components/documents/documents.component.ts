import { Component } from '@angular/core'
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { ModalService } from '../../../modal/service/modal.service'
import { AuthService } from '../../../auth/service/auth.service'
import { DocumentService } from '../../services/document.service'
import { IInvoice } from '../../types/invoice.interface'
import { tap } from 'rxjs'

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    StopPropagationDirective,
    CurrencyPipe,
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent {

  isAdmin = false
  currentDate = Date.now()
  invoices: IInvoice[] = []

  constructor(
    public readonly documentService: DocumentService,
    public readonly modalService: ModalService,
    private readonly authService: AuthService,
  ) {
    this.isAdmin = this.authService.isAdmin$()
    this.documentService.getAllIncomingInvoices()
      .pipe(
        tap(invoices => this.invoices = invoices),
      ).subscribe()
    // this.documentService.getAllOutgoingInvoices()
    //   .pipe(
    //     tap(invoices => this.invoices = invoices),
    //   ).subscribe()
  }
}
