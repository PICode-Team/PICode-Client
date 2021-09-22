export interface IUser {
  userId: string
  userName: string
  userThumbnail?: string
}

export type IUserCheck = {
  [key in string]: boolean
}
