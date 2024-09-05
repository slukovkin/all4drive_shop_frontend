import { Pipe, PipeTransform } from '@angular/core'
import { SettingService } from '../../modules/settings/service/setting.service'
import { CurrencyService } from '../../modules/currency/components/services/currency.service'

@Pipe({
  name: 'eurToUah',
  standalone: true,
})
export class EurToUahPipe implements PipeTransform {

  currentCurrency: number

  constructor(
    private readonly settingService: SettingService,
    private readonly currencyService: CurrencyService,
  ) {
    this.currencyService.getCurrencyById(this.settingService.setting!.currencyId)
    this.currentCurrency = this.currencyService.currencyDefault!.rate
  }


  transform(value: number, exchangeRate: number = this.currentCurrency): number {
    return Math.floor(value * exchangeRate)
  }

}
