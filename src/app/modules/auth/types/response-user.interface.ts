export interface IResponseUser {
  user: IUser
  token: string
}

interface IUser {
  email: string,
  role: string,
}
