import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  items = [
    // {
    //   routerLink: 'home',
    //   label: 'Дашбоард',
    // },
    {
      routerLink: 'products',
      label: 'Номенклатура',
    },
    {
      routerLink: 'incoming_invoice',
      label: 'Приходная накладная',
    },
    {
      routerLink: 'outgoing_invoice',
      label: 'Расходная накладная',
    },
    {
      routerLink: 'documents',
      label: 'Журнал документов',
    },
    {
      routerLink: 'orders',
      label: 'Журнал заказов',
    },
    {
      routerLink: 'reports',
      label: 'Отчёты',
    },
    {
      routerLink: 'customer',
      label: 'Контрагенты',
    },
    {
      routerLink: 'stores',
      label: 'Склады',
    },
    {
      routerLink: 'currency',
      label: 'Валюты',
    },
    {
      routerLink: 'categories',
      label: 'Категории',
    },
    {
      routerLink: 'settings',
      label: 'Настройки',
    },
    {
      routerLink: 'upload',
      label: 'Загрузки',
    },

  ]
}
