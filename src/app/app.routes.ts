import { Routes } from '@angular/router'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegistrationComponent } from './modules/auth/components/registration/registration.component'
import { ProductsComponent } from './modules/product/components/products/products.component'
import { authGuard } from './shared/guards/auth.guard'
import { ProductFormComponent } from './modules/product/components/product-form/product-form.component'
import { HomeComponent } from './modules/home/components/home/home.component'
import { DocumentsComponent } from './modules/documents/components/documents/documents.component'
import { SettingsComponent } from './shared/settings/components/settings/settings.component'
import { IncomingInvoiceComponent } from './modules/documents/components/incoming-invoice/incoming-invoice.component'
import { OutgoingInvoiceComponent } from './modules/documents/components/outgoing-invoice/outgoing-invoice.component'
import { CustomerComponent } from './modules/customer/components/customer/customer.component'
import { StoresComponent } from './modules/store/components/stores/stores.component'

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products',
    canActivate: [authGuard()],
  },
  {
    path: 'new_product',
    component: ProductFormComponent,
    title: 'New Product',
    canActivate: [authGuard()],
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard()],
  },
  {
    path: 'incoming_invoice',
    component: IncomingInvoiceComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'outgoing_invoice',
    component: OutgoingInvoiceComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'documents',
    component: DocumentsComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'stores',
    component: StoresComponent,
    canActivate: [authGuard()],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
]
