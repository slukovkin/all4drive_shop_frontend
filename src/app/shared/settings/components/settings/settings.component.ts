import { Component } from '@angular/core'
import { MatOption, MatSelect } from '@angular/material/select'
import { HttpClient } from '@angular/common/http'

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

  constructor(
    private readonly http: HttpClient,
  ) {
  }

}
