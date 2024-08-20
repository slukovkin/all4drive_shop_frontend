import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Constants } from '../constants/constants'

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token')
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        url: Constants.BASE_URL + req.url,
      })
    }
    return next.handle(req)
  }
}
