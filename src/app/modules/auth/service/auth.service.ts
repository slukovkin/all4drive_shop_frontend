import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { UserInterface } from '../types/user.interface'
import { Constants } from '../../../shared/constants/constants'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { catchError, tap } from 'rxjs'
import { IResponseUser } from '../types/response-user.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isAuthSig = signal<boolean>(false)
  isAdminSig = signal<boolean>(false)

  token: string | null = null

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toast: ToastrService) {
    const token = localStorage.getItem('token')
    this.isAuthSig.set(!!token)
  }

  login(user: UserInterface) {
    return this.http.post<IResponseUser>(Constants.BASE_URL + Constants.METHODS.LOGIN,
      user).pipe(
      tap((response: IResponseUser) => {
        if (response.user.roles[0].value === 'ADMIN') {
          this.isAdminSig.set(true)
          localStorage.setItem('token', response.token)
          localStorage.setItem('admin', response.user.roles[0].value)
          this.token = response.token
          this.isAuthSig.set(true)
          this.router.navigate(['home'])
        } else {
          this.isAdminSig.set(false)
          localStorage.setItem('token', response.token)
          this.token = response.token
          this.isAuthSig.set(true)
          this.router.navigate([''])
        }
      }),
      catchError((err) => {
        this.handleError(err)
        throw new Error(err.error.message)
      }),
    ).subscribe(() => {
      this.toast.success('Login successfully', '', { timeOut: 500 })
    })
  }

  registration(user: UserInterface) {
    return this.http.post(Constants.BASE_URL + Constants.METHODS.REGISTRATION,
      user)
      .pipe(
        tap(() => {
          this.login(user)
        }),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        }),
      ).subscribe(() => {
        this.toast.success('Registration successfully', '', { timeOut: 500 })
      })
  }

  logout() {
    localStorage.clear()
    this.isAuthSig.set(false)
    this.isAdminSig.set(false)
    this.token = null
    this.router.navigate([''])
    this.toast.success('Logout', '', { timeOut: 500 })
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}

