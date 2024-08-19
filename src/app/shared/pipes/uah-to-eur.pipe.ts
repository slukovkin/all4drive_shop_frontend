import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'uahToEur',
  standalone: true,
})
export class UahToEurPipe implements PipeTransform {

  transform(value: number, exchangeRete: number): number {
    return Math.floor(value / exchangeRete)
  }

}
