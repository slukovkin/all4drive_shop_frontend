import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../shared/constants/constants'

@Injectable({
  providedIn: 'root',
})
export class TelegramService {

  constructor(private readonly http: HttpClient) {
  }

  sendMessage(message: string) {
    const payload = { 'message': message }
    return this.http.post(Constants.BASE_URL + Constants.METHODS.SEND_MESSAGE_TO_TELEGRAM, payload)
      .pipe()
      .subscribe()
  }
}
