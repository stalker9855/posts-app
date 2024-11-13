import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { PostAPIService } from '../services/post-api/post-api.service';
import { CurrentUserService } from '../services/currentUser/current-user-service.service';
import { FormsModule } from '@angular/forms';
import { PostEditForm } from '../models/post-edit-form.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'post-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss'
})
export class PostItemComponent {

  @Input()
  post!: Post;

  isEditing: Boolean = false;

  editPost!: PostEditForm;

  constructor(private postService: PostAPIService, private currentUserService: CurrentUserService, private toastr: ToastrService) { }

  get currentUser() {
    return this.currentUserService.getCurrentUser()
  }

  getImage(imageUrl: string): string {
    return environment.storageUrl + imageUrl
  }

  startEditPost(): void {
    this.isEditing = true
    this.editPost = {
      id: this.post.id,
      title: this.post.title,
      content: this.post.content,
      image: '',
      user_id: this.post.user.id
    }
  }

  cancelEditPost(): void {
    this.isEditing = false
  }


  saveEditPost(): void {

    const formData: FormData = new FormData()
    Object.keys(this.editPost).forEach(key => {
      const value = this.editPost[key as keyof PostEditForm]
      formData.append(key, value as string);
    })
    this.postService.updatePost(this.editPost.id, formData).subscribe(response => {
      this.toastr.success("Success", "Post edited")
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })
    this.isEditing = false;
  }

  deletePost(id: number) {
    this.postService.deletePost(id)
    this.toastr.success("Success", "Post deleted")
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      this.editPost.image = file;
    }
  }

}
