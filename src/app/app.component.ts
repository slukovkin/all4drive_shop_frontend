import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './shared/components/header/header.component'
import { AuthService } from './modules/auth/service/auth.service'
import { NgIf } from '@angular/common'
import { SidebarComponent } from './shared/components/sidebar/sidebar.component'
import { MainComponent } from './shared/components/main/main.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { BaseComponent } from './client/pages/base/base.component'
import { SettingService } from './modules/settings/service/setting.service'
import { CurrencyService } from './modules/currency/components/services/currency.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NgIf,
    SidebarComponent,
    MainComponent,
    FaIconComponent,
    BaseComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private settingService: SettingService,
    private currencyService: CurrencyService,
  ) {
    this.settingService.getAllSettings()
    this.currencyService.getCurrencyById(this.settingService.setting?.currencyId ?? 2)
    const token = localStorage.getItem('token')
    const admin = localStorage.getItem('admin')
    if (token && admin) {
      this.authService.token = token
      this.authService.isAdminSig.set(true)
    } else if (token) {
      this.authService.token = token
    }
  }

  menuIcon = faBars
  isSideBarShow = signal<boolean>(true)

  showSideBar() {
    this.isSideBarShow.set(!this.isSideBarShow())
  }

  exit() {
    this.authService.logout()
  }
}
