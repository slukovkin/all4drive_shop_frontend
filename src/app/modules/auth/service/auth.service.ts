import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../types/user.interface";
import {BASE_URL} from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: UserInterface) {
    return this.http.post(`${BASE_URL}/auth/login`,
      user).subscribe()
  }

  registration(user: UserInterface) {
    return this.http.post(`${BASE_URL}/auth/registration`,
      {email: user.email, password: user.password}).subscribe()
  }
}
