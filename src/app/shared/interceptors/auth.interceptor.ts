import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BASE_URL} from "../constants/constants";

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token')
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        url: `${BASE_URL}/${req.url}`
      })
    }
    return next.handle(req)
  }
}

// export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
//   // Inject the current `AuthService` and use it to get an authentication token:
//   const token = localStorage.getItem("token");
//   if (token) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       },
//       url: `${BASE_URL}/${req.url}`
//     })
//   }
//   return next(req);
// }
