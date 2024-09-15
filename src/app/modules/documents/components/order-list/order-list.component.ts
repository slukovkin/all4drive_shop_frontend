import { Component } from '@angular/core'
import { DocumentService } from '../../services/document.service'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    JsonPipe,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {

  constructor(
    public readonly documentService: DocumentService,
  ) {
    this.documentService.getAllOrder()
  }
}
