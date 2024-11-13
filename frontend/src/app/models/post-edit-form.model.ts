export type PostEditForm = {
  id: number;
  title: string | null;
  content: string | null;
  image: File | '';
  user_id: number | null;
}
