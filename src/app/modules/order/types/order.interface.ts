export interface IOrder {
  'userId': number,
  'productList': IProductOrder[]
}

export interface IProductOrder {
  'id': number,
  'qty': number,
  'price': number
}
