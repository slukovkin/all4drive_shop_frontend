import {Routes} from '@angular/router';
import {LoginComponent} from "./modules/auth/login/login.component";
import {RegistrationComponent} from "./modules/auth/registration/registration.component";
import {ProductListComponent} from "./modules/product/product-list/product-list.component";

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
    title: 'Products'
  }
];
