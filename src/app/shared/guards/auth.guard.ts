import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from '../../modules/auth/service/auth.service'

export function authGuard(): CanActivateFn {
  return () => {
    const router = inject(Router)
    const authService = inject(AuthService)

    if (authService.isAdminSig()) {
      return true
    }

    router.navigate([''])
    return false
  }
}
