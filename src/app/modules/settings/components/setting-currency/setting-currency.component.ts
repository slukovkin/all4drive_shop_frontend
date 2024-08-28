import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-setting-currency',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './setting-currency.component.html',
  styleUrl: './setting-currency.component.scss',
})
export class SettingCurrencyComponent {

}
