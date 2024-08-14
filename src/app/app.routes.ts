import {Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/components/login/login.component";
import {RegistrationComponent} from "./modules/auth/components/registration/registration.component";
import {ProductListComponent} from "./modules/product/components/product-list/product-list.component";
import {authGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: '', component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'registration', component: RegistrationComponent,
    title: 'Registration'
  },
  {
    path: 'products', component: ProductListComponent,
    title: 'Products',
    canActivate: [authGuard()]
  }
];
