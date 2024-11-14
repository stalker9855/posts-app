import { User } from "./user.model"

export type Post = {
  id: number,
  title: string,
  content: string,
  created_at: Date,
  updated_at: Date,
  image_url: string,
  user: User
}
