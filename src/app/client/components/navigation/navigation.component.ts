import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { UpperCasePipe } from '@angular/common'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    UpperCasePipe,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {

  navigation = [
    {
      label: 'Номенклатура',
      route: '',
    },
    {
      label: 'Акции',
      route: 'stock',
    },
    {
      label: 'Распродажа',
      route: '',
    }, {
      label: 'Избранные',
      route: '',
    }, {
      label: 'Новинки',
      route: '',
    }, {
      label: 'Бренды',
      route: '',
    },
    {
      label: 'Каталоги',
      route: '',
    },
  ]
}
