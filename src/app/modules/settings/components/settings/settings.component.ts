import { Component } from '@angular/core'
import { MatOption, MatSelect } from '@angular/material/select'
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms'
import { SettingCurrencyComponent } from '../setting-currency/setting-currency.component'
import { SettingSmsComponent } from '../setting-sms/setting-sms.component'
import { SettingTelegramComponent } from '../setting-telegram/setting-telegram.component'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    FormsModule,
    SettingCurrencyComponent,
    SettingSmsComponent,
    SettingTelegramComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

  settingForm: FormGroup

  constructor() {
    this.settingForm = new FormGroup({
      title_site: new FormControl('', Validators.required),

    })
  }

}
