import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../../modules/auth/service/auth.service'
import { DataRowOutlet } from '@angular/cdk/table'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    DataRowOutlet,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    public readonly authService: AuthService,
  ) {
  }

  isAdmin: boolean = false
  isAuthenticated: boolean = false

  ngOnInit(): void {
    this.isAuthenticated = !!localStorage.getItem('token')
    this.isAdmin = this.authService.isAdminSig()
  }
}
