import { Component } from '@angular/core'
import { MatOption, MatSelect } from '@angular/material/select'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

}
