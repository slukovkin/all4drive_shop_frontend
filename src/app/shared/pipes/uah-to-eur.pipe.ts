import { Pipe, PipeTransform } from '@angular/core'
import { SettingService } from '../../modules/settings/service/setting.service'
import { CurrencyService } from '../../modules/currency/components/services/currency.service'
import { ICurrency } from '../../modules/currency/types/currency.interface'

@Pipe({
  name: 'uahToEur',
  standalone: true,
})
export class UahToEurPipe implements PipeTransform {
  currentCurrency?: ICurrency

  constructor(
    private readonly settingService: SettingService,
    private readonly currencyService: CurrencyService,
  ) {
    this.currencyService.getCurrencyById(this.settingService.setting!.currencyId)
    this.currentCurrency = this.currencyService.currencyDefault
  }


  transform(value: number, exchangeRete: number = this.currentCurrency!.rate): number {
    return Math.floor(value / exchangeRete)
  }

}
