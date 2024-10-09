import { Component, signal } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { AuthService } from './modules/auth/service/auth.service'
import { NgIf } from '@angular/common'
import { SidebarComponent } from './shared/components/sidebar/sidebar.component'
import { MainComponent } from './shared/components/main/main.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { HomeComponent } from './modules/home/components/home/home.component'
import { HeaderComponent } from './client/components/header/header.component'
import { NavigationComponent } from './client/components/navigation/navigation.component'
import { FooterComponent } from './client/components/footer/footer.component'
import { PromotionComponent } from './client/components/promotion/promotion.component'
import { ShopComponent } from './client/components/shop/shop.component'
import { CurrencyService } from './modules/currency/components/services/currency.service'
import { SettingService } from './modules/settings/service/setting.service'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    SidebarComponent,
    MainComponent,
    FaIconComponent,
    HomeComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    PromotionComponent,
    ShopComponent,
    MatButton,
    RouterLink,
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
    this.authService.checkAuth()
    this.settingService.getAllSettings()
    this.currencyService.getCurrencyById(this.settingService.setting?.currencyId ?? 2)
  }

  logout = faRightFromBracket
  menuIcon = faBars
  isSideBarShow = signal<boolean>(true)

  showSideBar() {
    this.isSideBarShow.set(!this.isSideBarShow())
  }

  exit() {
    this.authService.logout()
  }
}
