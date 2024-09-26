import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption } from '@angular/material/core'
import { MatSelect } from '@angular/material/select'
import { NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-setting-telegram',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FaIconComponent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    MatButton,
  ],
  templateUrl: './setting-telegram.component.html',
  styleUrl: './setting-telegram.component.scss',
})
export class SettingTelegramComponent {

  telegramForm: FormGroup

  constructor() {
    this.telegramForm = new FormGroup({
      telegramId: new FormControl(''),
      telegramToken: new FormControl(''),
    })
  }

  onSubmit() {

  }
}
