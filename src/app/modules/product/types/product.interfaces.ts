export interface ProductCreationAttributes {
  code: number
  article: string
  title: string
  // cross: number | null
  // imageUrl: string | null
}


export interface IProduct {
  id: number,
  code: number,
  article: string,
  title: string,
  cross: number
  imageUrl: string
}
