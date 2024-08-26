import { Component, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './shared/components/header/header.component'
import { AuthService } from './modules/auth/service/auth.service'
import { NgIf } from '@angular/common'
import { SidebarComponent } from './shared/components/sidebar/sidebar.component'
import { MainComponent } from './shared/components/main/main.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public authService: AuthService) {
  }

  menuIcon = faBars
  isSideBarShow = signal<boolean>(false)

  showSideBar() {
    this.isSideBarShow.set(!this.isSideBarShow())
  }


  exit() {
    this.authService.logout()
  }
}
