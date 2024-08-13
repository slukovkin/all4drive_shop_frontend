import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserInterface} from "../types/user.interface";
import {BASE_URL} from '../../../shared/constants/constants';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {catchError, tap} from 'rxjs';
import {IResponseUser} from "../types/response-user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthSig = signal<boolean>(false)

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toast: ToastrService) {
    const token = localStorage.getItem('token')
    this.isAuthSig.set(!!token)
  }

  login(user: UserInterface) {
    return this.http.post<IResponseUser>(`${BASE_URL}/auth/login`,
      user).pipe(
      tap((response: IResponseUser) => {
        localStorage.setItem('token', response.token)
        this.isAuthSig.set(true)
      }),
      catchError((err) => {
        this.handleError(err)
        throw new Error(err.error.message)
      })
    ).subscribe(() => {
      this.toast.success('Login successfully')
      // localStorage.setItem('token',)
      this.router.navigate(['/products'])
    });
  }

  registration(user: UserInterface) {
    return this.http.post(`${BASE_URL}/auth/registration`,
      user)
      .pipe(
        tap(() => {
          this.login(user)
        }),
        catchError((err) => {
          this.handleError(err)
          throw (`Error => ${err.message}`)
        })
      ).subscribe(() => {
        this.toast.success('Registration successfully')
        // this.router.navigate(['/products'])
      });
  }

  logout() {
    localStorage.removeItem('token')
    this.isAuthSig.set(false)
    this.router.navigate([''])
    this.toast.success('Logout')
  }

  private handleError(err: HttpErrorResponse) {
    this.toast.error(err.error.message);
  }
}

