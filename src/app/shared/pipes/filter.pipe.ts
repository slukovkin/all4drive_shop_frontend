import { Pipe, PipeTransform } from '@angular/core'
import { IProduct } from '../../modules/product/types/product.interfaces'

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(products: IProduct[], param: string): IProduct[] {
    if (param === '') return products
    if (parseInt(param)) {
      return products.filter(product => product.code.toString().includes(param))
    }
    return products.filter(product => product.article.toLowerCase().includes(param.toLowerCase()))
  }
}
