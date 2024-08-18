export interface ProductCreationAttributes {
  code: number
  article: string
  title: string
  brand: string
  price: number
  qty: number
  imageUrl: string
}


export interface IProduct {
  id: number
  code: number
  article: string
  title: string
  brand: string
  price: number
  qty: number
  imageUrl: string
  cross: number
  updatedAt: string,
  createdAt: string
}
