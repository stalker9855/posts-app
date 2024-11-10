//export type Post = {
//  userId: number,
//  id: number,
//  title: string,
//  body: string

import { User } from "./user.model"

//}
export type Post = {
  id: number,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  imageUrl: string,
  user: User
}
