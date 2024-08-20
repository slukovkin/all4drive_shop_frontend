import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http'
import { provideToastr } from 'ngx-toastr'
import { provideAnimations } from '@angular/platform-browser/animations'
import { AuthInterceptor } from './shared/interceptors/auth.interceptor'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimations(),
    provideToastr(),
    provideAnimationsAsync(),
  ],
}
