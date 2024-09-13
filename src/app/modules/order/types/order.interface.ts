import { IProductInBasket } from '../../product/types/product.interfaces'

export interface IOrder {
  id?: number
  userId: number
  productList: IProductInBasket[]
}

