import { Routes } from '@angular/router'
import { LoginComponent } from './modules/auth/components/login/login.component'
import { RegistrationComponent } from './modules/auth/components/registration/registration.component'
import { ProductsComponent } from './modules/product/components/products/products.component'
import { ProductFormComponent } from './modules/product/components/product-form/product-form.component'
import { DocumentsComponent } from './modules/documents/components/documents/documents.component'
import { SettingsComponent } from './modules/settings/components/settings/settings.component'
import { IncomingInvoiceComponent } from './modules/documents/components/incoming-invoice/incoming-invoice.component'
import { OutgoingInvoiceComponent } from './modules/documents/components/outgoing-invoice/outgoing-invoice.component'
import { CustomerComponent } from './modules/customer/components/customer/customer.component'
import { StoresComponent } from './modules/store/components/stores/stores.component'
import { CurrencyComponent } from './modules/currency/components/currency/currency.component'
import { ReportComponent } from './modules/report/components/report/report.component'
import { CategoryComponent } from './modules/category/components/category/category.component'
import { BasketComponent } from './client/components/basket/basket.component'
import { OrderListComponent } from './modules/documents/components/order-list/order-list.component'
import { OrderComponent } from './client/components/order/order.component'
import { OrderDetailComponent } from './modules/documents/components/order-detail/order-detail.component'
import { authGuard } from './shared/guards/auth.guard'
import { HomeComponent } from './modules/home/components/home/home.component'
import { ShopComponent } from './client/components/shop/shop.component'
import { StockComponent } from './client/components/stock/stock.component'

export const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  },
  {
    path: 'stock',
    component: StockComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order-detail',
    component: OrderDetailComponent,
  },
  {
    path: 'orders',
    component: OrderListComponent,
  },
  {
    path: 'login',
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
    title: 'Statistic',
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
    path: 'currency',
    component: CurrencyComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'reports',
    component: ReportComponent,
    canActivate: [authGuard()],
  },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [authGuard()],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
