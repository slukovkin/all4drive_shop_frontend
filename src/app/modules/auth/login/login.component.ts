import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {UserInterface} from '../types/user.interface';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: FormGroup
  authService = inject(AuthService)
  response: any

  constructor() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if (this.user.valid) {
      const user: UserInterface = {email: this.user.value.email, password: this.user.value.password}
      this.response = this.authService.login(user)
      console.log(this.response)

    } else {
      console.log('Not valid')
    }
  }

}
