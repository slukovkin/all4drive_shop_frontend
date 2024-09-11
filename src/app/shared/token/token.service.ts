import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../constants/constants'
import { tap } from 'rxjs'
import { IUserResponse } from '../../modules/auth/types/response.interface'

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  userInSystem = signal<IUserResponse | null>(null)

  constructor(
    private http: HttpClient,
  ) {
  }

  checkToken(token: string) {
    this.http.get<IUserResponse>(Constants.BASE_URL + Constants.METHODS.CHECK_TOKEN + token)
      .pipe(
        tap((user: IUserResponse) => this.userInSystem.set(user)),
      )
      .subscribe()
  }
}
