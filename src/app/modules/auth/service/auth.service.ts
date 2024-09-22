import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { ITokenResponse, UserInterface } from '../types/user.interface'
import { Constants } from '../../../shared/constants/constants'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { catchError, tap } from 'rxjs'
import { IResponseUser } from '../types/response-user.interface'
import { IUserProfile } from '../types/user-profile'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isAuth$ = signal<boolean>(false)
  isAdmin$ = signal<boolean>(false)
  user: IResponseUser | null = null

  token: string | null = null

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toast: ToastrService) {
    const token = localStorage.getItem('token')
    this.isAuth$.set(!!token)
  }

  checkAuth() {
    const token = localStorage.getItem('token')
    if (token) {
      this.checkToken(token).subscribe()
    }
  }

  login(user: UserInterface) {
    return this.http.post<IResponseUser>(Constants.BASE_URL + Constants.METHODS.LOGIN,
      user)
      .pipe(
        tap((response: IResponseUser) => {
          if (response.user.roles[0].value === 'ADMIN') {
            this.isAdmin$.set(true)
            this.isAuth$.set(true)
            localStorage.setItem('token', response.token)
            this.token = response.token
            this.user = response
            this.router.navigate(['home']).then()
          } else {
            this.isAdmin$.set(false)
            this.isAuth$.set(true)
            localStorage.setItem('token', response.token)
            this.token = response.token
            this.user = response
            this.router.navigate(['']).then()
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

  checkToken(token: string) {
    return this.http.get<ITokenResponse>(Constants.BASE_URL + Constants.METHODS.CHECK_TOKEN + token)
      .pipe(
        tap((response) => {
          if (response.roles[0].value === 'ADMIN') {
            this.isAuth$.set(true)
            this.isAdmin$.set(true)
          } else if (response.roles[0].value === 'USER') {
            this.isAuth$.set(true)
            this.isAdmin$.set(false)
          } else {
            this.isAuth$.set(false)
            this.isAdmin$.set(false)
          }
        }),
      )
  }

  update(user: IUserProfile) {
    return this.http.patch(Constants.BASE_URL + Constants.METHODS.UPDATE_USER_BY_ID + user.id, user).subscribe()
  }

  logout() {
    localStorage.clear()
    this.isAuth$.set(false)
    this.isAdmin$.set(false)
    // this.tokenService.userInSystem.set(null)
    this.token = null
    this.user = null
    this.router.navigate(['']).then()
    this.toast.success('Logout', '', { timeOut: 500 })
  }

  back() {
    this.router.navigate(['']).then()
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message)
  }
}

