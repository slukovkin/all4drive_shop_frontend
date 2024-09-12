import { IProductInStockAttributes } from '../../product/types/product.interfaces'

export interface IOrder {
  products: IProductInStockAttributes[]
}

export interface IProductOrder {
  id: number
  qty: number
  price: number
}
