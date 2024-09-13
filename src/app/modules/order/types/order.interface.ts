export interface IOrder {
  id?: number
  userId: number
  productList: IProductOrderInterface[]
}

export interface IProductOrderInterface {
  id: number
  qty: number
  price: number
}
