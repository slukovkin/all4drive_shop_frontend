import { Routes } from '@angular/router'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegistrationComponent } from './modules/auth/components/registration/registration.component'
import { ProductsComponent } from './modules/product/components/products/products.component'
import { authGuard } from './shared/guards/auth.guard'
import { ProductFormComponent } from './modules/product/components/product-form/product-form.component'
import { HomeComponent } from './modules/home/components/home/home.component'

export const routes: Routes = [
  {
    path: '', component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'registration', component: RegistrationComponent,
    title: 'Registration',
  },
  {
    path: 'products', component: ProductsComponent,
    title: 'Products',
    canActivate: [authGuard()],
  },
  {
    path: 'new_product', component: ProductFormComponent,
    title: 'New Product',
    canActivate: [authGuard()],
  },
  {
    path: 'home', component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard()],
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full',
  },
]
