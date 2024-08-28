import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-setting-telegram',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './setting-telegram.component.html',
  styleUrl: './setting-telegram.component.scss',
})
export class SettingTelegramComponent {

}
