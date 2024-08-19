import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'eurToUah',
  standalone: true,
})
export class EurToUahPipe implements PipeTransform {

  transform(value: number, exchangeRate: number): number {
    return Math.floor(value * exchangeRate)
  }

}
