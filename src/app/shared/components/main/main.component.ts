import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from '../../../client/components/footer/footer.component'
import { HeaderComponent } from '../../../client/components/header/header.component'
import { NavigationComponent } from '../../../client/components/navigation/navigation.component'
import { PromotionComponent } from '../../../client/components/promotion/promotion.component'
import { ShopComponent } from '../../../client/components/shop/shop.component'
import { SidebarComponent } from '../../../client/components/sidebar/sidebar.component'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    PromotionComponent,
    ShopComponent,
    SidebarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

}
