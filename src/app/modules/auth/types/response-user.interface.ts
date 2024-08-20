export interface IResponseUser {
  user: IUser
  token: string
}

interface IUser {
  email: string,
  roles: IRole[]
}

interface IRole {
  id: number
  value: string
  description: string
}
